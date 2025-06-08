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

## UI Modularity & Accessibility (Commits 8–11)

8. **refactor(ui): split renderUI() into focused render functions**  
   - Extract `renderHeader()`, `renderActions()`, `renderNextUp()`, `renderControls()`.

9. **feat(ui): add keyboard navigation and ARIA support**  
   - Add `role="button"`, `tabindex="0"`, `aria-current="step"` to interactive elements.  
   - Handle Enter/Space on action cards.  
   - Ensure logical tab order through the grid.

10. **refactor(ui): wire rendering through StateStore events**  
    - Replace manual `renderUI()` calls with `state.publish('update')`.

11. **chore(data): standardize character data formatting**  
    - Normalize emoji usage in `name`.  
    - Prefix coach h
12. **feat(ui): enable initiative-order reordering in UI**  
    - Add drag-and-drop or up/down controls to the mini initiative list.  
    - On reorder, update `state.initiativeOrder` and persist via `saveState()`.  
    - Add unit tests and a simple e2e/test harness to verify reordering.

    ## Documentation & Finalization (Commit 13)

13. **docs: update README for Phase 1 changes**  
    - Document `schemaVersion`, debounced save, StateStore, error boundary, and new reorder feature.  
    - Add “Running tests” section (`npm test`) and CI badge.  
    - Update examples, file paths, and architecture notes.