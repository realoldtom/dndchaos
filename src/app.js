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
import {
  renderHeader,
  renderPreview,
  renderActions,
  renderControls,
  renderInitiativeList,
} from "./ui/renderers.js";

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

  // determine current character
  const charId = state.initiativeOrder[state.currentTurnIndex];
  const currentChar = state.characters[charId];

  // 1) Header
  renderHeader(appRoot, currentChar.name, currentChar.className);

  // 2) Preview pane
  renderPreview(
    appRoot,
    currentChar.hp,
    currentChar.ac,
    currentChar.spellSlots,
  );

  // 3) Abilities grid
  renderActions(appRoot, currentChar.combatAbilities, (idx) => {
    store.publish((s) => {
      const chars = { ...s.characters };
      const charCopy = { ...chars[charId] };
      const abilities = [...charCopy.combatAbilities];
      abilities[idx] = { ...abilities[idx], used: true };
      charCopy.combatAbilities = abilities;
      chars[charId] = charCopy;
      return { ...s, characters: chars };
    });
  });

  // 4) DM Controls
  renderControls(appRoot, {
    onNext: () =>
      store.publish((s) => ({
        ...s,
        currentTurnIndex: (s.currentTurnIndex + 1) % s.initiativeOrder.length,
      })),
    onSkip: () =>
      store.publish((s) => ({
        ...s,
        currentTurnIndex: (s.currentTurnIndex + 1) % s.initiativeOrder.length,
      })),
    onReset: () => {
      if (!confirm("Reset combat?")) return;
      store.publish((s) => {
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
          ...s,
          characters: resetChars,
          currentTurnIndex: 0,
        };
      });
      clearState();
    },
  });

  // 5) Initiative list
  renderInitiativeList(appRoot, state.initiativeOrder, state.currentTurnIndex);
}

window.addEventListener("DOMContentLoaded", init);
