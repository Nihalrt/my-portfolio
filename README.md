# Sai Nihal Diddi — Portfolio

[Visit the portfolio](https://nihalrt.github.io/my-portfolio/)

A personal portfolio introducing my software development experience, projects,
education, and interests. Built with Vite, vanilla JavaScript, and Three.js.

## Run locally

Requires Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

## Update content

- `index.html`: introduction, experience, project summaries, skills, and links.
- `src/main.js`: short project overviews and interactive controls.
- `src/style.css`: responsive layout, typography, and motion.
- `src/scene.js`: the 3D sculpture, loaded separately from the main page.
- `public/Sai-Nihal-Diddi-Resume.pdf`: the downloadable resume.
- `public/social-preview.png`: social sharing image.

The project visuals are illustrations, not live product screenshots or traffic.
The Switchboard slider uses 100 simulated devices. The GitHub panel uses GitHub's
public API with a one-hour cache and keeps a static profile link if the API fails.
The site needs no secrets, backend, login, analytics, or external font service.

## Publish to GitHub Pages

GitHub Pages uses the root of the existing `gh-pages` branch. Save source changes
to `master`, then run:

```sh
npm run deploy
```

The deployment script builds the site, checks out the current remote Pages branch
in a temporary directory, and commits the new files. It uses a normal push so
existing deployment history remains available. Git credentials need push access
to this repository. GitHub's Pages build must finish before changes appear live.

The relative Vite base supports the `/my-portfolio/` project path.

## Accessibility and performance

Keyboard navigation, a skip link, expandable experience sections, project dialogs
with focus restoration, a motion toggle, and reduced motion support are included.
WebGL pauses when the sculpture is offscreen or the tab is hidden. A static
illustration remains available if WebGL cannot initialize. Fonts are self-hosted
WOFF2 files; their licenses are in `public/licenses`.

Contact: [sainihaldiddi2002@gmail.com](mailto:sainihaldiddi2002@gmail.com)
