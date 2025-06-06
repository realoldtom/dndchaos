// app.js
// ====================
// Main application logic to wire up the Chaos Manager MVP

// Global state variables (will be overwritten by mergeState on init)
let state = {
  characters: {},         // Populated after mergeState
  initiativeOrder: [],    // Populated after mergeState
  currentTurnIndex: 0
};

// Grab references to DOM
const appRoot = document.getElementById('app-root');

function init() {
  // 1. Merge saved state (if any) with fresh data
  const saved = loadState();
  const merged = mergeState(characters, initiativeOrder, saved);
  state.characters = merged.characters;
  state.initiativeOrder = merged.initiativeOrder;
  state.currentTurnIndex = merged.currentTurnIndex;

  // 2. Render initial UI
  renderUI();

  // 3. Save state on unload (just in case)
  window.addEventListener('beforeunload', () => {
    saveState({
      characters: state.characters,
      initiativeOrder: state.initiativeOrder,
      currentTurnIndex: state.currentTurnIndex
    });
  });
}

function renderUI() {
  // Clear previous content
  appRoot.innerHTML = '';

  // 1. Turn Tracker Header
  const currentCharKey = state.initiativeOrder[state.currentTurnIndex].char;
  const currentChar = state.characters[currentCharKey];
  const header = document.createElement('div');
  header.className = 'turn-tracker';
  header.textContent = `🔮 It’s ${currentChar.name}’s Turn! (${currentChar.class})`;
  appRoot.appendChild(header);

  // 2. Action Grid
  const actionGrid = document.createElement('div');
  actionGrid.className = 'actions-grid';

  currentChar.combatAbilities.forEach((ability, idx) => {
    const card = document.createElement('div');
    card.className = 'action-card';
    if (ability.used) card.classList.add('used');

    // Ability Name
    const nameEl = document.createElement('div');
    nameEl.textContent = ability.name;
    nameEl.style.fontWeight = 'bold';
    card.appendChild(nameEl);

    // Ability Desc
    const descEl = document.createElement('div');
    descEl.textContent = ability.desc;
    card.appendChild(descEl);

    // Coach Hint
    const coachEl = document.createElement('div');
    coachEl.className = 'coach-hint';
    coachEl.textContent = `💡 ${ability.coach}`;
    card.appendChild(coachEl);

    // Click handler: select/toggle usage
    card.addEventListener('click', () => {
      if (!ability.used) {
        ability.used = true;
        card.classList.add('used');
        // Save after marking used
        saveCurrentState();
      }
    });

    actionGrid.appendChild(card);
  });

  appRoot.appendChild(actionGrid);

  // 3. "Up Next" Preview
  const preview = document.createElement('div');
  preview.className = 'up-next';

  // Build a "Next Up: A → B → C" string
  const nextThree = [];
  for (let i = 1; i <= 3; i++) {
    const idx = (state.currentTurnIndex + i) % state.initiativeOrder.length;
    nextThree.push(state.characters[state.initiativeOrder[idx].char].name);
  }
  preview.textContent = `Up Next: ${nextThree.join(' → ')}`;
  appRoot.appendChild(preview);

  // 4. DM Controls Bar
  const controls = document.createElement('div');
  controls.className = 'dm-controls';

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '⏭️ Next Turn';
  nextBtn.addEventListener('click', nextTurn);
  controls.appendChild(nextBtn);

  const skipBtn = document.createElement('button');
  skipBtn.textContent = '⏭️ Skip Player';
  skipBtn.addEventListener('click', skipTurn);
  controls.appendChild(skipBtn);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = '🔄 Reset Combat';
  resetBtn.addEventListener('click', resetCombat);
  controls.appendChild(resetBtn);

  appRoot.appendChild(controls);

  // 5. Initiative Mini-List (for DM reference)
  const miniList = document.createElement('div');
  miniList.className = 'initiative-list';

  miniList.textContent = 'Initiative Order: ' 
    + state.initiativeOrder
        .map((item, idx) => {
          const name = state.characters[item.char].name.replace(/[^a-zA-Z ]/g, '');
          return idx === state.currentTurnIndex
            ? `${name} (CURRENT)`
            : name;
        })
        .join(' → ');
  appRoot.appendChild(miniList);
}

function nextTurn() {
  state.currentTurnIndex = (state.currentTurnIndex + 1) % state.initiativeOrder.length;
  saveCurrentState();
  renderUI();
}

function skipTurn() {
  // Logically same as nextTurn, but you could mark "skipped" if desired
  nextTurn();
}

function resetCombat() {
  if (confirm('Reset combat? This will clear used abilities and restart initiative.')) {
    // Clear all 'used' flags
    for (const key in state.characters) {
      state.characters[key].combatAbilities.forEach(a => a.used = false);
    }
    state.currentTurnIndex = 0;
    clearState();  // removes saved localStorage
    renderUI();
  }
}

function saveCurrentState() {
  saveState({
    characters: state.characters,
    initiativeOrder: state.initiativeOrder,
    currentTurnIndex: state.currentTurnIndex
  });
}

// Kick off the app
window.addEventListener('DOMContentLoaded', init);
