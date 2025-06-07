# Development Workflow for D&D Chaos Manager

This document outlines the step-by-step development workflow using Git and GitHub.

## 1. Clone & Bootstrap
```bash
git clone git@github.com:<you>/dnd-chaos-manager.git
cd dnd-chaos-manager
npm ci
npx husky install
```

## 2. Keep `main` Up to Date
```bash
git checkout main
git pull origin main
```

## 3. Create a New Feature/Fix/Chore Branch
```bash
git checkout -b feature/short-description
```

## 4. Develop & Commit Frequently
1. Make changes in your editor.  
2. Stage changes:
   ```bash
   git add file1 file2
   ```
3. Run pre-commit checks:
   ```bash
   npm run lint
   npm run format:check
   npm test
   ```
4. Commit with Conventional Commits:
   ```bash
   git commit -m "type(scope): summary of changes"
   ```

## 5. Keep Your Branch in Sync
```bash
git fetch origin
git rebase origin/main
# or if you prefer merge:
git merge origin/main
```

## 6. Push & Open Pull Request
```bash
git push --set-upstream origin feature/short-description
gh pr create \
  --base main \
  --head feature/short-description \
  --title "feat(scope): concise title" \
  --body "What problem this solves, how to test, screenshots/GIFs"
```

## 7. CI, Review & Address Feedback
CI (GitHub Actions) runs lint, format checks, and tests.

Fix any failures:
```bash
npm run lint
npm run format:check
npm test
git add .
git commit --amend --no-edit
git push --force-with-lease
```

## 8. Merge & Clean Up
```bash
# On GitHub: Squash and merge the PR, then:
git checkout main
git pull origin main
git branch -d feature/short-description
```
*Edit the final commit message to:*
```text
feat(scope): concise summary
```

## 9. Release (Versioning & Tagging)
```bash
npm version patch    # or minor/major
git push origin main --follow-tags
```
*(Optional: update CHANGELOG.md and commit)*

## 10. Hotfixes
```bash
git checkout main
git pull origin main
git checkout -b hotfix/issue-123
# apply fix…
git add .
git commit -m "fix(scope): handle edge-case"
git push --set-upstream origin hotfix/issue-123
gh pr create --base main --head hotfix/issue-123 --fill
# After merge:
npm version patch
git push origin main --follow-tags
```

---

## Quick Reference

| Stage                   | Command                                 |
|-------------------------|-----------------------------------------|
| Sync main               | `git checkout main && git pull`         |
| New branch              | `git checkout -b feature/...`           |
| Commit                  | `git commit -m "type(scope): summary"`  |
| Rebase                  | `git fetch && git rebase origin/main`   |
| Push & PR               | `git push -u origin <branch>` + `gh pr create` |
| Merge & cleanup         | Squash and Merge + `git branch -d <branch>` |
| Release bump & tag      | `npm version [patch|minor|major]`       |
