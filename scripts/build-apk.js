const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const androidDir = path.join(projectRoot, 'android');
const outputDir = path.join(projectRoot, 'release-apk');

function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function runGradleBuild() {
  const gradleCmd = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
  const args = [
    'clean',
    'assembleRelease',
    '--no-build-cache',
    '--rerun-tasks'
  ];

  const result = spawnSync(gradleCmd, args, {
    cwd: androidDir,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

function findBuiltApk() {
  const releaseDir = path.join(androidDir, 'app', 'build', 'outputs', 'apk', 'release');
  if (!fs.existsSync(releaseDir)) {
    throw new Error('Khong tim thay thu muc APK release.');
  }

  const apkFiles = fs
    .readdirSync(releaseDir)
    .filter((name) => name.toLowerCase().endsWith('.apk'))
    .map((name) => path.join(releaseDir, name));

  if (apkFiles.length === 0) {
    throw new Error('Khong tim thay file APK sau khi build.');
  }

  apkFiles.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return apkFiles[0];
}

function copyWithTimestamp(sourceApk) {
  fs.mkdirSync(outputDir, { recursive: true });

  const stamp = formatTimestamp(new Date());
  const fileName = `BanDoc-${stamp}.apk`;
  const targetApk = path.join(outputDir, fileName);
  const latestApk = path.join(outputDir, 'BanDoc-latest.apk');

  fs.copyFileSync(sourceApk, targetApk);
  fs.copyFileSync(sourceApk, latestApk);

  console.log('\nBuild thanh cong:');
  console.log(`- Ban co timestamp: ${targetApk}`);
  console.log(`- Ban moi nhat:     ${latestApk}`);
}

try {
  console.log('Dang build APK release (clean + no cache)...');
  runGradleBuild();
  const sourceApk = findBuiltApk();
  copyWithTimestamp(sourceApk);
} catch (error) {
  console.error(`\nBuild that bai: ${error.message}`);
  process.exit(1);
}
