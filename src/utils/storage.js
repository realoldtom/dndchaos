// utils/storage.js
// ====================
// Minimal localStorage helper functions to save/load and reset session state.
// Exports must match how app.js calls them.

const STORAGE_KEY = "dndChaosState";

/**
 * Save the entire state object to localStorage.
 * @param {Object} state - e.g. { initiativeOrder, currentTurnIndex, characters }
 */
export function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save state:", e);
  }
}

/**
 * Load the saved state from localStorage.
 * Returns null if not found or parse error.
 */
export function loadState() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load saved state:", e);
    return null;
  }
}

/**
 * Clear all saved state (used by "Reset Combat").
 */
export function clearState() {
  window.localStorage.removeItem(STORAGE_KEY);
}

/**
 * Merge savedState into the fresh `characters` and `initiativeOrder`.
 * - Restores `used` flags on abilities.
 * - Restores `currentTurnIndex`.
 *
 * @param {Object} freshChars - original characters object
 * @param {Array} freshOrder - original initiativeOrder array
 * @param {Object} savedState - the loaded state from localStorage
 * @returns {Object} merged state: { characters, initiativeOrder, currentTurnIndex }
 */
export function mergeState(freshChars, freshOrder, savedState) {
  if (!savedState) {
    return {
      characters: freshChars,
      initiativeOrder: freshOrder,
      currentTurnIndex: 0,
    };
  }

  // Deep clone freshChars so we don’t mutate the original definitions
  const mergedChars = JSON.parse(JSON.stringify(freshChars));

  // Restore each ability’s `used` flag
  for (const charKey in savedState.characters) {
    if (!mergedChars[charKey]) continue;
    const savedChar = savedState.characters[charKey];
    mergedChars[charKey].combatAbilities.forEach((ability, idx) => {
      if (savedChar.combatAbilities && savedChar.combatAbilities[idx]) {
        ability.used = savedChar.combatAbilities[idx].used;
      }
    });
  }

  // We assume the initiative order array itself doesn’t change between sessions.
  const currentTurnIndex = savedState.currentTurnIndex ?? 0;
  return {
    characters: mergedChars,
    initiativeOrder: freshOrder,
    currentTurnIndex,
  };
}
