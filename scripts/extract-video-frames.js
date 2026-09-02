const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const videoPath = 'C:\\Users\\ASUS\\Downloads\\7989454-hd_1920_1080_25fps.mp4';
const outputDir = path.join(__dirname, '..', 'public', 'images', 'sequence');

console.log('Using ffmpeg at:', ffmpeg);
console.log('Video path:', videoPath);
console.log('Output dir:', outputDir);

if (!fs.existsSync(videoPath)) {
  console.error('Video file not found at:', videoPath);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Check video duration with ffmpeg
let totalSeconds = 17.48;
try {
  const infoOutput = execSync(`"${ffmpeg}" -i "${videoPath}" 2>&1`, { encoding: 'utf8' });
} catch (err) {
  const info = err.stdout || err.stderr || err.message || '';
  const durationMatch = info.match(/Duration: (\d+):(\d+):(\d+\.\d+)/);
  if (durationMatch) {
    const hours = parseFloat(durationMatch[1]);
    const minutes = parseFloat(durationMatch[2]);
    const seconds = parseFloat(durationMatch[3]);
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
  }
}
console.log(`Video duration: ${totalSeconds} seconds`);

const TARGET_FRAMES = 120;
console.log(`Target frames: ${TARGET_FRAMES}`);

// Calculate fps needed to yield exactly TARGET_FRAMES across totalSeconds
const targetFps = TARGET_FRAMES / totalSeconds;
console.log(`Target FPS: ${targetFps.toFixed(4)}`);

// Clear existing frames in outputDir
const existingFiles = fs.readdirSync(outputDir);
for (const file of existingFiles) {
  if (file.startsWith('frame_') && file.endsWith('.webp')) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}
console.log('Cleaned old sequence frames.');

// Extract using ffmpeg with libwebp
const tempPattern = path.join(outputDir, 'raw_%04d.webp');
const ffmpegCmd = `"${ffmpeg}" -i "${videoPath}" -vf "fps=${targetFps},scale=1920:-2" -c:v libwebp -quality 82 -vframes ${TARGET_FRAMES} "${tempPattern}" -y`;

console.log('Running ffmpeg extraction...');
execSync(ffmpegCmd, { stdio: 'inherit' });

// Rename raw_%04d.webp to frame_%03d.webp
const extractedFiles = fs.readdirSync(outputDir)
  .filter(f => f.startsWith('raw_') && f.endsWith('.webp'))
  .sort();

console.log(`Extracted ${extractedFiles.length} raw frames.`);

extractedFiles.forEach((file, index) => {
  const frameNumber = index + 1;
  const paddedIndex = String(frameNumber).padStart(3, '0');
  const targetName = `frame_${paddedIndex}.webp`;
  fs.renameSync(path.join(outputDir, file), path.join(outputDir, targetName));
});

console.log(`Successfully renamed ${extractedFiles.length} frames to frame_001.webp - frame_${String(extractedFiles.length).padStart(3, '0')}.webp!`);

