// babel.config.js
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        // target the current Node version so imports/exports work
        targets: { node: "current" }
      }
    ]
  ]
};
