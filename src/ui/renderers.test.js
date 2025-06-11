/* eslint-env jest */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */
import {
  renderHeader,
  renderPreview,
  renderActions,
  renderControls,
  renderInitiativeList,
} from "./renderers.js";

describe("renderHeader", () => {
  it("renders a .turn-tracker with correct text", () => {
    const container = document.createElement("div");
    renderHeader(container, "Fenthwick", "Level 1 Ranger");
    const header = container.querySelector(".turn-tracker");
    expect(header).not.toBeNull();
    expect(header.textContent).toContain("Fenthwick");
    expect(header.textContent).toContain("Level 1 Ranger");
  });
});

describe("renderPreview", () => {
  it("renders a .up-next with HP, AC, and Slots", () => {
    const container = document.createElement("div");
    renderPreview(container, "10/10", "16", "1/1");
    const preview = container.querySelector(".up-next");
    expect(preview).not.toBeNull();
    expect(preview.textContent).toContain("10/10");
    expect(preview.textContent).toContain("16");
    expect(preview.textContent).toContain("1/1");
  });
});

describe("renderActions", () => {
  it("renders .action-card buttons and calls callback on click", () => {
    const container = document.createElement("div");
    const abilities = [
      { name: "Slash", desc: "Slice", coach: "Aim well", used: false },
      { name: "Block", desc: "Raise shield", coach: "Brace", used: true },
    ];
    const onUse = jest.fn();
    renderActions(container, abilities, onUse);

    const cards = container.querySelectorAll(".action-card");
    expect(cards.length).toBe(2);

    // used flag applies the .used class
    expect(cards[1].classList.contains("used")).toBe(true);

    // clicking the first card calls onUse with its index
    cards[0].click();
    expect(onUse).toHaveBeenCalledWith(0);
  });
});

describe("renderControls", () => {
  it("renders Next/Skip/Reset buttons and wires up callbacks", () => {
    const container = document.createElement("div");
    const onNext = jest.fn();
    const onSkip = jest.fn();
    const onReset = jest.fn();

    renderControls(container, { onNext, onSkip, onReset });

    const buttons = container.querySelectorAll(".dm-controls button");
    expect(buttons.length).toBe(3);

    // Next Turn
    buttons[0].click();
    expect(onNext).toHaveBeenCalled();

    // Skip Turn
    buttons[1].click();
    expect(onSkip).toHaveBeenCalled();

    // Reset Combat
    buttons[2].click();
    expect(onReset).toHaveBeenCalled();
  });
});

describe("renderInitiativeList", () => {
  it("renders .initiative-list with correct count and highlights current", () => {
    const container = document.createElement("div");
    const order = ["a", "b", "c"];
    renderInitiativeList(container, order, 1);

    const list = container.querySelector(".initiative-list");
    expect(list).not.toBeNull();

    const items = list.querySelectorAll("span");
    expect(items.length).toBe(3);

    // Only one item should have .current
    expect(list.querySelectorAll(".current").length).toBe(1);
  });
});
