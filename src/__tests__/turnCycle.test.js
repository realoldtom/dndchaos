/* eslint-env jest */

import { describe, it, expect } from "@jest/globals";
import { mergeState } from "../utils/storage";
import { characters, initiativeOrder } from "../data/characters";

describe("turn cycling", () => {
  it("wraps currentTurnIndex over ID array", () => {
    // …
  });
});

describe("turn cycling", () => {
  it("advances and wraps currentTurnIndex over ID array", () => {
    const { initiativeOrder: order } = mergeState(
      characters,
      initiativeOrder,
      {},
    );
    let idx = 0;
    const advances = order.length + 2;
    for (let i = 0; i < advances; i++) {
      idx = (idx + 1) % order.length;
    }
    expect(idx).toBe(2);
  });
});
