# Inner Hell Records (IHR)

Static GitHub Pages site for Inner Hell Records.

## Project Structure

```
ihr/
├── _config.yml
├── CNAME
├── index.html
├── artist.html
├── LOCAL_DEV.md
├── README.md
└── assets/
	├── css/
	│   └── styles.css
	└── js/
		└── main.js
```

## Included Sections

- Hero landing section
- Artist section + dedicated artist page
- Merch section
- Vinyl feature section
- Instagram feed section with static-safe fallback
- Link hub section recreating key Linktree destinations

## Local Development

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`.

## Deployment

Deploy on GitHub Pages from the repository root on the default branch.

Custom domain is configured via `CNAME`.