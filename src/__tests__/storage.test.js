/* eslint-env jest */
/**
 * @jest-environment jsdom
 */
import { loadState, saveState, clearState } from "../utils/storage.js";
import {
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
  jest,
} from "@jest/globals";

const KEY = "dnd-chaos-manager-state";
const GOOD_STATE = { foo: "bar", count: 42 };
const SCHEMA_VERSION = "1.0";

// Build the exact JSON string that saveState writes
function makePersisted(obj, version = SCHEMA_VERSION) {
  return JSON.stringify({ ...obj, schemaVersion: version });
}

describe("storage helpers", () => {
  beforeEach(() => {
    // Clear any existing data
    localStorage.clear();
    // Spy on the Storage prototype methods
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(Storage.prototype, "removeItem");
  });

  afterEach(() => {
    // Restore the original implementations
    jest.restoreAllMocks();
  });

  test("saveState writes the full state plus schemaVersion", () => {
    saveState(GOOD_STATE);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      KEY,
      makePersisted(GOOD_STATE),
    );
  });

  test("loadState returns null if nothing is stored", () => {
    expect(loadState()).toBeNull();
    expect(localStorage.removeItem).not.toHaveBeenCalled();
  });

  test("loadState parses and returns the saved state (without schemaVersion)", () => {
    localStorage.setItem(KEY, makePersisted(GOOD_STATE));
    expect(loadState()).toEqual(GOOD_STATE);
  });

  test("loadState clears and returns null on schemaVersion mismatch", () => {
    localStorage.setItem(KEY, makePersisted(GOOD_STATE, "0.9"));
    expect(loadState()).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith(KEY);
  });

  test("loadState clears and returns null on corrupted JSON", () => {
    localStorage.setItem(KEY, "{ not valid JSON ");
    expect(loadState()).toBeNull();
    expect(localStorage.removeItem).toHaveBeenCalledWith(KEY);
  });

  test("clearState always removes the stored key", () => {
    localStorage.setItem(KEY, "something");
    clearState();
    expect(localStorage.getItem(KEY)).toBeNull();
  });
});
