// src/utils/storage.js

const STORAGE_KEY = "dnd-chaos-manager-state";

/**
 * Load persisted session state from localStorage.
 * If the JSON is corrupted, clear it out and return null.
 * @returns {SavedState|null}
 */
export function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
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
 * @param {SavedState} state
 */
export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Remove any saved session state.
 */
export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Merge static defaults with saved state:
 * - Restores saved `used` flags on abilities.
 * - Restores saved initiative order (filtering out invalid IDs and appending any new ones).
 * - Restores saved currentTurnIndex.
 *
 * @param {Record<string, Character>} defaultChars
 * @param {string[]} defaultOrder
 * @param {SavedState} [saved={}]
 * @returns {{ characters: Record<string, Character>, initiativeOrder: string[], currentTurnIndex: number }}
 */
export function mergeState(defaultChars, defaultOrder, saved = {}) {
  // 1) Deep-clone the default characters so we don't mutate them
  const characters = JSON.parse(JSON.stringify(defaultChars));

  // 2) If there's saved data, merge in just the `used` flags
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

  // 3) Rebuild initiativeOrder:
  //    - Start with any valid IDs from saved.initiativeOrder
  //    - Append any missing IDs from the defaultOrder
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

  // 4) Restore turn index (or default to 0)
  const currentTurnIndex =
    typeof saved.currentTurnIndex === "number" ? saved.currentTurnIndex : 0;

  return { characters, initiativeOrder, currentTurnIndex };
}
