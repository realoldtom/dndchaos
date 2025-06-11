/* eslint-env jest */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */
import StateStore from "./state.js";

describe("StateStore", () => {
  it("initializes with the given state", () => {
    const store = new StateStore({ foo: 1 });
    expect(store.getState()).toEqual({ foo: 1 });
  });

  it("notifies subscribers on publish", () => {
    const store = new StateStore({ count: 0 });
    const cb = jest.fn();
    store.subscribe(cb);
    store.publish((s) => ({ count: s.count + 1 }));
    expect(cb).toHaveBeenCalledWith({ count: 1 });
  });

  it("returns an unsubscribe function", () => {
    const store = new StateStore({ x: 0 });
    const cb = jest.fn();
    const unsub = store.subscribe(cb);
    unsub();
    store.publish((s) => ({ x: s.x + 1 }));
    expect(cb).not.toHaveBeenCalled();
  });
});
