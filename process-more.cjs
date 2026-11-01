const sharp = require('sharp');
const path = require('path');

async function processMore() {
  const baseDir = __dirname;
  
  // Option D: repair-9440922.jpg flopped, focusing on the roofer with the cordless drill on the right
  await sharp(path.join(baseDir, 'candidates', 'repair-9440922.jpg'))
    .flop()
    .extract({ left: 300, top: 200, width: 2800, height: 1575 }) // crop to remove foreground standing back and focus on the roofer drilling
    .resize(1920, 1080)
    .modulate({ brightness: 1.05, saturation: 1.15 })
    .jpeg({ quality: 92 })
    .toFile(path.join(baseDir, 'candidates', 'hero-option-d.jpg'));
  console.log('Processed Option D');
}

processMore().catch(console.error);
