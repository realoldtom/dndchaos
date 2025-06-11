# Phase 1 Commit-by-Commit Roadmap (Core MVP Stability & Logic)

## Critical Foundation Fixes (Commits 1–3)

1. **fix(data): rename `class` to `className` & align `initiativeOrder` to IDs**  
   - In **`src/data/characters.js`**:  
     - Rename each character’s `class` property to `className`.  
     - Convert the existing `initiativeOrder` array of `{ char, initiative }` objects into a simple array of string IDs:
       ```js
       export const initiativeOrder = [
         "sparkleblast",
         "thorin",
         "luna",
         "pip",
         // …others
       ];
       ```  
   - In **`src/app.js`**: update all references to use `currentChar.className` and treat `state.initiativeOrder` entries as string IDs.  
   - Add test verifying turn cycling.

2. **feat(data): validate character definitions on app load**  
   - In `init()`, assert each character has `name`, `className`, `combatAbilities`.  
   - Ensure 2–4 abilities with non-empty `coach` text.  
   - Throw a descriptive error naming the offending character on failure.

3. **fix(storage): handle corrupted localStorage gracefully**  
   - Wrap `JSON.parse()` in `loadState()` with try/catch.  
   - On parse error, clear `localStorage` and return `null`.  
   - Log a warning when state is reset.

## Storage & State Management (Commits 4–7)

4. **feat(storage): embed schemaVersion in persisted state**  
   - Add `schemaVersion: "1.0"` in `saveState()`.  
   - In `loadState()`, clear state on version mismatch.

5. **feat(storage): debounce saveState() calls at 200 ms**  
   - Implement `debouncedSaveState()` wrapper.  
   - Replace direct `saveState()` calls with the debounced version.  
   - Ensure a final save on `beforeunload`.

6. **test(storage): add unit tests for mergeState() edge cases**  
   - Create `src/utils/storage.test.js`.  
   - Cover missing characters, extra data, mismatched abilities.  
   - Verify “used” flags are preserved after merge.

7. **feat(state): introduce simple event-driven state management**  
   - Add `StateStore` class in `src/utils/state.js` with `subscribe()`, `publish()`, `getState()`.  
   - Refactor code to emit state updates instead of calling `renderUI()` directly.

## UI Modularity & Accessibility (Commits 8–12)

8. **refactor(ui): split `renderUI()` into focused renderers**  
   - Extract pure helpers in `src/ui/`:  
     - `renderHeader(container, name, className)`  
     - `renderPreview(container, hp, ac, slots)`  
     - `renderActions(container, abilities, onUse)`  
     - `renderControls(container, { onNext, onSkip, onReset })`  
     - `renderInitiativeList(container, order, currentIndex, onReorder)`  
   - Update `renderUI(state)` to invoke those five helpers, passing in slices of state.

9. **feat(ui): keyboard navigation & ARIA improvements**  
   - Use **native** `<button>` elements for actions and controls.  
   - Wrap the header in:
     ```html
     <div aria-live="polite">…</div>
     ```
     so screen-readers announce turn changes.  
   - Add `onKeyDown` handlers for Enter/Space on cards (calls `onUse`).  
   - Ensure DOM tab order matches visual order.

10. **refactor(ui): drive rendering via `StateStore.subscribe`**  
    - In `init()`, subscribe once: on state change → call both `debouncedSaveState()` and `renderUI(state)`.  
    - Remove **all** direct calls to `renderUI()` from event handlers.  
    - Verify storage & UI still update exactly once per state change.

11. **feat(presentation): isolate emoji decoration into pure helpers**  
    - Revert any hard-coded emojis in `data/characters.js`.  
    - Create `getAbilityIcon(name)` and `getCharacterIcon(className)` in `src/ui/icons.js`.  
    - Unit-test these icon pickers for predictable emoji output.  
    - In `renderHeader()` and `renderActions()`, call these helpers to decorate the UI.

12. **feat(ui): add initiative-order reordering controls**  
    - In `renderInitiativeList()`, render ▲/▼ buttons next to each name.  
    - Hook ▲/▼ to a pure `reorderArray(arr, from, to)` helper (100% unit-tested).  
    - On click, call:
      ```js
      store.publish(s => ({ …s, initiativeOrder: newOrder }));
      ```
    - Subscriber persists via existing save hook.  
    - Add an integration test that clicks ▲ twice and asserts both the new DOM order and `store.getState()`.

## Documentation & Finalization (Commit 13)

13. **docs: update README & architecture notes for Phase 1**  
    - Document:  
      - `schemaVersion`, debounced saves, and corruption handling  
      - `StateStore` and subscriber-driven rendering  
      - New render helper APIs and signatures  
      - Icon-picker functions (emoji decoration)  
      - Initiative-order reordering UI  
    - Add “Running tests” section (`npm test -- --coverage`) and CI status badge.