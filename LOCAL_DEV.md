# IHR Local Development

## Run Locally

From the project root:

```bash
python3 -m http.server 8080
```

Then open:

- http://localhost:8080/
- http://localhost:8080/artist.html

## Notes

- This site is static and GitHub Pages compatible.
- The Instagram section attempts a public RSS-based feed first, and gracefully falls back to direct links.
