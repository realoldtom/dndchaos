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

---

## D001: Adopt Jest as test framework
- **Date:** 2025-06-08  
- **Context:** We needed a zero-config, batteries-included runner for unit tests, with built-in mocks/spies, JSDOM support, snapshots, coverage, and fast watch mode.  
- **Decision:** Use [Jest](https://jestjs.io/) as our primary test framework.  
- **Rationale:**  
  - Out-of-the-box support for assertions, mocks, coverage, and DOM.  
  - Huge ecosystem and widespread examples/tutorials.  
  - Minimal setup in a Node/browser-ish project.  
- **Status:** Accepted  

---

## D002: Defer remediation of `micromatch` ReDoS in dev-deps
- **Date:** 2025-06-08  
- **Context:** `npm audit` flagged a moderate-severity ReDoS issue in `micromatch`, pulled in by `lint-staged` (a devDependency).  
- **Decision:** Take **no action** for now and defer remediation until upstream fixes the vulnerability.  
- **Rationale:**  
  - It only affects devDependencies, so it won’t ship to production.  
  - Upstream `lint-staged` will bump `micromatch` in a future release.  
  - Avoids unnecessary churn or forcing breaking upgrades.  
- **Status:** Accepted  

---

## D003: Rename `class` → `className` in character data
- **Date:** 2025-06-08  
- **Context:** Using `class` conflicts with reserved words and doesn’t match usage in the app code.  
- **Decision:** Rename each character’s `class` property to `className`.  
- **Rationale:**  
  - Prevents JS reserved-word pitfalls.  
  - Aligns data shape with UI references (`currentChar.className`).  
- **Implementation snippet:**  
  ```diff
  // src/data/characters.js
  export const characters = {
    sparkleblast: {
      name: "✨ Sparkleblast",
  -   class: "Level 2 Elf Sorcerer",
  +   className: "Level 2 Elf Sorcerer",
      …
    },
    // …
  };
