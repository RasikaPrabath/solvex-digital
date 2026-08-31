const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity-ide\\brain\\bc24b41b-e1cb-41cf-9c07-d664c57aa502';
const outputDir = path.join(__dirname, '..', 'public', 'images', 'sequence');

// Find latest 16:9 Landscape Mockup images
const files = fs.readdirSync(artifactDir);
const img1 = path.join(artifactDir, files.filter(f => f.startsWith('landscape_mockup_1')).pop());
const img2 = path.join(artifactDir, files.filter(f => f.startsWith('landscape_mockup_2')).pop());
const img3 = path.join(artifactDir, files.filter(f => f.startsWith('landscape_mockup_3')).pop());
const img4 = path.join(artifactDir, files.filter(f => f.startsWith('landscape_mockup_4')).pop());

const keyframes = [img1, img2, img3, img4];

async function generateLandscapeSequence() {
  console.log('Generating 60 Full Size 16:9 Landscape Mockup sequence frames (1920x1080)...');

  const TOTAL_FRAMES = 60;
  const keyframeBuffers = await Promise.all(
    keyframes.map(kf => sharp(kf).resize(1920, 1080, { fit: 'cover' }).raw().toBuffer({ resolveWithObject: true }))
  );

  for (let f = 1; f <= TOTAL_FRAMES; f++) {
    const progress = (f - 1) / (TOTAL_FRAMES - 1); // 0 to 1
    const segmentCount = keyframes.length - 1;
    const segment = Math.min(Math.floor(progress * segmentCount), segmentCount - 1);
    const localProgress = (progress * segmentCount) - segment;

    // Smooth sinusoidal easing
    const ease = 0.5 - 0.5 * Math.cos(localProgress * Math.PI);

    const bufA = keyframeBuffers[segment].data;
    const bufB = keyframeBuffers[segment + 1].data;
    const { width, height, channels } = keyframeBuffers[0].info;

    const blended = Buffer.alloc(width * height * channels);

    for (let i = 0; i < bufA.length; i += channels) {
      // Linear blend between keyframe A and keyframe B
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
      .webp({ quality: 90 })
      .toFile(outputPath);
  }

  console.log(`Generated all ${TOTAL_FRAMES} full-size 16:9 widescreen frames into ${outputDir}!`);
}

generateLandscapeSequence().catch(console.error);
