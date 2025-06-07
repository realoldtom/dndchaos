# Phase 1 Commit-by-Commit Roadmap

Below is the ordered list of Conventional-Commit–style commits you’ll make to complete Phase 1 (Core MVP Stability & Logic). Each commit represents a small, self-contained change.

1. **feat(storage): embed `schemaVersion` in persisted state**  
   - Modify `saveState` and `loadState` in `utils/storage.js` to include and read a top-level `schemaVersion` field.  
   - Update existing tests (if any) to expect the new field.

2. **feat(storage): debounce `saveState()` calls at 200 ms**  
   - Wrap `saveState` calls in a debounced helper (e.g. using `setTimeout`) so rapid state changes don’t thrash `localStorage`.  
   - Ensure the API of `saveState()` is unchanged for callers.

3. **test(storage): add unit tests for `mergeState()` edge cases**  
   - Create a new test file (e.g. `src/utils/storage.test.js`).  
   - Cover scenarios: missing keys, extra keys, corrupted JSON, mismatched `schemaVersion`.  
   - Verify that `mergeState` preserves `used` flags and turn index correctly.

4. **feat(data): validate character definitions on load**  
   - In `data/characters.js` or during app init, assert each character has 2–4 abilities and non-empty `coach` text.  
   - Throw a descriptive error (or `console.error`) if validation fails.

5. **chore(data): standardize emoji usage in character names**  
   - Decide on including or stripping emojis (e.g. always prefix names with one emoji).  
   - Normalize all entries in `data/characters.js` to match that standard.

6. **refactor(ui): split `renderUI()` into `renderHeader()` & `renderActions()`**  
   - Extract the header-rendering portion (current player name/class) into `renderHeader(state)`.  
   - Extract the action-grid rendering into `renderActions(state)`.

7. **refactor(ui): extract `renderNextUp()` and `renderControls()`**  
   - Pull out the “Next Up” list into `renderNextUp(state)`.  
   - Pull out the DM controls (Next, Skip, Reset) into `renderControls(onClickHandlers)`.

8. **feat(ui): add ARIA roles, `tabindex`, and `aria-current`**  
   - On each `.action-card`, add `role="button"` and `tabindex="0"`.  
   - On the current-turn element, add `aria-current="step"`.  
   - Verify keyboard navigation works (Tab + Enter/Space).

9. **feat(state): introduce simple event-emitter for state changes**  
   - Create a lightweight `StateStore` in `src/utils/state.js` with `subscribe()`, `publish()`.  
   - Replace direct calls to `saveState`/`renderUI` in `app.js` with `store.publish('stateChanged')`.  
   - Wire `renderUI` as a listener to `stateChanged`.

10. **chore: add README note about new storage schema & tests**  
    - Update `README.md` under the “Running Tests” and “Storage Format” sections to document `schemaVersion`, debounced saves, and how to run the new tests (`npm test`).

---

**After Commit 10**, Phase 1 is complete. You’ll have a robust, test-covered storage layer, validated input data, and a modular, accessible UI driven by a simple state store. Ready to move on to Phase 2!  
