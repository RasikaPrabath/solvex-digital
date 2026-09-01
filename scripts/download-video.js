const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'public', 'images', 'developer-coding.mp4');

const testUrls = [
  // Wikimedia / Public CDN high quality coding and tech video links
  'https://cdn.pixabay.com/video/2020/04/17/36423-410972274_large.mp4',
  'https://cdn.pixabay.com/video/2016/09/13/5194-183786493_large.mp4',
  'https://cdn.pixabay.com/video/2021/04/12/70889-537330752_large.mp4',
  'https://cdn.pixabay.com/video/2020/05/25/40149-425313460_large.mp4',
  'https://cdn.pixabay.com/video/2022/11/04/137681-767784333_large.mp4',
  'https://cdn.pixabay.com/video/2023/10/20/185816-876939922_large.mp4',
  'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/person-bicycle-car-detection.mp4'
];

async function tryDownload() {
  for (const url of testUrls) {
    try {
      console.log('Trying:', url);
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://pixabay.com/'
        }
      });
      console.log('Status:', res.status, res.headers.get('content-type'), res.headers.get('content-length'));
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(targetPath, buffer);
        console.log(`SUCCESS! Saved video (${buffer.length} bytes) to ${targetPath}`);
        return true;
      }
    } catch (e) {
      console.log('Error:', e.message);
    }
  }
  return false;
}

tryDownload().then(res => console.log('Final:', res));
