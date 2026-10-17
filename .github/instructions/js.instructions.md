---
applyTo: "assets/js/*.js"
---

- `main.js` is the only script. It handles the mobile menu, the cookie consent
  banner, scroll reveal and the Instagram feed. There are no locale string maps and
  no `redirect.js` on this site.
- Analytics must stay consent-gated: `gtag()` calls only run after the visitor
  accepts, through the existing `enableAnalytics()` / `disableAnalytics()` helpers.
  No GA measurement ID is wired into any HTML head today. Do not add one without
  approval.
- Do not add third-party `<script src>` tags. The Instagram feed is fetched at
  runtime from the existing Behold feed URL and must keep its static fallback when
  the fetch fails or times out.
