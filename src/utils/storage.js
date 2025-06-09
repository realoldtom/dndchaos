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

    // 1) Version check: drop any data that doesn't match
    if (parsed.schemaVersion !== SCHEMA_VERSION) {
      console.warn(
        `Warning: schema version mismatch (found ${parsed.schemaVersion}, expected ${SCHEMA_VERSION}) – resetting state.`,
      );
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    // 2) Strip the version field before returning
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
 * @param {SavedState} [saved={}]       // NB: you may want to guard against `null` here!
 * @returns {{ characters: Record<string, Character>, initiativeOrder: string[], currentTurnIndex: number }}
 */
export function mergeState(defaultChars, defaultOrder, saved = {}) {
  // If loadState() returned null, saved will be null—guard that here:
  saved = saved || {};

  // 1) Deep-clone the default characters so we don't mutate them
  const characters = JSON.parse(JSON.stringify(defaultChars));

  // 2) Merge in just the `used` flags
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
