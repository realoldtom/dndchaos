# Decision Log

A chronologically ordered list of major project decisions.

| ID    | Date       | Decision                                                                      | Status     |
|-------|------------|-------------------------------------------------------------------------------|------------|
| D001  | 2025-06-08 | Adopt **Jest** as our JavaScript test framework                                | Accepted   |
| D002  | 2025-06-08 | Defer remediation of `micromatch` ReDoS in dev-deps (do nothing for now)       | Accepted   |
| D003  | 2025-06-08 | Rename character property `class` → `className`                                 | Accepted   |
| D004  | 2025-06-08 | Change `initiativeOrder` from array of `{char, initiative}` objects → array of string IDs | Accepted   |
| D005  | 2025-06-08 | Persist a top-level `schemaVersion` in saved state (for future migrations)      | Proposed   |
| D006  | 2025-06-08 | Require a unit test verifying turn-cycle wrap logic over the ID array           | Proposed   |
| D007  | 2025-06-08 | Update CI lint & format scripts to target `src/**/*.js`                         | Accepted   |

---

## D001: Adopt Jest as test framework
- **Date:** 2025-06-08  
- **Context:** We needed a zero-config, batteries-in-cluded runner for unit tests, with built-in mocks, JSDOM support, snapshots, coverage, and fast watch mode.  
- **Decision:** Use [Jest](https://jestjs.io/) as our primary test framework.  
- **Rationale:**  
  - Out-of-the-box support for assertions, mocks, coverage, and DOM.  
  - Huge ecosystem and widespread examples/tutorials.  
  - Minimal setup in a Node/browser-ish project.  
- **Status:** Complete  

---

## D002: Defer remediation of `micromatch` ReDoS in dev-deps
- **Date:** 2025-06-08  
- **Context:** `npm audit` flagged a moderate-severity ReDoS issue in `micromatch`, pulled in by `lint-staged` (a devDependency).  
- **Decision:** Take **no action** for now and defer remediation until upstream fixes the vulnerability.  
- **Rationale:**  
  - Only affects devDependencies; won’t ship to production.  
  - Upstream `lint-staged` will bump `micromatch` in a future release.  
  - Avoids unnecessary churn or breaking upgrades.  
- **Status:** Complete  

---

## D003: Rename `class` → `className` in character data
- **Date:** 2025-06-08  
- **Context:** Using `class` conflicts with JS reserved words and doesn’t match usage in code.  
- **Decision:** Rename each character’s `class` property to `className`.  
- **Rationale:**  
  - Prevents reserved-word pitfalls.  
  - Aligns data shape with UI references (`currentChar.className`).  
- **Status:** Complete  

---

## D004: Change `initiativeOrder` to array of string IDs
- **Date:** 2025-06-08  
- **Context:** Original shape was an array of `{ char, initiative }` objects; we only need turn order, not the numeric initiative beyond setup.  
- **Decision:** Simplify to an array of character ID strings.  
- **Rationale:**  
  - Reduces JSON size and parsing complexity.  
  - Makes wrap-around logic straightforward (index arithmetic).  
  - Initiative numeric values no longer needed at runtime.  
- **Status:** Complete  

---

## D005: Persist top-level `schemaVersion` in saved state
- **Date:** 2025-06-08  
- **Context:** We anticipate evolving the saved state format in future releases.  
- **Decision:** Add a `schemaVersion` field at the top of the serialized state.  
- **Rationale:**  
  - Enables future migrations if the shape changes.  
  - Provides clear upgrade path for backward-compatibility.  
- **Status:** Proposed  

---

## D006: Require unit test for turn-cycle wrap logic
- **Date:** 2025-06-08  
- **Context:** Off-by-one errors in cycling through `initiativeOrder` could cause stuck turns.  
- **Decision:** Mandate a Jest unit test that covers wrap-around behavior (last index → first index).  
- **Rationale:**  
  - Catches edge cases in turn progression.  
  - Ensures robust turn-cycle behavior as schema evolves.  
- **Status:** Proposed  

---

## D007: Update CI lint & format scripts to target `src/**/*.js`
- **Date:** 2025-06-08  
- **Context:** CI was failing because our `lint` and `format:check` scripts pointed at a non-existent `app.js`.  
- **Decision:** Amend `package.json` scripts:  
  ```json
  "lint": "eslint \"src/**/*.js\"",
  "format:check": "prettier --check \"src/**/*.js\""
