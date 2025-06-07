# Architecture Overview

This document describes the high-level structure and data flow of the D&D Chaos Manager MVP.

---

## 1. Purpose & Scope

- **Goal:** Provide a simple, client-only turn tracker and action coach for large groups of new players (ages 8–14).
- **MVP Focus:** Combat turn ordering, “next turn” cycling, and static action display. No backend or multi-user sync.

## 2. Project Layers

```
/
├── index.html           ← Static shell, loads app.js
├── styles.css           ← Global styles
├── app.js               ← Entry point, UI orchestration
├── data/                ← Static game data (characters, actions)
│   └── characters.js
├── utils/               ← Utility modules (state management)
│   └── storage.js
└── docs/                ← Documentation folder
```

## 3. Event-Driven Flow

1. **Page load** → Fetch `index.html` → Load `app.js`.
2. **init()** → `loadState()` + `mergeState()` → Populate `state`.
3. **renderUI()** → Build DOM: header, turn list, Next Turn button.
4. **Next Turn click** → Increment `currentTurnIndex` → Re-render.

## 4. Extension Points

- Action Coach panel under each turn.
- Persistence via `localStorage`.
- Theming in `styles.css`.
