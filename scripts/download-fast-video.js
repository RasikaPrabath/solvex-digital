const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'images', 'developer-coding.mp4');

// High quality real dark developer coding video direct MP4 links from Pexels
const urls = [
  'https://videos.pexels.com/video-files/36328529/15406860_1920_1080_25fps.mp4',
  'https://videos.pexels.com/video-files/5495781/5495781-uhd_2560_1080_30fps.mp4',
  'https://videos.pexels.com/video-files/854053/854053-hd_1920_1080_25fps.mp4'
];

async function downloadFast() {
  for (const url of urls) {
    try {
      console.log('Downloading from:', url);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(targetPath, buf);
        console.log(`SUCCESS! Saved real developer video (${buf.length} bytes) to ${targetPath}`);
        return true;
      }
    } catch (e) {
      console.log('Download error:', e.message);
    }
  }
  return false;
}

downloadFast().then(console.log);
