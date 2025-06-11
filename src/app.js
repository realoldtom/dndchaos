// src/app.js

import {
  loadState,
  mergeState,
  saveState,
  clearState,
  debouncedSaveState,
} from "./utils/storage.js";
import { characters, initiativeOrder } from "./data/characters.js";

export function validateCharacters(chars) {
  for (const [id, character] of Object.entries(chars)) {
    if (!Array.isArray(character.combatAbilities)) {
      throw new Error(
        `Invalid character definition: ${id} – combatAbilities must be an array`,
      );
    }

    character.combatAbilities.forEach((ability, idx) => {
      if (typeof ability.coach !== "string" || ability.coach.trim() === "") {
        throw new Error(
          `Invalid character definition: ${id} – ability[${idx}].coach must be non-empty`,
        );
      }
    });
  }
}

let state = { characters: {}, initiativeOrder: [], currentTurnIndex: 0 };
const appRoot = document.getElementById("app-root");

function init() {
  validateCharacters(characters);

  const raw = loadState();
  const saved = raw || {};

  const merged = mergeState(characters, initiativeOrder, saved);
  Object.assign(state, merged);

  renderUI();
  // Keep the direct flush on unload
  window.addEventListener("beforeunload", () => saveState({ ...state }));
}

function renderUI() {
  // 1) Clear the root
  appRoot.innerHTML = "";

  // 2) Figure out whose turn it is
  const charId = state.initiativeOrder[state.currentTurnIndex];
  const currentChar = state.characters[charId];

  // 3) Header: “🔮 It’s X’s Turn!”
  const header = document.createElement("div");
  header.className = "turn-tracker";
  header.textContent = `🔮✨ It’s ${currentChar.className}’s Turn! ✨🔮`;
  appRoot.appendChild(header);

  // 4) Preview pane: HP / AC / Spell Slots
  const preview = document.createElement("div");
  preview.className = "up-next";
  preview.innerHTML = `
    <div>❤️ <strong>HP:</strong> ${currentChar.hp}</div>
    <div>🛡️ <strong>AC:</strong> ${currentChar.ac}</div>
    <div>✨ <strong>Slots:</strong> ${currentChar.spellSlots}</div>
  `;
  appRoot.appendChild(preview);

  // 5) Action grid: each ability as a card/button
  const actionGrid = document.createElement("div");
  actionGrid.className = "actions-grid";
  currentChar.combatAbilities.forEach((ability) => {
    const card = document.createElement("button");
    card.className = "action-card";

    // pick an emoji based on keywords in the name
    let icon = "✨";
    if (/sword|dagger|scimitar/i.test(ability.name)) icon = "⚔️";
    if (/bow|crossbow/i.test(ability.name)) icon = "🏹";
    if (/claws/i.test(ability.name)) icon = "🐾";
    if (/frost|ice/i.test(ability.name)) icon = "❄️";
    if (/breath|area/i.test(ability.name)) icon = "🌬️";

    card.innerHTML = `
      <div class="ability-name">${icon} ${ability.name}</div>
      <div class="ability-desc">${ability.desc}</div>
      <div class="coach-hint">💡 ${ability.coach}</div>
    `;

    // On click: mark used, style, and debounced save
    card.addEventListener("click", () => {
      if (!ability.used) {
        ability.used = true;
        card.classList.add("used");
        debouncedSaveState({ ...state });
      }
    });

    actionGrid.appendChild(card);
  });
  appRoot.appendChild(actionGrid);

  // 6) DM Controls: Next, Skip, Reset
  const controls = document.createElement("div");
  controls.className = "dm-controls";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "➡️ Next Turn";
  nextBtn.addEventListener("click", nextTurn);

  const skipBtn = document.createElement("button");
  skipBtn.textContent = "⏭️ Skip Turn";
  skipBtn.addEventListener("click", skipTurn);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "🔄 Reset Combat";
  resetBtn.addEventListener("click", resetCombat);

  controls.append(nextBtn, skipBtn, resetBtn);
  appRoot.appendChild(controls);

  // 7) Mini-order: show upcoming turns
  const miniOrder = document.createElement("div");
  miniOrder.className = "initiative-list";
  state.initiativeOrder.forEach((id, i) => {
    const spot = document.createElement("span");
    spot.textContent = state.characters[id].name;
    if (i === state.currentTurnIndex) {
      spot.classList.add("current");
    }
    miniOrder.appendChild(spot);
  });
  appRoot.appendChild(miniOrder);
}

function nextTurn() {
  state.currentTurnIndex =
    (state.currentTurnIndex + 1) % state.initiativeOrder.length;
  debouncedSaveState({ ...state });
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
