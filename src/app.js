// src/app.js

import {
  loadState,
  mergeState,
  saveState,
  clearState,
} from "./utils/storage.js";
import { characters, initiativeOrder } from "./data/characters.js";

/**
 * Ensure each character object conforms to our required schema.
 * @param {Record<string, Character>} chars
 * @throws {Error} if any character is mis-configured
 */
export function validateCharacters(chars) {
  Object.entries(chars).forEach(
    ([id, { name, className, combatAbilities }]) => {
      if (!name || !className || !Array.isArray(combatAbilities)) {
        throw new Error(
          `Invalid character definition: ${id} – missing name, className, or combatAbilities`,
        );
      }
      if (combatAbilities.length < 2 || combatAbilities.length > 10) {
        throw new Error(
          `Invalid character definition: ${id} – combatAbilities must have 2–4 entries`,
        );
      }
      combatAbilities.forEach((ability, idx) => {
        if (!ability.coach || ability.coach.trim() === "") {
          throw new Error(
            `Invalid character definition: ${id} – ability[${idx}].coach must be non-empty`,
          );
        }
      });
    },
  );
}

let state = { characters: {}, initiativeOrder: [], currentTurnIndex: 0 };
const appRoot = document.getElementById("app-root");

function init() {
  // 0) Sanity-check our static data
  validateCharacters(characters);

  // 1) Load persisted state (or get an empty object)
  const raw = loadState();
  const saved = raw || {};

  // 2) Merge defaults + saved
  const merged = mergeState(characters, initiativeOrder, saved);
  Object.assign(state, merged);

  // 3) Render
  renderUI();
  window.addEventListener("beforeunload", () => saveState({ ...state }));
}

function renderUI() {
  appRoot.innerHTML = "";

  // 1) Header
  const charId = state.initiativeOrder[state.currentTurnIndex];
  const currentChar = state.characters[charId];
  const header = document.createElement("div");
  header.className = "turn-tracker";
  header.textContent = `🔮 It’s ${currentChar.name}’s Turn! (${currentChar.className})`;
  appRoot.appendChild(header);

  // 2) Actions grid
  const actionGrid = document.createElement("div");
  actionGrid.className = "actions-grid";
  currentChar.combatAbilities.forEach((ability) => {
    const card = document.createElement("div");
    card.className = "action-card";
    if (ability.used) card.classList.add("used");

    const nameEl = document.createElement("div");
    nameEl.textContent = ability.name;
    nameEl.style.fontWeight = "bold";
    card.appendChild(nameEl);

    const descEl = document.createElement("div");
    descEl.textContent = ability.desc;
    card.appendChild(descEl);

    const coachEl = document.createElement("div");
    coachEl.className = "coach-hint";
    coachEl.textContent = `💡 ${ability.coach}`;
    card.appendChild(coachEl);

    card.addEventListener("click", () => {
      if (!ability.used) {
        ability.used = true;
        card.classList.add("used");
        saveState({ ...state });
      }
    });

    actionGrid.appendChild(card);
  });
  appRoot.appendChild(actionGrid);

  // 3) Up Next preview
  const preview = document.createElement("div");
  preview.className = "up-next";
  const nextNames = [1, 2, 3].map((i) => {
    const idx = (state.currentTurnIndex + i) % state.initiativeOrder.length;
    const id = state.initiativeOrder[idx];
    return state.characters[id].name;
  });
  preview.textContent = `Up Next: ${nextNames.join(" → ")}`;
  appRoot.appendChild(preview);

  // 4) DM Controls
  const controls = document.createElement("div");
  controls.className = "dm-controls";
  ["⏭️ Next Turn", "⏭️ Skip Player", "🔄 Reset Combat"].forEach((label, i) => {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.addEventListener("click", [nextTurn, skipTurn, resetCombat][i]);
    controls.appendChild(btn);
  });
  appRoot.appendChild(controls);

  // 5) Mini initiative list
  const mini = document.createElement("div");
  mini.className = "initiative-list";
  mini.textContent =
    "Initiative Order: " +
    state.initiativeOrder
      .map((id, idx) => {
        const n = state.characters[id].name.replace(/[^a-zA-Z ]/g, "");
        return idx === state.currentTurnIndex ? `${n} (CURRENT)` : n;
      })
      .join(" → ");
  appRoot.appendChild(mini);
}

function nextTurn() {
  state.currentTurnIndex =
    (state.currentTurnIndex + 1) % state.initiativeOrder.length;
  saveState({ ...state });
  renderUI();
}

function skipTurn() {
  nextTurn();
}

function resetCombat() {
  if (!confirm("Reset combat?")) return;
  Object.values(state.characters).forEach((c) =>
    c.combatAbilities.forEach((a) => (a.used = false)),
  );
  state.currentTurnIndex = 0;
  clearState();
  renderUI();
}

window.addEventListener("DOMContentLoaded", init);
