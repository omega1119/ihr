---
applyTo: "**/*.html"
---

- Use semantic markup (`header`, `nav`, `main`, `section`, `footer`) over generic
  `div`s where an element already means the right thing.
- This site is single-language (`en-GB`). There is no `data-languages` selector,
  no `HREFLANG_LANGS` and no locale directories. Do not add them.
- Every `<img>` needs `alt` text. Empty `alt=""` is only correct for a purely
  decorative image.
- Every page needs a `<title>`, a meta `description`, and `og:` tags including
  `og:image` that match what the page actually shows. Reuse
  `assets/images/og-image.jpg` when the page has no more specific image.
- Pages are listed in `sitemap.xml` and summarised in `llms.txt`. When adding,
  renaming or removing a page, update both in the same change.
- `<body data-cookie-consent>` enables the consent banner in `main.js`. Keep it on
  every page that loads `main.js`.
