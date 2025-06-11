// src/app.js

import StateStore from "./utils/state.js";
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

let store;
const appRoot = document.getElementById("app-root");

function init() {
  validateCharacters(characters);

  const raw = loadState();
  const saved = raw || {};
  const initial = mergeState(characters, initiativeOrder, saved);

  // create our event-driven store
  store = new StateStore(initial);

  // on every change: save + rerender
  store.subscribe((state) => {
    debouncedSaveState({ ...state });
    renderUI(state);
  });

  // final flush on unload
  window.addEventListener("beforeunload", () =>
    saveState({ ...store.getState() }),
  );

  // first render
  renderUI(store.getState());
}

function renderUI(state) {
  appRoot.innerHTML = "";

  const charId = state.initiativeOrder[state.currentTurnIndex];
  const currentChar = state.characters[charId];

  // Header
  const header = document.createElement("div");
  header.className = "turn-tracker";
  header.textContent = `🔮✨ It’s ${currentChar.name} the ${currentChar.className}’s Turn! ✨🔮`;
  appRoot.appendChild(header);

  // Preview
  const preview = document.createElement("div");
  preview.className = "up-next";
  preview.innerHTML = `
    <div>❤️ <strong>HP:</strong> ${currentChar.hp}</div>
    <div>🛡️ <strong>AC:</strong> ${currentChar.ac}</div>
    <div>✨ <strong>Slots:</strong> ${currentChar.spellSlots}</div>
  `;
  appRoot.appendChild(preview);

  // Abilities
  const actionGrid = document.createElement("div");
  actionGrid.className = "actions-grid";
  currentChar.combatAbilities.forEach((ability, idx) => {
    const card = document.createElement("button");
    card.className = "action-card";
    if (ability.used) card.classList.add("used");

    // choose emoji
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

    card.addEventListener("click", () => {
      if (ability.used) return;
      // publish a state update
      store.publish((s) => {
        const chars = { ...s.characters };
        const charCopy = { ...chars[charId] };
        const abilities = charCopy.combatAbilities.slice();
        abilities[idx] = { ...abilities[idx], used: true };
        charCopy.combatAbilities = abilities;
        chars[charId] = charCopy;
        return { ...s, characters: chars };
      });
    });

    actionGrid.appendChild(card);
  });
  appRoot.appendChild(actionGrid);

  // DM Controls
  const controls = document.createElement("div");
  controls.className = "dm-controls";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "➡️ Next Turn";
  nextBtn.addEventListener("click", () => {
    store.publish((s) => ({
      ...s,
      currentTurnIndex: (s.currentTurnIndex + 1) % s.initiativeOrder.length,
    }));
  });

  const skipBtn = document.createElement("button");
  skipBtn.textContent = "⏭️ Skip Turn";
  skipBtn.addEventListener("click", () => {
    store.publish((s) => ({
      ...s,
      currentTurnIndex: (s.currentTurnIndex + 1) % s.initiativeOrder.length,
    }));
  });

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "🔄 Reset Combat";
  resetBtn.addEventListener("click", () => {
    if (!confirm("Reset combat?")) return;
    store.publish((s) => {
      // clear all used flags
      const resetChars = {};
      for (const [id, ch] of Object.entries(s.characters)) {
        resetChars[id] = {
          ...ch,
          combatAbilities: ch.combatAbilities.map((a) => ({
            ...a,
            used: false,
          })),
        };
      }
      return {
        characters: resetChars,
        initiativeOrder: [...s.initiativeOrder],
        currentTurnIndex: 0,
      };
    });
    clearState();
  });

  controls.append(nextBtn, skipBtn, resetBtn);
  appRoot.appendChild(controls);

  // Initiative list
  const miniOrder = document.createElement("div");
  miniOrder.className = "initiative-list";
  state.initiativeOrder.forEach((id, i) => {
    const spot = document.createElement("span");
    spot.textContent = state.characters[id].name;
    if (i === state.currentTurnIndex) spot.classList.add("current");
    miniOrder.appendChild(spot);
  });
  appRoot.appendChild(miniOrder);
}

window.addEventListener("DOMContentLoaded", init);
