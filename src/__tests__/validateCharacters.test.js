/* eslint-env jest */
/**
 * @jest-environment jsdom
 */
import { validateCharacters } from "../app.js";
import { test, expect } from "@jest/globals";

const goodChars = {
  foo: {
    name: "Foo",
    className: "Level 1 Test",
    combatAbilities: [
      { name: "Strike", desc: "A quick hit", coach: "Aim for weak spots" },
      {
        name: "Dodge",
        desc: "Avoid an attack",
        coach: "Watch their sword arm",
      },
    ],
  },
};

const badChars = {
  bar: {
    name: "Bar",
    className: "Level 1 Test",
    combatAbilities: [
      { name: "Punch", desc: "A straight punch", coach: "" },
      { name: "Kick", desc: "A strong kick", coach: "Aim low" },
    ],
  },
};

test("passes when all characters are well-formed", () => {
  expect(() => validateCharacters(goodChars)).not.toThrow();
});

test("throws if a combatAbility coach is empty", () => {
  expect(() => validateCharacters(badChars)).toThrow(
    /Invalid character definition: bar – ability\[0\]\.coach must be non-empty/,
  );
});
