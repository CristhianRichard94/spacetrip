# SpaceTrip Resume

An interactive space-themed resume built with Three.js and React Three Fiber.
Scroll through a 3D solar system to explore experience, education, skills, and more.

Live demo: https://cr-spacetrip.netlify.app/

![SpaceTrip demo](/static/spacetrip-demo.gif)

## Why

A résumé PDF is static. This turns the same content into an interactive scroll experience — a solar system that reacts to scroll position, camera moves between sections, background music toggle — while staying content-complete for anyone just skimming for experience/skills.

## Features

- 3D solar system rendered with React Three Fiber, scroll-driven camera rig (`ScrollCameraRig`)
- Planet textures per real-body (Earth, Mars, Jupiter, Saturn w/ rings, etc.), shooting stars, orbit lines
- GSAP-driven scroll animations across Hero, Portfolio, About, Experience, Education, Languages, Skills, Socials sections
- Background music toggle, `prefers-reduced-motion` support (`usePrefersReducedMotion` hook) and WebGL capability check with graceful fallback
- Also doubles as a personal link hub: the deployed site's `_redirects` config 301-redirects short paths (`/futsal-manager`, `/edm`, `/ai-engineer-path`, etc.) to the user's other live projects

## Tech stack

- React 18 + `@react-three/fiber` (Three.js) for the 3D scene
- GSAP for scroll-triggered animation
- Vite for build/dev
- Plain JS/JSX — no TypeScript

## Architecture

`App.jsx` mounts a full-page `SolarSystemScene` (3D background) behind stacked scroll sections. The camera rig listens to scroll position and animates between named waypoints as each section enters view. Static assets (textures, redirects config, demo GIF) live in `static/`, copied into the Vite build via `publicDir`.

## Setup

```bash
npm install
npm run dev     # localhost:8080
npm run build   # production build -> dist/
```

## What I'd improve

- Add automated tests — currently none
- Migrate to TypeScript for the scene/component props
- Lazy-load planet textures to cut initial payload

## Contributing

Personal portfolio project, but issues/PRs on the 3D scene or accessibility are welcome.

## License

No license file present.
