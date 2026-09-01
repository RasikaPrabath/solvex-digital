const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\10f5fae5-fdd2-4414-a2b7-5146997d19a0';
const outputDir = path.join(__dirname, '..', 'public', 'images', 'sequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Find generated developer coding keyframes
const files = fs.readdirSync(artifactDir);
const img1 = path.join(artifactDir, files.filter(f => f.startsWith('dev_coding_step1')).pop());
const img2 = path.join(artifactDir, files.filter(f => f.startsWith('dev_coding_step2')).pop());
const img3 = path.join(artifactDir, files.filter(f => f.startsWith('dev_coding_step3')).pop());
const img4 = path.join(artifactDir, files.filter(f => f.startsWith('dev_coding_step4')).pop());

const keyframes = [img1, img2, img3, img4];

console.log('Using keyframes:', keyframes);

async function generateDeveloperSequence() {
  console.log('Generating 75 Full-HD 16:9 Developer Coding Sequence frames...');

  const TOTAL_FRAMES = 75;
  const TARGET_W = 1920;
  const TARGET_H = 1080;

  // Load and normalize keyframe raw pixel buffers
  const keyframeBuffers = await Promise.all(
    keyframes.map(kf =>
      sharp(kf)
        .resize(TARGET_W, TARGET_H, { fit: 'cover' })
        .raw()
        .toBuffer({ resolveWithObject: true })
    )
  );

  const { width, height, channels } = keyframeBuffers[0].info;

  for (let f = 1; f <= TOTAL_FRAMES; f++) {
    const globalProgress = (f - 1) / (TOTAL_FRAMES - 1); // 0 to 1
    const segmentCount = keyframes.length - 1; // 3 segments
    const exactSegment = globalProgress * segmentCount;
    const segment = Math.min(Math.floor(exactSegment), segmentCount - 1);
    const localProgress = exactSegment - segment;

    // Smooth cubic bezier / sinusoidal easing for ultra smooth video interpolation
    const ease = 0.5 - 0.5 * Math.cos(localProgress * Math.PI);

    const bufA = keyframeBuffers[segment].data;
    const bufB = keyframeBuffers[segment + 1].data;

    const blended = Buffer.alloc(width * height * channels);

    for (let i = 0; i < bufA.length; i += channels) {
      const r = Math.round(bufA[i] * (1 - ease) + bufB[i] * ease);
      const g = Math.round(bufA[i + 1] * (1 - ease) + bufB[i + 1] * ease);
      const b = Math.round(bufA[i + 2] * (1 - ease) + bufB[i + 2] * ease);

      blended[i] = r;
      blended[i + 1] = g;
      blended[i + 2] = b;
    }

    const paddedIndex = String(f).padStart(3, '0');
    const outputPath = path.join(outputDir, `frame_${paddedIndex}.webp`);

    await sharp(blended, { raw: { width, height, channels } })
      .webp({ quality: 88, effort: 4 })
      .toFile(outputPath);

    if (f % 15 === 0 || f === TOTAL_FRAMES) {
      console.log(`Generated frame ${f}/${TOTAL_FRAMES}`);
    }
  }

  console.log(`Successfully generated all ${TOTAL_FRAMES} high-res developer coding frames in ${outputDir}!`);
}

generateDeveloperSequence().catch(console.error);
