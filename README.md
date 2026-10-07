# My favorite Operas

A small, personal guide to the operas I love. The first release includes a responsive home page, an opera directory, and structured starter pages for four works.

## Run locally

This is a dependency-free static site. From the repository root, run:

```sh
python3 -m http.server 4173
```

Then open [http://localhost:4173](http://localhost:4173). You can also open `index.html` directly, though serving it locally better reflects how the site will run on GitHub Pages.

## Routes

- `#/` — Home
- `#/operas` — Opera directory
- `#/about` — About this collection
- `#/operas/il-barbiere-di-siviglia`
- `#/operas/tristan-und-isolde`
- `#/operas/cosi-fan-tutte`
- `#/operas/macbeth`

Hash routes keep navigation compatible with GitHub Pages without a server-side rewrite. Home and directory search send queries to the directory. Opera information lives in `src/data/operas.js`; the shared page shell and route rendering live in `src/main.js`. The homepage theater image is `public/images/opera-house-hero.webp`; the directory banner and opera card artwork are original generated assets in `public/images/`.

## Publish with GitHub Pages

The included Pages workflow publishes the repository root whenever changes land on `main`. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. The workflow is in `.github/workflows/pages.yml`.

## Next

The opera pages are intentionally foundations only. They hold metadata and a short introduction, with the libretto and side-by-side translation reserved for a later phase.
