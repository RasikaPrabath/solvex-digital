const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'images', 'developer-coding.mp4');

const videoIds = [
  '3129957',
  '5495899',
  '5495843',
  '8721932',
  '3129671',
  '4164434',
  '854964',
  '2792370'
];

async function tryDownloadPexelsDirect() {
  for (const id of videoIds) {
    const downloadUrl = `https://www.pexels.com/video/${id}/download/`;
    console.log('Trying download URL:', downloadUrl);
    try {
      const res = await fetch(downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': `https://www.pexels.com/video/${id}/`
        },
        redirect: 'follow'
      });
      console.log('Status:', res.status, res.headers.get('content-type'), res.headers.get('content-length'));
      if (res.ok) {
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length > 500000) {
          fs.writeFileSync(targetPath, buf);
          console.log(`SUCCESSFULLY DOWNLOADED VIDEO (${buf.length} bytes) to ${targetPath}!`);
          return true;
        }
      }
    } catch (e) {
      console.log('Failed:', e.message);
    }
  }
  return false;
}

tryDownloadPexelsDirect().then(console.log);
