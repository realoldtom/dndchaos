# Roadmap: Phase 1 → MVP

## Phase 1: Core Stability & Logic
- **State & Persistence**  
  - Embed `schemaVersion` in `localStorage`  
  - Debounce `saveState()` calls (200 ms)  
- **Data Integrity**  
  - Validate each character has 2–4 abilities and non-empty coach tips at load  
- **UI Modularity**  
  - Split `renderUI()` into:  
    - `renderHeader()`  
    - `renderActions()`  
    - `renderNextUp()`  
    - `renderControls()`  
- **Accessibility Foundation**  
  - Add `role="button"`, `tabindex="0"` to action cards  
  - Mark current turn with `aria-current="step"`  
- **Event-Driven State**  
  - Introduce a lightweight state store with `subscribe()`/`publish()`  
  - Drive UI renders and persistence via state events  

> **Phase 1 Milestone:**  
> Stable turn cycle, action display, coach hints, and reliable save/load.

---

## Phase 2: UX Polish & Performance
- **HTML Enhancements**  
  - Use `<script defer>` for JS  
  - Add `<noscript>` fallback warning  
  - Update `<meta name="description">` and include version in `<title>`  
- **CSS Refinements**  
  - Define color variables (`--primary`, `--used-bg`, etc.)  
  - Audit contrast on “used” cards; adjust borders if needed  
  - Add visible `:focus` outlines on interactive elements  
- **Responsive & Visual Tweaks**  
  - Fine-tune grid layouts and hover states  
  - Ensure legibility on desktop, mobile, and TV  

> **Phase 2 Milestone:**  
> UI is snappy, visually consistent, and accessible across devices.

---

## Phase 3: Testing & CI
- **Unit Tests**  
  - Cover `mergeState()`, storage edge cases, and render helpers  
- **Continuous Integration**  
  - GitHub Actions workflow runs ESLint, Prettier, and tests on push/PR  
- **Quality Gates**  
  - Update README badges once CI is passing  

> **Phase 3 Milestone:**  
> All changes auto-verified; no PR merges without passing checks.

---

## Phase 4: Documentation & Onboarding
- **README Improvements**  
  - Add screenshot, links to `docs/`, and badges for CI/version/license  
- **Core Docs in `docs/`**  
  - Finalize `architecture.md`, `user-guide.md`, `roadmap.md`  
- **PRD Refinements**  
  - Append stakeholder sign-off section, risks & mitigations, and rough timeline  

> **Phase 4 Milestone:**  
> Any new contributor can clone, build, and understand the MVP end-to-end.

---

## Phase 5: MVP Release
- **Versioning & Tagging**  
  - Bump package version (e.g. `v1.1.0`), tag, and push with `npm version`  
- **Changelog & Release Notes**  
  - Summarize Phase 1–4 deliverables in `CHANGELOG.md`  
- **Feedback Loop**  
  - Deploy for live play; gather DM/player feedback to inform next phases  

> **Phase 5 Milestone:**  
> Official MVP release ready for live sessions and feedback gathering.
