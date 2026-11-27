#!/usr/bin/env bash
# Append items to the single open "Needs Ashu" issue (creates it once).
# Usage: scripts/automation/needs-ashu.sh <markdown-file>
set -euo pipefail
REPO="jsamtech-ac/rideornaptime"
FILE="$1"
gh api "repos/$REPO/labels" -f name=needs-ashu -f color=d93f0b > /dev/null 2>&1 || true
ISSUE="$(gh api "repos/$REPO/issues?state=open&labels=needs-ashu&per_page=50" \
  --jq '[.[] | select(.pull_request == null and .title == "Needs Ashu")][0].number // empty')"
if [ -z "$ISSUE" ]; then
  ISSUE="$(gh api "repos/$REPO/issues" -f title="Needs Ashu" -f "labels[]=needs-ashu" \
    -f body="Inbox for the scheduled roundup and audit: things they couldn't verify, firsthand notes worth adding, and bigger changes they won't make on their own. Tick items off or close comments as you go." --jq .number)"
fi
gh api "repos/$REPO/issues/$ISSUE/comments" -F body=@"$FILE" --jq .html_url
