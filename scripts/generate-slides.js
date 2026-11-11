const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'slides');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function generateRibbedArt(theme) {
  const W = 800;
  const H = 1000;
  const count = 56;
  const colW = W / count;

  let ribsSvg = '';

  for (let i = 0; i < count; i++) {
    const x = i * colW;
    // Organic wave for rib bottoms
    const norm = i / count;
    const wave1 = Math.sin(norm * Math.PI * 2.2 + theme.phase) * 120;
    const wave2 = Math.cos(norm * Math.PI * 4.5) * 45;
    const wave3 = Math.sin(norm * 14) * 20;
    const ribHeight = 520 + wave1 + wave2 + wave3;
    const rx = colW * 0.42;

    // Highlights on alternating ribs
    const opacity = 0.55 + ((i % 3) * 0.15) + Math.sin(norm * Math.PI) * 0.2;
    
    ribsSvg += `
      <rect 
        x="${(x + 1).toFixed(1)}" 
        y="0" 
        width="${(colW - 2).toFixed(1)}" 
        height="${ribHeight.toFixed(1)}" 
        rx="${rx.toFixed(1)}" 
        fill="url(#ribGrad-${theme.id})" 
        opacity="${Math.min(opacity, 0.95).toFixed(2)}"
      />
      <!-- Specular center line on each rib for glass reflection -->
      <line 
        x1="${(x + colW / 2).toFixed(1)}" 
        y1="0" 
        x2="${(x + colW / 2).toFixed(1)}" 
        y2="${(ribHeight - rx).toFixed(1)}" 
        stroke="#ffffff" 
        stroke-width="1.2" 
        opacity="${((i % 2 === 0 ? 0.4 : 0.15) * Math.sin(norm * Math.PI * 0.9 + 0.2)).toFixed(2)}"
      />
    `;
  }

  return `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background vertical flow -->
    <linearGradient id="mainBg-${theme.id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${theme.bgTop}" />
      <stop offset="25%" stop-color="${theme.bgUpper}" />
      <stop offset="50%" stop-color="${theme.bgMid}" />
      <stop offset="75%" stop-color="${theme.bgLower}" />
      <stop offset="100%" stop-color="#020814" />
    </linearGradient>

    <!-- Rib vertical gradient -->
    <linearGradient id="ribGrad-${theme.id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.98" />
      <stop offset="18%" stop-color="#ffffff" stop-opacity="0.9" />
      <stop offset="45%" stop-color="${theme.accent}" stop-opacity="0.85" />
      <stop offset="80%" stop-color="${theme.glow}" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#020814" stop-opacity="0" />
    </linearGradient>

    <!-- Vibrant cyan radial core -->
    <radialGradient id="centerGlow-${theme.id}" cx="45%" cy="48%" r="48%">
      <stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.75" />
      <stop offset="55%" stop-color="${theme.glow}" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#020814" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Deep base -->
  <rect width="${W}" height="${H}" fill="#020814" />
  <rect width="${W}" height="${H}" fill="url(#mainBg-${theme.id})" />

  <!-- Core glow -->
  <circle cx="${W * 0.45}" cy="${H * 0.48}" r="${W * 0.55}" fill="url(#centerGlow-${theme.id})" />

  <!-- Fluted glass streaks -->
  <g>
    ${ribsSvg}
  </g>

  <!-- Seamless fade into bottom dark container -->
  <rect 
    y="${H * 0.6}" 
    width="${W}" 
    height="${H * 0.4}" 
    fill="url(#bottomFade)" 
  />
  <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#020814" stop-opacity="0" />
    <stop offset="50%" stop-color="#020814" stop-opacity="0.5" />
    <stop offset="100%" stop-color="#020814" stop-opacity="0.95" />
  </linearGradient>
</svg>
  `;
}

const themes = [
  {
    id: 1,
    bgTop: '#ffffff',
    bgUpper: '#e2f6fb',
    bgMid: '#19C3E6',
    bgLower: '#084869',
    accent: '#19C3E6',
    glow: '#0085a8',
    phase: 0.1,
  },
  {
    id: 2,
    bgTop: '#ffffff',
    bgUpper: '#e8ecfd',
    bgMid: '#5b7bfb',
    bgLower: '#1b2d75',
    accent: '#6384ff',
    glow: '#19C3E6',
    phase: 1.2,
  },
  {
    id: 3,
    bgTop: '#ffffff',
    bgUpper: '#e3fbf4',
    bgMid: '#1adbb7',
    bgLower: '#09574c',
    accent: '#1adbb7',
    glow: '#19C3E6',
    phase: 2.4,
  },
  {
    id: 4,
    bgTop: '#ffffff',
    bgUpper: '#e4f0fc',
    bgMid: '#2d91f8',
    bgLower: '#0f4482',
    accent: '#2d91f8',
    glow: '#19C3E6',
    phase: 3.6,
  },
  {
    id: 5,
    bgTop: '#ffffff',
    bgUpper: '#e0f6fc',
    bgMid: '#05c7f8',
    bgLower: '#074e76',
    accent: '#05c7f8',
    glow: '#1487a8',
    phase: 4.8,
  },
];

async function run() {
  for (const t of themes) {
    const svg = Buffer.from(generateRibbedArt(t));
    const dest = path.join(outDir, `slide-${t.id}.webp`);
    await sharp(svg).webp({ quality: 95 }).toFile(dest);
    console.log(`Generated: ${dest}`);
  }
}

run().catch(console.error);
