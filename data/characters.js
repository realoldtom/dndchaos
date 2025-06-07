/* exported characters initiativeOrder */

// data/characters.js
// Manually curated characters and initiative order for the MVP.
// Each character is Level 2 (per PRD).

export const characters = {
  sparkleblast: {
    name: "✨ Sparkleblast",
    class: "Level 2 Elf Sorcerer",
    hp: "8 / 14",
    ac: "12",
    spellSlots: "1 / 2",
    combatAbilities: [
      {
        name: "Magic Missile",
        desc: "3 darts of force (1d4+1 each), auto-hit",
        coach: "Always hits—great when you can’t risk missing.",
        used: false
      },
      {
        name: "Shield",
        desc: "+5 AC until your next turn",
        coach: "Use when you expect to be hit this round.",
        used: false
      },
      {
        name: "Scorching Ray",
        desc: "3 rays of fire (2d6 each), +5 to hit, 120 ft",
        coach: "Good against multiple foes or focusing on one target.",
        used: false
      },
      {
        name: "Dagger Attack",
        desc: "+3 to hit, 1d4+1 damage, range 20/60 ft",
        coach: "Fallback if you run out of spell slots.",
        used: false
      }
    ]
    // We’re only doing a Combat MVP—omit social/exploration arrays.
  },

  thorin: {
    name: "🪓 Thorin",
    class: "Level 2 Dwarf Barbarian",
    hp: "18 / 20",
    ac: "14",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Greataxe Attack",
        desc: "+5 to hit, 1d12+3 damage",
        coach: "Your bread-and-butter—high damage up close.",
        used: false
      },
      {
        name: "Rage",
        desc: "+2 damage, resistance to physical damage (1/2 uses)",
        coach: "Use early in tough fights; resets on long rest.",
        used: false
      },
      {
        name: "Handaxe Throw",
        desc: "+5 to hit, 1d6+3 damage, range 20/60 ft",
        coach: "Keep enemies at bay—great if melee is dangerous.",
        used: false
      },
      {
        name: "Reckless Attack",
        desc: "Advantage on melee attacks, but enemies have advantage against you",
        coach: "Risky, but helps guarantee hits—use when you need a big strike.",
        used: false
      }
    ]
  },

  luna: {
    name: "🏹 Luna",
    class: "Level 2 Elf Ranger",
    hp: "14 / 16",
    ac: "15",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Longbow Attack",
        desc: "+6 to hit, 1d8+3 damage, range 150/600 ft",
        coach: "High accuracy at range—stay back and shoot targets of opportunity.",
        used: false
      },
      {
        name: "Shortsword Attack",
        desc: "+5 to hit, 1d6+3 damage",
        coach: "Better up close; use if melee is safe.",
        used: false
      },
      {
        name: "Hunter's Mark",
        desc: "Bonus 1d6 damage on attacks (coming at Level 2)",
        coach: "Marks an enemy—gain extra damage every time you hit them.",
        used: false
      },
      {
        name: "Two-Weapon Fighting",
        desc: "Attack with your off-hand if wielding two weapons",
        coach: "Allows you to deal extra damage with a second attack.",
        used: false
      }
    ]
  },

  pip: {
    name: "🗡️ Pip",
    class: "Level 2 Halfling Rogue",
    hp: "12 / 14",
    ac: "13",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Shortsword Attack",
        desc: "+5 to hit, 1d6+3 damage",
        coach: "Solid melee damage—use when you can flank or have advantage.",
        used: false
      },
      {
        name: "Sneak Attack",
        desc: "Extra 1d6 damage if attacking with advantage",
        coach: "Only triggers once per turn; wait until you have advantage!",
        used: false
      },
      {
        name: "Shortbow Attack",
        desc: "+5 to hit, 1d6+3 damage, range 80/320 ft",
        coach: "Shoot from behind cover to trigger Sneak Attack.",
        used: false
      },
      {
        name: "Cunning Action",
        desc: "Dash, Disengage, or Hide as a bonus action",
        coach: "Allows extra mobility—escape or reposition each turn.",
        used: false
      }
    ]
  }
  // You can stub out additional 8 characters as needed for a full 12-player test.
};

export const initiativeOrder = [
  { char: "sparkleblast", initiative: 18 },
  { char: "thorin", initiative: 15 },
  { char: "luna", initiative: 12 },
  { char: "pip", initiative: 8 }
  // Add the other 8 placeholders if you want to fully simulate a 12-player round,
  // e.g. { char: "dummy1", initiative: 10 }, etc.
];
