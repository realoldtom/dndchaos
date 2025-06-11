// src/utils/state.js
export default class StateStore {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }

  /** Returns the current state snapshot */
  getState() {
    return this.state;
  }

  /**
   * Subscribe to state changes.
   * @param {function(Object):void} listener — called with new state.
   * @returns {function():void} — unsubscribe function.
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // return an unsubscribe handle
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Update state via an updater function, then notify subscribers.
   * @param {function(Object):Object} updater — receives old state, returns new state.
   */
  publish(updater) {
    const next = updater(this.state);
    this.state = next;
    this.listeners.forEach((l) => l(this.state));
  }
}
