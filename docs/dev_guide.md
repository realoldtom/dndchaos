# Developer Guide

Guidance for contributing, extending, and maintaining the Chaos Manager codebase.

---

## 1. Prerequisites

- **Node.js** (for local HTTP server, linting)
- **Git** (version control)
- **Browser** with ES module support

## 2. Setup & Run

1. Clone the repo and `npm install` (optional for linting).
2. Serve with `npx serve .` or `python -m http.server 3000`.
3. Open `http://localhost:3000/`.

## 3. Code Structure

- `index.html` – Loads `app.js` as module.
- `styles.css` – Global styles.
- `app.js` – Entry point and UI logic.
- `data/characters.js` – Character definitions.
- `utils/storage.js` – State management stubs.

## 4. Workflow

- Branch naming: `feat/`, `fix/`, `docs/`.
- Conventional commits: `feat(module): description`.
- Write tests for `mergeState()` and `renderUI()` in future.
