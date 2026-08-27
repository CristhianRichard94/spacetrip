# Issue conventions

Every issue filed in this repo (manually or by an agent/audit) follows this shape.

## Title

`<Area>: <short problem statement>` — e.g. `A11y: no visible focus indicator on plain links`.

Areas in use: `A11y`, `Perf`, `SEO`, `Security`, `Bug`, `Chore`.

## Body

```markdown
<one-line description of the defect>

**File:** `path/to/file.ext:line`
<code snippet if it clarifies the problem>

**Impact:** why this matters (user-facing consequence, standard/spec violated if relevant)

**Fix:** concrete suggested change (code snippet if straightforward)
```

Keep it scoped to one defect per issue. Don't bundle unrelated findings.

## Labels — every issue gets exactly one of each

**Category** (pick one, create a new one only if none fit):
`accessibility` · `performance` · `seo` · `security` · `bug` · `enhancement` · `tech-debt` · `documentation` · `design` · `motion` · `threejs`

**Priority** (always one):
- `priority:high` — security vulnerabilities, Core Web Vitals failures, major a11y barriers (keyboard traps, missing landmarks, broken heading hierarchy) → fix before next merge to main
- `priority:medium` — perf opportunities, SEO gaps, minor a11y issues → fix within current sprint/cycle
- `priority:low` — polish, minor code quality, nice-to-haves → fix when convenient

Map from audit severity (used by `/code-review`, web-quality-audit, etc.): Critical/High → `priority:high`, Medium → `priority:medium`, Low → `priority:low`.

## Checking existing labels before filing

Run `gh label list` first. Reuse an existing label over creating a near-duplicate (e.g. don't create `a11y` when `accessibility` exists). Only create a new label when the finding's category genuinely isn't covered.
