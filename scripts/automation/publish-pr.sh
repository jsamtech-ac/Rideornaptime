#!/usr/bin/env bash
# Open a PR for the current auto/* branch, enable auto-merge, and wait for CI.
# Uses the GitHub REST API only (GraphQL is unavailable in Claude Code sessions).
#
# Usage: scripts/automation/publish-pr.sh "<PR title>" <body-file>
# Exit 0 = checks passed (auto-merge will land it), 1 = checks failed, 2 = timed out.
set -euo pipefail
TITLE="$1"
BODY_FILE="$2"
REPO="jsamtech-ac/rideornaptime"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
SHA="$(git rev-parse HEAD)"

case "$BRANCH" in auto/*) ;; *) echo "Refusing: branch $BRANCH is not auto/*" >&2; exit 1 ;; esac

git -c push.negotiate=true push -u origin "$BRANCH"

PR="$(gh api "repos/$REPO/pulls?head=jsamtech-ac:$BRANCH&state=open" --jq '.[0].number // empty')"
if [ -z "$PR" ]; then
  PR="$(gh api "repos/$REPO/pulls" -f title="$TITLE" -f head="$BRANCH" -f base=main -F body=@"$BODY_FILE" --jq .number)"
fi
echo "PR #$PR: https://github.com/$REPO/pull/$PR"

# Auto-merge (squash) once required checks pass.
gh api -X PUT "repos/$REPO/pulls/$PR/ccr/auto_merge" -f merge_method=squash > /dev/null \
  && echo "Auto-merge enabled" || echo "WARN: could not enable auto-merge; will merge after checks pass"

# Wait for the Content checks workflow on this commit (up to 30 min).
for _ in $(seq 1 90); do
  sleep 20
  RUN="$(gh api "repos/$REPO/actions/runs?head_sha=$SHA&event=pull_request" \
    --jq '[.workflow_runs[] | select(.name=="Content checks")][0] | "\(.status) \(.conclusion) \(.id)"' 2>/dev/null || true)"
  STATUS="${RUN%% *}"
  if [ "$STATUS" = "completed" ]; then
    CONCLUSION="$(echo "$RUN" | awk '{print $2}')"
    RUN_ID="$(echo "$RUN" | awk '{print $3}')"
    echo "Content checks: $CONCLUSION (run $RUN_ID)"
    if [ "$CONCLUSION" = "success" ]; then
      MERGED="$(gh api "repos/$REPO/pulls/$PR" --jq .merged)"
      if [ "$MERGED" != "true" ]; then
        sleep 30
        MERGED="$(gh api "repos/$REPO/pulls/$PR" --jq .merged)"
      fi
      if [ "$MERGED" != "true" ]; then
        gh api -X PUT "repos/$REPO/pulls/$PR/merge" -f merge_method=squash > /dev/null && echo "Merged"
      else
        echo "Merged by auto-merge"
      fi
      gh api -X DELETE "repos/$REPO/git/refs/heads/$BRANCH" > /dev/null 2>&1 || true
      exit 0
    fi
    echo "Failed jobs log: gh api repos/$REPO/actions/runs/$RUN_ID/jobs, then gh api repos/$REPO/actions/jobs/<job_id>/logs"
    exit 1
  fi
done
echo "Timed out waiting for checks on PR #$PR"
exit 2
