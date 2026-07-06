# Codexorr Website

React + Vite multi-page marketing site for Codexorr.

## Stack

- React 18
- Vite 6
- React Router 6
- Framer Motion
- Three.js
- Tailwind CSS

## Project structure

```
public/           Static assets (logo)
src/
  components/     App shell, sections, effects
  App.jsx         Router wrapper
  main.jsx        Entry point
  index.css       Global styles
```

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/solutions` | Solutions |
| `/services` | Services |
| `/portfolio` | Case studies |
| `/industries` | Industries |
| `/about` | About |
| `/resources` | Resources |
| `/contact` | Contact & FAQ |

## Deploy

Build with `npm run build` and deploy the `dist/` folder to Vercel.
