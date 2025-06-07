[![CI](https://github.com/<you>/dnd-chaos-manager/actions/workflows/ci.yml/badge.svg)](https://github.com/realoldtom/dndchaos/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-v1.1-brightgreen.svg)]()


# D&D Chaos Manager – MVP (v1.1)

A purpose-built, single-screen tool to help a first-time DM manage 12 Level-2 newbie players in chaotic combat.

---

## 1. Project Overview

- **Goal:** Reduce decision paralysis and cut 60-minute combat rounds down to under 20 minutes.
- **Audience:** My personal D&D group (12 kids, all Level 2).
- **Scope:** Combat only—turn tracker, curated actions, coach hints, DM controls, and state persistence.

---

## 2. File Structure

dnd-chaos-manager/
├── index.html → Entry point; contains #app-root
├── styles.css → All CSS for turn tracker, cards, buttons
├── data/
│ └── characters.js → Hardcoded characters + initiativeOrder
├── utils/
│ └── storage.js → localStorage helpers: saveState, loadState, clearState, mergeState
└── app.js → Main logic: init, renderUI, nextTurn, skipTurn, resetCombat


---

## 3. How to Run

1. Clone or download the repository.
2. Open `index.html` in your browser (no server required).
3. The app will load characters from `data/characters.js` and restore any saved state.
4. Use **Next Turn**, **Skip Player**, and **Reset Combat** buttons to control flow.
5. Click action cards to mark them “used” (gray-out) and persist that status.

---

## 4. Authoring New Characters

- Edit `data/characters.js`.
- Each character:
  - Must have `name`, `class`, `hp`, `ac`, `spellSlots`.
  - Must list 2–4 `combatAbilities`, each with:
    - `name` (string)
    - `desc` (string)
    - `coach` (string) — plain-English tip for new players
    - `used` (boolean, default `false`)

- Add any new entries to `initiativeOrder` in the same file. The order of objects there determines initial initiative.

---

## 5. Storage & State

- The app saves:
  - `characters` (with updated `used` flags),
  - `initiativeOrder`,
  - `currentTurnIndex`
  to `localStorage` under key `"dndChaosState"` on every relevant change.
- **Reset Combat** will clear localStorage and reset all `used` flags.

---

## 6. Next Steps & TODOs

- **Add Remaining Characters:** Stub out all 12 to test real group flow.
- **Refine Styles:** Adjust `.action-card` sizing for large tables and refine color-contrast if needed.
- **Optional “Skip Log”:** Track which players were skipped this combat.
- **Expand to Social/Exploration:** Create additional views if you want to cover non-combat phases later.
- **Test on Actual Display:** Open on a large TV or projector to ensure readability from 10+ feet away.
