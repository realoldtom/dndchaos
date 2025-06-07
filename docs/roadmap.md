4-Phase Roadmap
Phase 1: Foundation & DX

Initialize repo with npm init (or yarn init).

Lock Node version via an .nvmrc or engine field (>=16.x <19.x).

Install dev tooling: ESLint, Prettier, Husky, lint-staged, Jest (even if you won’t write tests today).

Scaffold directories: src/ (move your JS there), data/, utils/, docs/, tests/.

Phase 2: MVP Combat Core

Turn tracker UI (done).

Action coach stub (static buttons).

Client-only persistence (localStorage).

Basic styling classes (no inline styles).

Phase 3: Quality & Safety Nets

Pre-commit hooks: lint, type-check (if you add TS), run smoke test (simple DOM check).

Continuous Integration: GitHub Actions to run lint + tests on every PR.

Coverage reporting: enforce ≥80% on core modules.

Phase 4: Feature Expansion & Release

Dynamic action coach (explain rolls, integrate dice-roller).

Configurable character import (JSON upload).

Theming & responsive layout.

Publish to GitHub Pages or Netlify.

⚙️ Environment Setup
Node.js LTS (16.x or 18.x).

Install dev dependencies:

bash
Copy
Edit
npm install --save-dev eslint prettier husky lint-staged jest
VS Code Extensions (non-negotiable):

ESLint

Prettier – Code formatter

Jest Runner (future)

.nvmrc (or package.json engines):

Copy
Edit
16
🔨 Pre-commit Hooks
Enable Husky:

bash
Copy
Edit
npx husky install
npm pkg set scripts.prepare="husky install"
Create a pre-commit hook:

bash
Copy
Edit
npx husky add .husky/pre-commit "npx lint-staged"
Configure lint-staged in package.json:

jsonc
Copy
Edit
"lint-staged": {
  "src/**/*.js": [
    "eslint --fix",
    "prettier --write"
  ],
  "tests/**/*.js": [
    "jest --bail --findRelatedTests"
  ]
}
Commit hook ensures:

No lint errors

All files formatted

Related tests pass (if you add any)

🏗️ Other Initial Setup
ESLint Config (.eslintrc.json):

json
Copy
Edit
{
  "env": { "browser": true, "es2021": true },
  "extends": ["eslint:recommended"],
  "parserOptions": { "ecmaVersion": 12, "sourceType": "module" },
  "rules": { "no-inline-styles": "error" /* enforce CSS classes */ }
}
Prettier Config (.prettierrc):

json
Copy
Edit
{
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80
}
Jest Skeleton (jest.config.js):

js
Copy
Edit
module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests']
};
CI Pipeline: create .github/workflows/ci.yml that runs:

yaml
Copy
Edit
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: node-version: '16'
      - run: npm ci
      - run: npm test
      - run: npm run lint