<!-- BEGIN GENERATED (web-common/agents/copilot-instructions.md -- edits here are overwritten by tools/sync-agent-config.sh) -->

# Agent instructions

This is a static site: hand-written HTML, CSS, and vanilla JS, deployed to GitHub
Pages from the `main` branch. There is no build step, no npm, no bundler, and no
framework (React, Vue, a static site generator's templating, etc.). Edit the HTML
files directly: do not introduce a build pipeline to "improve" this.

## Never change these without explicit approval

These are load-bearing. Changing them silently breaks live URLs, analytics history,
or JS that reads them by exact string:

- **URL slugs and file paths** (e.g. `en/products/metric.html`). Renaming or moving
  a page breaks bookmarks, search rankings, and inbound links from the App Store or
  other sites.
- **Anchor IDs** (`id="..."` targeted by in-page links or external deep links).
- **The Google Analytics measurement ID** (`G-XXXXXXXXXX` in the `gtag.js` snippet).
  Changing it silently orphans historical analytics data.
- **`data-*` attribute contracts** read by `assets/js/main.js` and
  `assets/js/redirect.js`, e.g. `data-languages`, `data-active-lang`,
  `data-footer-type`, `data-store` / `data-store-product`, `data-redirect-<lang>`,
  `data-theme` on `<source>` elements. These scripts parse specific attribute names
  and values; renaming or restructuring one without updating the JS (and every HTML
  file that uses it) breaks the feature with no error.

## General conventions

- No external `<script src>` beyond Google's `gtag.js`: do not add other
  third-party scripts without asking first.
- Fonts are self-hosted (`assets/fonts/*.woff2` + `@font-face` in `styles.css`), not
  loaded from Google Fonts or any other external stylesheet host. Every repo used to
  load its body font (usually Inter) from `fonts.googleapis.com`; all were migrated
  to self-hosted `@font-face` declarations in Sep 2026. Don't reintroduce an external
  font `<link>`: add a new self-hosted woff2 instead.
- When adding a page, copy an existing locale's page as the template rather than
  writing one from scratch, to keep markup structure consistent across locales.

<!-- END GENERATED -->

<!-- Per-repo notes go below this line. Never touched by the sync script. -->

## ihr specifics

This repo is different from the other site repos: it is a single-language, dark-only
artist and label site with its own design system. The generated block above applies
only in part. The scoped instruction files here (`.github/instructions/`) are
ihr-specific overrides, not the shared ones.

- Inner Hell Records (IHR), a London extreme metal label. Canonical domain
  `innerhellrecords.co.uk`. Roster: Vosforis. Debut release: Cosmic Cenotaph
  (IHR-VOS001, 180g vinyl).
- Pages: `index.html`, `artist.html`, `privacy.html`, `terms.html`, `links/index.html`.
  No locale directories, no `redirect.js`, no `data-languages`, no hreflang.
- Design tokens are `--bg`, `--bg-alt`, `--ink`, `--ink-dim`, `--line`, `--accent`
  (red), `--accent-soft`, `--shadow`. Fonts are Bebas Neue and Space Grotesk,
  self-hosted. Do not port rules from the other repos' stylesheets.
- No Google Analytics tag is wired into any HTML head. `main.js` only has the
  consent scaffolding. Do not add a measurement ID without approval.
- `sitemap.xml`, `robots.txt` and `llms.txt` are maintained by hand. Update them when
  pages or facts change.
- The Instagram section loads from a Behold feed URL in `main.js` and falls back to
  static links. Keep the fallback.
- The repo has no `CNAME` file (it was deleted) and GitHub Pages currently reports no
  custom domain, serving at `gitc.digital/ihr/`. Canonical URLs, `og:url`, the sitemap
  and `llms.txt` all assume `innerhellrecords.co.uk`. Do not "fix" either side without
  asking.
- Cache-busting: CSS and JS are referenced with a `?v=N` query string. Bump it when
  you change `styles.css` or `main.js`.
