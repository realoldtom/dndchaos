// src/ui/renderers.js

/**
 * Renders the header showing whose turn it is.
 * @param {HTMLElement} container
 * @param {string} name
 * @param {string} className
 */
export function renderHeader(container, name, className) {
  const header = document.createElement("div");
  header.className = "turn-tracker";
  header.textContent = `🔮✨ It’s ${name} the ${className}’s Turn! ✨🔮`;
  container.appendChild(header);
}

/**
 * Renders the preview pane with HP, AC, and spell slots.
 * @param {HTMLElement} container
 * @param {string} hp
 * @param {string} ac
 * @param {string} slots
 */
export function renderPreview(container, hp, ac, slots) {
  const preview = document.createElement("div");
  preview.className = "up-next";
  preview.innerHTML = `
    <div>❤️ <strong>HP:</strong> ${hp}</div>
    <div>🛡️ <strong>AC:</strong> ${ac}</div>
    <div>✨ <strong>Slots:</strong> ${slots}</div>
  `;
  container.appendChild(preview);
}

/**
 * Renders the grid of ability cards.
 * @param {HTMLElement} container
 * @param {Array<{name:string, desc:string, coach:string, used:boolean}>} abilities
 * @param {(index: number) => void} onUse
 */
export function renderActions(container, abilities, onUse) {
  const grid = document.createElement("div");
  grid.className = "actions-grid";

  abilities.forEach((ability, idx) => {
    const card = document.createElement("button");
    card.className = "action-card";
    if (ability.used) {
      card.classList.add("used");
    }

    card.innerHTML = `
      <div class="ability-name">${ability.name}</div>
      <div class="ability-desc">${ability.desc}</div>
      <div class="coach-hint">${ability.coach}</div>
    `;

    card.addEventListener("click", () => {
      onUse(idx);
    });

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/**
 * Renders the DM controls: Next, Skip, Reset.
 * @param {HTMLElement} container
 * @param {{onNext: function, onSkip: function, onReset: function}} handlers
 */
export function renderControls(container, { onNext, onSkip, onReset }) {
  const controls = document.createElement("div");
  controls.className = "dm-controls";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next Turn";
  nextBtn.addEventListener("click", onNext);

  const skipBtn = document.createElement("button");
  skipBtn.textContent = "Skip Turn";
  skipBtn.addEventListener("click", onSkip);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset Combat";
  resetBtn.addEventListener("click", onReset);

  controls.append(nextBtn, skipBtn, resetBtn);
  container.appendChild(controls);
}

/**
 * Renders the mini initiative list.
 * @param {HTMLElement} container
 * @param {string[]} order
 * @param {number} currentIndex
 */
export function renderInitiativeList(container, order, currentIndex) {
  const list = document.createElement("div");
  list.className = "initiative-list";

  order.forEach((id, i) => {
    const span = document.createElement("span");
    span.textContent = id;
    if (i === currentIndex) {
      span.classList.add("current");
    }
    list.appendChild(span);
  });

  container.appendChild(list);
}
