---
description: Full pre-push QA gate. Runs deterministic checks + 5 qualitative reviewer subagents. Produces a tiered BLOCKERS/WARNINGS report and a final push verdict.
argument-hint: "[--skip-layer1] [--only <agent>]"
---

# /qa — Pre-push Quality Gate

You are running the pre-push QA gate for the rideornaptime-project. The user should not push to `main` unless this command reports `✅ READY TO PUSH`.

## Workflow

### Step 1 — Layer 1 (deterministic tooling)

Unless the user passed `--skip-layer1`, run:

```bash
npm run qa
```

This runs tsc, ESLint, Prettier, next build, linkinator, Playwright+axe, and Lighthouse CI, then writes `qa-report/layer1.json`. Exit codes: `0` clean, `1` blockers, `2` warnings-only.

**Read `qa-report/layer1.json`** after it completes. Also read any referenced sub-reports if a check failed (`qa-report/links.json`, `qa-report/playwright.json`, `qa-report/lhci/`).

If Layer 1 produced any blockers, **stop and report them** — do not run Layer 2. The user must fix blockers first.

### Step 2 — Layer 2 (qualitative reviewer subagents)

Launch the following 5 subagents **in parallel** (single message, multiple Agent tool calls). Each agent is read-only.

1. `qa-design-consistency` — Design token adherence, visual consistency
2. `qa-seo-reviewer` — Metadata, JSON-LD, sitemap, headings, alt text
3. `qa-compliance-reviewer` — Affiliate disclosures, FTC `rel="sponsored"`, Disney trademark, privacy
4. `qa-ux-reviewer` — Interactive element correctness, mobile UX, Playwright trace review
5. `qa-content-reviewer` — Copy quality, placeholders, nav-to-route integrity

Each agent should be briefed with:
- The path to `qa-report/layer1.json` (if it exists) so they can cross-reference
- Their scope and the severity rubric (`blocker` | `warning` | `info`)
- Instruction to return structured findings: `[{ severity, area, file, line?, message, fix }]`

### Step 3 — Aggregate and verdict

Collect findings from Layer 1 and all 5 subagents. Deduplicate overlapping findings. Tier them:

- **BLOCKERS** — anything labeled `blocker` by a tool or agent
- **WARNINGS** — anything labeled `warning`
- **INFO** — advisory notes (do not gate on these)

Print a single final report:

```
═══════════════════════════════════════════════════════════
 QA Gate Report — <ISO timestamp>
═══════════════════════════════════════════════════════════

Layer 1 (tooling):    <X passed / Y blockers / Z warnings>
Layer 2 (reviewers):  <X blockers / Y warnings / Z info>

BLOCKERS
  ✗ [area] file:line — message
    → fix: <one-line remediation>

WARNINGS
  ⚠ [area] file:line — message

Verdict: ✅ READY TO PUSH   |   ⚠ PUSHABLE WITH CAVEATS   |   ❌ DO NOT PUSH
```

### Verdict rules

- Any BLOCKER → `❌ DO NOT PUSH`
- No blockers, any WARNINGS → `⚠ PUSHABLE WITH CAVEATS` (list them; user decides)
- Zero of either → `✅ READY TO PUSH`

### Flags

- `--skip-layer1` — skip `npm run qa`, run Layer 2 only (fast iteration after a Layer 1 pass)
- `--only <agent-id>` — run just one reviewer (e.g. `--only qa-seo-reviewer`)

### Notes

- Do NOT push for the user. This command only reports — the user pushes.
- If a subagent crashes, report it as an `info` finding and continue.
- Do not edit code during `/qa` unless the user explicitly asks after seeing the report.
