/* eslint-env jest */
/**
 * @jest-environment jsdom
 */
import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  jest,
} from "@jest/globals";
import { debouncedSaveState } from "../utils/storage.js";

const STORAGE_KEY = "dnd-chaos-manager-state";
const SCHEMA_VERSION = "1.0";

describe("debouncedSaveState", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.spyOn(Storage.prototype, "setItem");
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    localStorage.clear();
    Storage.prototype.setItem.mockClear();
  });

  test("does not write immediately", () => {
    debouncedSaveState({ foo: 1 });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test("writes exactly once after 200ms with the latest state and schemaVersion", () => {
    debouncedSaveState({ value: "first" });
    debouncedSaveState({ value: "second" });
    // not yet
    jest.advanceTimersByTime(199);
    expect(localStorage.setItem).not.toHaveBeenCalled();

    // at 200ms it should fire
    jest.advanceTimersByTime(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    const [key, json] = localStorage.setItem.mock.calls[0];
    expect(key).toBe(STORAGE_KEY);

    const parsed = JSON.parse(json);
    expect(parsed.value).toBe("second");
    expect(parsed.schemaVersion).toBe(SCHEMA_VERSION);
  });
});
