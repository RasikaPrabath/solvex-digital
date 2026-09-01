const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const videoPath = path.join(__dirname, '..', 'public', 'images', 'developer-coding.mp4');
const outputDir = path.join(__dirname, '..', 'public', 'images', 'sequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clean previous frames in outputDir
const oldFiles = fs.readdirSync(outputDir);
for (const file of oldFiles) {
  if (file.startsWith('frame_') && (file.endsWith('.webp') || file.endsWith('.jpg') || file.endsWith('.png'))) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

console.log('Extracting 60 consistent real developer frames from video using ffmpeg...');
console.log('Using ffmpeg binary:', ffmpegPath);

// Extract exactly 60 evenly spaced frames from the video as high-quality WebP
// -vf "fps=12,scale=1920:1080" or frames count filter
const args = [
  '-i', videoPath,
  '-vf', 'fps=60/5,scale=1920:1080', // 60 frames evenly distributed across the 5-sec video
  '-vframes', '60',
  '-c:v', 'libwebp',
  '-quality', '88',
  path.join(outputDir, 'frame_%03d.webp')
];

execFile(ffmpegPath, args, (error, stdout, stderr) => {
  if (error) {
    console.error('Error extracting frames:', error);
    process.exit(1);
  }
  const generated = fs.readdirSync(outputDir).filter(f => f.startsWith('frame_') && f.endsWith('.webp'));
  console.log(`SUCCESS! Extracted ${generated.length} consistent WebP video frames into ${outputDir}`);
});
