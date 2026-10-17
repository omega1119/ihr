---
applyTo: "assets/css/styles.css"
---

- This site is dark-only with its own token set in `:root` (`--bg`, `--bg-alt`,
  `--ink`, `--ink-dim`, `--line`, `--accent` red `#d31919`, `--accent-soft`,
  `--shadow`). Reuse those tokens instead of hardcoding a colour or shadow that
  already has one. Do not add a new accent colour.
- There is no light theme and no `[data-theme]` switch here. Do not add one, and
  do not copy rules from the other site repos that depend on `--card`, `--border`
  or `[data-theme="dark"]`.
- Headings and `.logo` use Bebas Neue, body text uses Space Grotesk, both
  self-hosted under `assets/fonts/` and declared with `@font-face` at the top of
  the file. Do not add an external font `<link>`.
