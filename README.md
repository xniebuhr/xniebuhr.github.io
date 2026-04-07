# Developer Portfolio

Personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Quick Start

1. Install dependencies: `npm install`
2. Run locally: `npm run dev`
3. Build production bundle: `npm run build`
4. Preview production build: `npm run preview`

## Edit Your Content

Update your profile/projects/experience/skills in `src/data/portfolio.ts`.

This file is the single source of truth for content cards and profile links.

## Main Structure

- `src/App.tsx` - page assembly
- `src/components/` - reusable UI sections and interactive effects
- `src/data/portfolio.ts` - editable content model
- `.github/workflows/deploy.yml` - GitHub Pages deploy pipeline

## Deploy

This repo includes a GitHub Actions workflow that deploys on every push to `main`.

To enable GitHub Pages:

1. Push this repo to GitHub.
2. In repository settings, open Pages.
3. Set source to GitHub Actions.
4. Push to `main` and the site deploys automatically.
