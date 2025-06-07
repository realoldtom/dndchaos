# User Guide

How a Dungeon Master uses Chaos Manager in play.

---

## 1. What Is Chaos Manager?

A zero-backend, browser-based tool for DM turn tracking and action guidance.

## 2. Setup

1. Serve via `npx serve .` or `python -m http.server`.
2. Open `http://localhost:3000/`.

## 3. Configuring Party

Edit `data/characters.js`: set `id`, `name`, `initiative`, `hp`, `ac`, and `actions`.

## 4. Using the Interface

- Turn list in initiative order.
- Highlight current turn.
- “Next Turn” button cycles through.

## 5. Troubleshooting

- Blank screen? Check HTTP vs file protocol.
- Module errors? Inspect DevTools network and console.