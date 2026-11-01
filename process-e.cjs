const sharp = require('sharp');
const path = require('path');

async function processOptionE() {
  const baseDir = __dirname;
  
  // From story-3-installation.jpg: high-res, 3000x2000, roofer on upper right with tool pouch and corrugated sheet
  await sharp(path.join(baseDir, 'public', 'images', 'story-3-installation.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'right' })
    .modulate({ brightness: 1.0, saturation: 1.15 })
    .jpeg({ quality: 92 })
    .toFile(path.join(baseDir, 'candidates', 'hero-option-e.jpg'));
  console.log('Processed Option E');
}

processOptionE().catch(console.error);
