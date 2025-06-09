/* eslint-env jest */
/**
 * @jest-environment jsdom
 */
import { test, expect } from "@jest/globals";

import { mergeState } from "../utils/storage.js";
import {
  characters as staticChars,
  initiativeOrder as staticOrder,
} from "../data/characters.js";

test("mergeState with empty saved returns static defaults", () => {
  const result = mergeState(staticChars, staticOrder, {});
  expect(result.characters).toEqual(staticChars);
  expect(result.initiativeOrder).toEqual(staticOrder);
  expect(result.currentTurnIndex).toBe(0);
});

test("mergeState merges saved used-flags and turn index", () => {
  // simulate saved state where acid’s abilities have been used and turn index is 3
  const saved = {
    characters: {
      acid: {
        ...staticChars.acid,
        combatAbilities: staticChars.acid.combatAbilities.map((a) => ({
          ...a,
          used: true,
        })),
      },
    },
    initiativeOrder: ["cheoah", "acid", ...staticOrder.slice(2)],
    currentTurnIndex: 3,
  };

  const result = mergeState(staticChars, staticOrder, saved);
  // acid’s abilities should reflect the saved “used” flags
  expect(result.characters.acid.combatAbilities.every((a) => a.used)).toBe(
    true,
  );

  // initiativeOrder and currentTurnIndex should come from saved
  expect(result.initiativeOrder).toEqual(saved.initiativeOrder);
  expect(result.currentTurnIndex).toBe(3);
});
