// src/utils/storage.js

const STORAGE_KEY = "dnd-chaos-manager-state";
const SCHEMA_VERSION = "1.0";

/**
 * Load persisted session state from localStorage.
 * If the JSON is corrupted or the schemaVersion mismatches, clear it out and return null.
 * @returns {SavedState|null}
 */
export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);

    if (parsed.schemaVersion !== SCHEMA_VERSION) {
      console.warn(
        `Warning: schema version mismatch (found ${parsed.schemaVersion}, expected ${SCHEMA_VERSION}) – resetting state.`,
      );
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    delete parsed.schemaVersion;
    return parsed;
  } catch (err) {
    console.warn(
      "Warning: corrupted saved state detected in localStorage – resetting state.",
      err,
    );
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

/**
 * Persist session state to localStorage.
 * Embeds the current schemaVersion so we can detect mismatches on load.
 * @param {SavedState} state
 */
export function saveState(state) {
  const toSave = {
    ...state,
    schemaVersion: SCHEMA_VERSION,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    console.error("Failed to save state:", err);
  }
}

/**
 * debounce(fn, wait)
 * Returns a version of `fn` that waits `wait` ms after the *last* call
 * before actually invoking. Good for rate-limiting rapid state saves.
 */
function debounce(fn, wait = 200) {
  let timeoutId = null;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  };
}

/**
 * A debounced version of saveState, waiting 200ms after the last call.
 */
export const debouncedSaveState = debounce(saveState, 200);

/**
 * Remove any saved session state.
 */
export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Merge static defaults with saved state:
 * - Restores saved `used` flags on abilities.
 * - Restores saved initiative order.
 * - Restores saved currentTurnIndex.
 */
export function mergeState(defaultChars, defaultOrder, saved = {}) {
  saved = saved || {};

  const characters = JSON.parse(JSON.stringify(defaultChars));

  if (saved.characters) {
    for (const [id, savedChar] of Object.entries(saved.characters)) {
      if (
        characters[id] &&
        Array.isArray(savedChar.combatAbilities) &&
        Array.isArray(characters[id].combatAbilities)
      ) {
        characters[id].combatAbilities = characters[id].combatAbilities.map(
          (ability, idx) => ({
            ...ability,
            used:
              savedChar.combatAbilities[idx]?.used != null
                ? savedChar.combatAbilities[idx].used
                : ability.used,
          }),
        );
      }
    }
  }

  let initiativeOrder;
  if (Array.isArray(saved.initiativeOrder) && saved.initiativeOrder.length) {
    const filtered = saved.initiativeOrder.filter((id) =>
      defaultOrder.includes(id),
    );
    const missing = defaultOrder.filter((id) => !filtered.includes(id));
    initiativeOrder = [...filtered, ...missing];
  } else {
    initiativeOrder = [...defaultOrder];
  }

  const currentTurnIndex =
    typeof saved.currentTurnIndex === "number" ? saved.currentTurnIndex : 0;

  return { characters, initiativeOrder, currentTurnIndex };
}
