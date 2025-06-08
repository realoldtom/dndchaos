export const characters = {
  acid: {
    name: "Acid",
    className: "Level 1 Tabaxi Rogue",
    hp: "9 / 9",
    ac: "14",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Shortsword",
        desc: "+5 to hit, 1d6+3 piercing",
        coach: "Use this in melee when you’re right next to an enemy.",
        used: false,
      },
      {
        name: "Crossbow",
        desc: "+5 to hit, 1d8+3 piercing, range 80/320 ft",
        coach: "Stay back and pick off enemies from a distance.",
        used: false,
      },
      {
        name: "Claws",
        desc: "+5 to hit, 1d4+3 slashing",
        coach:
          "After you move, swipe with your claws for a quick extra attack.",
        used: false,
      },
      {
        name: "Dagger",
        desc: "+5 to hit, 1d4+3 piercing, finesse, light",
        coach: "Light and versatile—good for close combat or throwing.",
        used: false,
      },
    ],
  },

  cheoah: {
    name: "Cheoah Burpmiester",
    className: "Level 1 Gnome Sorcerer",
    hp: "16 / 16",
    ac: "14",
    spellSlots: "0 / 2",
    combatAbilities: [
      {
        name: "Dagger",
        desc: "+3 to hit, 1d4+1 piercing",
        coach: "Fallback melee attack if you’re out of spell slots.",
        used: false,
      },
      {
        name: "Fire Bolt",
        desc: "+5 to hit, 1d10 fire",
        coach: "Your reliable ranged cantrip—use on single targets.",
        used: false,
      },
      {
        name: "Shocking Grasp",
        desc: "+5 to hit, 1d8 lightning, prevents reactions",
        coach:
          "Great up close and stops enemies from making opportunity attacks.",
        used: false,
      },
    ],
  },

  ember: {
    name: "Ember",
    className: "",
    hp: "10 / 10",
    ac: "18",
    spellSlots: "0 / 2",
    combatAbilities: [
      {
        name: "Sickle",
        desc: "+3 to hit, 1d4+1 slashing",
        coach: "Simple melee weapon—use when you want to play it safe.",
        used: false,
      },
      {
        name: "Handaxe",
        desc: "+5 to hit, 1d6+3 slashing, range 20/60 ft",
        coach:
          "Can be thrown or used in melee—versatile when you need options.",
        used: false,
      },
      {
        name: "Scimitar",
        desc: "+5 to hit, 1d6+3 slashing, finesse",
        coach: "Deals more damage—use when you want a solid hit.",
        used: false,
      },
      {
        name: "Breath Weapon",
        desc: "15-ft line, 2d6 lightning (recharge 5–6)",
        coach: "Area attack—best when enemies bunch up before you.",
        used: false,
      },
      {
        name: "Dagger of Venom",
        desc: "+5 to hit, 1d4+3 piercing plus poison",
        coach: "Poison on hit for extra damage—use it early in combat.",
        used: false,
      },
      {
        name: "Ray of Frost",
        desc: "+5 to hit, 1d8 cold, slows target",
        coach: "Cantrip that also slows your foe’s movement.",
        used: false,
      },
    ],
  },

  graicro: {
    name: "Graicro",
    className: "Level 1 Human Monk",
    hp: "9 / 9",
    ac: "14",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Shortsword",
        desc: "+5 to hit, 1d6+2 piercing",
        coach: "Use for a safe, reliable melee attack.",
        used: false,
      },
      {
        name: "Dart",
        desc: "+5 to hit, 1d4+2 piercing, range 20/60 ft",
        coach: "Great when you can’t reach an enemy in melee.",
        used: false,
      },
      {
        name: "Unarmed Strike",
        desc: "+3 to hit, 1d4+1 bludgeoning",
        coach: "Your monk’s bread-and-butter—use every turn for bonus damage.",
        used: false,
      },
    ],
  },

  ishbosheth: {
    name: "Ish-Bosheth",
    className: "Level 1 Tiefling Sorcerer",
    hp: "9 / 9",
    ac: "10",
    spellSlots: "0 / 2",
    combatAbilities: [
      {
        name: "Dagger",
        desc: "+3 to hit, 1d4+1 piercing",
        coach: "Fallback if you need a melee option.",
        used: false,
      },
      {
        name: "Ray of Frost",
        desc: "+5 to hit, 1d8 cold, slows target",
        coach: "Slows enemies—good for hit-and-run tactics.",
        used: false,
      },
      {
        name: "Magic Missile",
        desc: "3 darts of force (1d4+1 each), auto-hit",
        coach: "Always hits—use when you absolutely can’t miss.",
        used: false,
      },
    ],
  },

  ivey: {
    name: "Ivey",
    className: "Level 1 Half-Elf Ranger",
    hp: "11 / 11",
    ac: "16",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Shortsword (x2)",
        desc: "Two attacks: +6 to hit, 1d6+3 piercing",
        coach: "Dual-wielding gives you two attacks—use when you’re in melee.",
        used: false,
      },
      {
        name: "Longbow",
        desc: "+6 to hit, 1d8+3 piercing, range 150/600 ft",
        coach: "High damage from afar—stay behind your allies.",
        used: false,
      },
    ],
  },

  nimloth: {
    name: "Nimloth",
    className: "Level 1 Elf Druid",
    hp: "10 / 10",
    ac: "15",
    spellSlots: "0 / 2",
    combatAbilities: [
      {
        name: "Shortsword",
        desc: "+5 to hit, 1d6+3 piercing",
        coach: "Close-range option if you can’t cast this turn.",
        used: false,
      },
      {
        name: "Thorn Whip",
        desc: "+4 to hit, 1d6 piercing, pulls target",
        coach: "Pull enemies toward you to control the battlefield.",
        used: false,
      },
      {
        name: "Chill Touch",
        desc: "Ranged spell attack +5 to hit, 1d8 necrotic, prevents healing",
        coach:
          "Cantrip that prevents healing—use on foes you expect to recover.",
        used: false,
      },
    ],
  },

  nobstobber: {
    name: "Nobstobber",
    className: "Level 1 Tiefling Warlock",
    hp: "9 / 9",
    ac: "11",
    spellSlots: "0 / 2",
    combatAbilities: [
      {
        name: "Eldritch Blast",
        desc: "Ranged spell attack +5 to hit, 1d10 force",
        coach: "Your best damage cantrip—fire it every turn at range.",
        used: false,
      },
      {
        name: "Crossbow",
        desc: "+5 to hit, 1d8 piercing, range 80/320 ft",
        coach: "Fallback ranged weapon when you’re out of spell slots.",
        used: false,
      },
      {
        name: "Sickle",
        desc: "+3 to hit, 1d4+1 slashing",
        coach: "Simple melee choice if enemies get too close.",
        used: false,
      },
      {
        name: "Dagger (x2)",
        desc: "Two attacks: +3 to hit, 1d4+1 piercing, finesse, light",
        coach: "Dual-wield daggers for extra attacks in melee.",
        used: false,
      },
    ],
  },

  pearl: {
    name: "Pearl Highhaven",
    className: "Level 1 Dragonborn Ranger",
    hp: "9 / 9",
    ac: "16",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Shortsword",
        desc: "+5 to hit, 1d6+3 piercing",
        coach: "Melee attack when foes close the distance.",
        used: false,
      },
      {
        name: "Longbow",
        desc: "+6 to hit, 1d8+3 piercing, range 150/600 ft",
        coach: "Stay back and rain arrows down on your enemies.",
        used: false,
      },
      {
        name: "Lightning Breath",
        desc: "15-ft line, 2d6 lightning (recharge 5–6)",
        coach: "Area-of-effect—great for hitting multiple enemies at once.",
        used: false,
      },
    ],
  },

  sennafef: {
    name: "Sennafef",
    className: "Level 1 Tiefling Bard",
    hp: "10 / 10",
    ac: "13",
    spellSlots: "0 / 2",
    combatAbilities: [
      {
        name: "Rapier / Shortsword",
        desc: "Rapier +5 to hit, 1d8+3 piercing; Shortsword +5 to hit, 1d6+3 piercing",
        coach: "Rapier hits harder, shortsword is light—pick based on need.",
        used: false,
      },
      {
        name: "Dagger",
        desc: "+5 to hit, 1d4+3 piercing, finesse, light",
        coach: "Throw or stab—use when you need agility.",
        used: false,
      },
      {
        name: "Vicious Mockery",
        desc: "Cantrip: foes make a Wisdom save or take 1d4 psychic damage",
        coach: "Distracts enemies and deals psychic damage—use on tough foes.",
        used: false,
      },
      {
        name: "Bardic Inspiration",
        desc: "Grant an ally a bonus d6 to one roll (once per rest)",
        coach: "Bonus die for an ally—use right before they roll.",
        used: false,
      },
    ],
  },

  taj: {
    name: "Taj",
    className: "Level 1 Elf Fighter",
    hp: "12 / 12",
    ac: "14",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Greatsword",
        desc: "+5 to hit, 2d6+3 slashing",
        coach:
          "Two-handed for big melee damage—use when you need a heavy strike.",
        used: false,
      },
      {
        name: "Longbow",
        desc: "+6 to hit, 1d8+3 piercing, range 150/600 ft",
        coach: "Safe ranged option outdoors—keep your distance.",
        used: false,
      },
      {
        name: "Second Wind",
        desc: "Heal 1d10+1 HP once per rest",
        coach:
          "Heal a bit of HP—use when you’re low and need to stay in the fight.",
        used: false,
      },
    ],
  },

  twilight: {
    name: "Twilight",
    className: "Level 1 Tabaxi Rogue",
    hp: "10 / 10",
    ac: "14",
    spellSlots: "0 / 0",
    combatAbilities: [
      {
        name: "Shortsword",
        desc: "+5 to hit, 1d6+3 piercing",
        coach: "Heavy one-handed attack—use when you need a reliable strike.",
        used: false,
      },
      {
        name: "Rapier",
        desc: "+5 to hit, 1d8+3 piercing",
        coach: "Deals more damage—best when you have advantage.",
        used: false,
      },
      {
        name: "Crossbow",
        desc: "+5 to hit, 1d8+3 piercing, range 80/320 ft",
        coach: "Ranged attack—stay back and pick off stragglers.",
        used: false,
      },
      {
        name: "Bitey (Claws)",
        desc: "+5 to hit, 1d4+3 slashing",
        coach: "Bonus claw attack after moving—great for extra damage.",
        used: false,
      },
      {
        name: "Dagger",
        desc: "+5 to hit, 1d4+3 piercing, finesse, light",
        coach: "Light and versatile—perfect for stealthy attacks from shadows.",
        used: false,
      },
    ],
  },
};

export const initiativeOrder = [
  "acid",
  "cheoah",
  "ember",
  "graicro",
  "ishbosheth",
  "ivey",
  "nimloth",
  "nobstobber",
  "pearl",
  "sennafef",
  "taj",
  "twilight",
];
