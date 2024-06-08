import os from 'os';
const { execSync } = require('child_process');

const platform = os.platform();

if (platform === 'linux') {
  try {
    execSync('npm install @rollup/rollup-linux-x64-gnu', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error installing @rollup/rollup-linux-x64-gnu:', error);
  }
} else {
  console.log(`Skipping @rollup/rollup-linux-x64-gnu installation on ${platform} platform.`);
}
