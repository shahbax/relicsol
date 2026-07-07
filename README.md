# Relicsol Next.js Website

This is the converted Next.js version of the Claude Design export.

## Fixed in this version

- Case study URLs now work at both clean URLs and old Claude export URLs.
  - `/portfolio/firmate`
  - `/CaseStudy-firmate.dc.html`
- Portfolio cards are patched to open clean case study URLs.
- Services dropdown is fixed across homepage, about, portfolio, service, blog, and case study pages.
- Static `.dc.html` links are converted to clean Next.js routes.
- Production build tested with `npm run build`.

## Local setup

```bash
npm config set registry https://registry.npmjs.org/
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Build test

```bash
npm run build
```

## Push to existing GitHub repo

From inside this folder:

```bash
git init
git branch -M main
git remote add origin https://github.com/shahbaz/relicsol.git
git add .
git commit -m "Fix Relicsol Next.js routes and dropdown"
git push -f origin main
```

If your remote already exists locally, use:

```bash
git remote set-url origin https://github.com/shahbaz/relicsol.git
git push -f origin main
```
