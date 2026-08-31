const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outputDir = path.join(__dirname, '..', 'public', 'images', 'sequence');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const TOTAL_FRAMES = 60;
const WIDTH = 1000;
const HEIGHT = 1000;

function project3D(x, y, z, rotX, rotY, rotZ, scale = 260) {
  // Rotate around Y
  let x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
  let y1 = y;
  let z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);

  // Rotate around X
  let x2 = x1;
  let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
  let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

  // Rotate around Z
  let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
  let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ);
  let z3 = z2;

  // Perspective projection
  const distance = 800;
  const fov = distance / (distance + z3);
  return {
    x: WIDTH / 2 + x3 * fov * (scale / 200),
    y: HEIGHT / 2 + y3 * fov * (scale / 200),
    z: z3,
    fov: fov
  };
}

async function generateFrames() {
  console.log(`Generating ${TOTAL_FRAMES} high-res 3D frames with sharp...`);

  // 3D Cube Vertices
  const vertices = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1],  [1, -1, 1],  [1, 1, 1],  [-1, 1, 1]
  ];

  // Cube Faces (quads with normals)
  const faces = [
    { idx: [0, 1, 2, 3], normal: [0, 0, -1], color: '#3b82f6', tint: 'rgba(59, 130, 246, 0.25)' }, // Front
    { idx: [5, 4, 7, 6], normal: [0, 0, 1], color: '#6366f1', tint: 'rgba(99, 102, 241, 0.35)' },  // Back
    { idx: [4, 0, 3, 7], normal: [-1, 0, 0], color: '#2563eb', tint: 'rgba(37, 99, 235, 0.2)' },   // Left
    { idx: [1, 5, 6, 2], normal: [1, 0, 0], color: '#4f46e5', tint: 'rgba(79, 70, 229, 0.3)' },    // Right
    { idx: [4, 5, 1, 0], normal: [0, -1, 0], color: '#93c5fd', tint: 'rgba(147, 197, 253, 0.4)' }, // Top
    { idx: [3, 2, 6, 7], normal: [0, 1, 0], color: '#1d4ed8', tint: 'rgba(29, 78, 216, 0.2)' }     // Bottom
  ];

  for (let f = 1; f <= TOTAL_FRAMES; f++) {
    const progress = (f - 1) / TOTAL_FRAMES;
    const rotY = progress * Math.PI * 2 + 0.4;
    const rotX = 0.55 + Math.sin(progress * Math.PI * 2) * 0.25;
    const rotZ = Math.sin(progress * Math.PI * 2) * 0.15;

    // Projected vertices
    const proj = vertices.map(v => project3D(v[0], v[1], v[2], rotX, rotY, rotZ, 280));

    // Sort faces by depth (painter's algorithm)
    const renderedFaces = faces.map(face => {
      const pts = face.idx.map(i => proj[i]);
      const avgZ = (pts[0].z + pts[1].z + pts[2].z + pts[3].z) / 4;

      // Calculate 2D normal direction to check if front-facing
      const v1 = { x: pts[1].x - pts[0].x, y: pts[1].y - pts[0].y };
      const v2 = { x: pts[2].x - pts[0].x, y: pts[2].y - pts[0].y };
      const crossZ = v1.x * v2.y - v1.y * v2.x;

      return { face, pts, avgZ, crossZ };
    }).sort((a, b) => a.avgZ - b.avgZ);

    // Generate SVG for this frame
    let svgContent = `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.12"/>
          <stop offset="60%" stop-color="#1d4ed8" stop-opacity="0.04"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="12" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background Ambient Glow -->
      <circle cx="${WIDTH/2}" cy="${HEIGHT/2}" r="380" fill="url(#bgGlow)" />

      <!-- Outer 3D Gyro Rings -->
      <g filter="url(#glow)">
        <ellipse cx="${WIDTH/2}" cy="${HEIGHT/2}" rx="380" ry="${140 + Math.sin(rotY)*60}" 
                 transform="rotate(${rotY * 45}, ${WIDTH/2}, ${HEIGHT/2})" 
                 fill="none" stroke="rgba(59, 130, 246, 0.4)" stroke-width="2.5" stroke-dasharray="10 14" />
        
        <ellipse cx="${WIDTH/2}" cy="${HEIGHT/2}" rx="320" ry="${110 - Math.sin(rotX)*40}" 
                 transform="rotate(${-rotY * 60 + 45}, ${WIDTH/2}, ${HEIGHT/2})" 
                 fill="none" stroke="rgba(99, 102, 241, 0.5)" stroke-width="2" />
      </g>
    `;

    // Draw 3D Cube Faces with glassmorphism and edge highlights
    renderedFaces.forEach(({ pts, crossZ, face }) => {
      const isVisible = crossZ > 0;
      const opacity = isVisible ? '0.88' : '0.22';
      const strokeOpacity = isVisible ? '0.95' : '0.35';

      const pathData = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} ` +
        `L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)} ` +
        `L ${pts[2].x.toFixed(1)} ${pts[2].y.toFixed(1)} ` +
        `L ${pts[3].x.toFixed(1)} ${pts[3].y.toFixed(1)} Z`;

      svgContent += `
        <path d="${pathData}" fill="${face.tint}" fill-opacity="${opacity}" stroke="${face.color}" stroke-opacity="${strokeOpacity}" stroke-width="2.5" stroke-linejoin="round" />
      `;

      // Draw glowing corner vertices
      pts.forEach(p => {
        svgContent += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5" fill="#ffffff" />`;
      });
    });

    // Inner Glowing Core
    svgContent += `
      <circle cx="${WIDTH/2}" cy="${HEIGHT/2}" r="35" fill="#60a5fa" filter="url(#glow)" fill-opacity="0.8" />
      <circle cx="${WIDTH/2}" cy="${HEIGHT/2}" r="16" fill="#ffffff" />
    </svg>`;

    // Save as WebP
    const paddedIndex = String(f).padStart(3, '0');
    const filename = `frame_${paddedIndex}.webp`;
    const outputPath = path.join(outputDir, filename);

    const svgBuffer = Buffer.from(svgContent);
    await sharp(svgBuffer)
      .webp({ quality: 90 })
      .toFile(outputPath);
  }

  console.log(`Successfully generated all ${TOTAL_FRAMES} WebP frames in ${outputDir}!`);
}

generateFrames().catch(err => {
  console.error(err);
  process.exit(1);
});
