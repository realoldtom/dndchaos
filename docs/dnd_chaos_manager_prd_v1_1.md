# 📘 PRD: D&D Chaos Manager – MVP (v1.1)

## 0. Project Context & Goals

**Project Lead:** [Your Name/DM Name]  
**Target Audience:** My personal D&D campaign with 12 new kid players, myself as a first-time DM.

**Primary Goals for this MVP:**
1. **Solve a Personal Pain Point:** Combat rounds and decision paralysis in my specific campaign.
2. **Product Management Learning:** Practice scoping an MVP and managing delivery.
3. **Software Development Learning:** Front-end dev, state management, UI/UX design.

**Key Constraints & Preferences:**
- **DM Laptop Only:** Runs on DM’s machine; optional display to TV.
- **Manual Play Preserved:** Dice and damage tracking stay analog.
- **Not Commercial:** No scalability or backend; MVP only.
- **All Players Level 2**

---

## 1. 🎯 Problem Statement

**User:** First-time DM with 12 Level-2 new players  
**Core Pain:** Decision paralysis, constant “what can I do?” questions, 60-minute combat rounds.  
**Solution:** Shared DM-controlled turn display with curated actions and contextual explanations.

---

## 2. 🧠 Core Insight

This is a capability translation problem, not a rules engine. Tool must assume **zero rules knowledge** and explain character options clearly.

---

## 3. 🧩 MVP Modules

| Module                  | Role                                                      |
|-------------------------|-----------------------------------------------------------|
| Turn Tracker            | Who’s up + next                                           |
| Character Action Display| Curated per-player actions (2–4 max)                      |
| Interactive Player Coach| Static plain-English “why/when to use” explanation        |
| DM Controls             | Next / Skip / Reset                                       |
| State Management        | localStorage-only save/load (browser-based)               |

---

## 4. 🧙 Interactive Player Coach – Spec

**Purpose:** Reduce DM cognitive burden. Explain what each action does and when to use it.  
**Scope:** Pre-authored tips shown alongside action buttons.

**Format Example:**
```json
{
  "name": "Magic Missile",
  "desc": "3 auto-hit darts, 1d4+1 each",
  "coach": "Use when you want guaranteed damage. Great vs fast enemies."
}
```

---

## 5. 🛠 MVP Feature Table

| Feature             | Description                               |
|---------------------|-------------------------------------------|
| Turn Tracker        | Highlights current player + 2 next        |
| Action Display      | 2–4 preloaded per player actions          |
| Coach Feedback      | Coach blurb shows under each action       |
| Turn Control        | DM clicks: Next / Skip / Reset            |
| Usage Tracking      | Basic checkbox or flag per ability        |
| Session Save        | All state saved via localStorage          |

---

## 6. 📐 Layout Sketch

```
┌──────────── Combat Turn ─────────────┐
│  🔮 It’s Ava’s Turn! (Sorcerer)      │
│                                     │
│  [ Magic Missile ] – “Auto-hit spell”    │
│  [ Shield ] – “Block next attack”        │
│  [ Dagger ] – “Simple backup weapon”     │
│                                     │
│  Next Up: Mike → Luna → Pip         │
└─────────────────────────────────────┘
```

---

## 7. 📏 Success Criteria

| Metric                     | Target         |
|----------------------------|----------------|
| Decision time per player   | < 2 minutes    |
| “What can I do?” frequency | Reduced 80%    |
| Combat round duration      | < 20 minutes   |
| Player initiative clarity  | “Whose turn?” asked ≤ once per round |

---

## 8. 🔥 Phase 1 Dev Plan

- [x] Turn cycle logic
- [x] Static JSON player data
- [x] Curated action renderer
- [x] DM control bar
- [x] Coach hints under actions
- [x] `localStorage` support

---

## 9. 🚫 Out of Scope

- Dice rolling
- HP/damage tracking
- Character creation
- Live sync/multiplayer
- Rules engine
- Backend API

---

**Final Note:** This is a purpose-built, display-first runtime assistant for one campaign. It is not a general-purpose D&D tool—yet.