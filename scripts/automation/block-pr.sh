#!/usr/bin/env bash
# Stop an automated PR from merging and flag it for Ashu.
# Usage: scripts/automation/block-pr.sh <pr-number> "<reason>"
set -euo pipefail
REPO="jsamtech-ac/rideornaptime"
PR="$1"
REASON="$2"
gh api -X DELETE "repos/$REPO/pulls/$PR/ccr/auto_merge" > /dev/null 2>&1 || true
gh api "repos/$REPO/labels" -f name=needs-ashu -f color=d93f0b > /dev/null 2>&1 || true
gh api "repos/$REPO/issues/$PR/labels" -f "labels[]=needs-ashu" > /dev/null
gh api "repos/$REPO/issues/$PR/comments" -f body="Blocked from auto-merge: $REASON" > /dev/null
echo "PR #$PR blocked and labeled needs-ashu"
