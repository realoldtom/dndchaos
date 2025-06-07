#!/usr/bin/env node
const { execSync } = require('child_process');
const sha = execSync('git rev-parse --short HEAD').toString().trim();
const out = `archive/sessionmanager-${sha}.zip`;
console.log(`📦 Creating snapshot: ${out}`);
execSync(`git archive --format=zip --output=${out} HEAD`, { stdio: 'inherit' });
