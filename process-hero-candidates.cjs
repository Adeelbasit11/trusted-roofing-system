const sharp = require('sharp');
const path = require('path');

async function processImages() {
  const baseDir = __dirname;
  
  // Option A: worker-seamer.jpg (Worker already on right side with seamer machine on standing seam roof)
  await sharp(path.join(baseDir, 'candidates', 'worker-seamer.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'right top' })
    .modulate({ brightness: 0.95, saturation: 1.15 })
    .jpeg({ quality: 90 })
    .toFile(path.join(baseDir, 'candidates', 'hero-option-a.jpg'));
  console.log('Processed Option A');

  // Option B: repair-9440921.jpg (Roofer fitting corrugated roof sheet, flipped so he is on the right side)
  await sharp(path.join(baseDir, 'candidates', 'repair-9440921.jpg'))
    .flop() // mirror horizontally so roofer is on the right
    .resize(1920, 1080, { fit: 'cover', position: 'right' })
    .modulate({ brightness: 1.08, saturation: 1.15 })
    .jpeg({ quality: 92 })
    .toFile(path.join(baseDir, 'candidates', 'hero-option-b.jpg'));
  console.log('Processed Option B');

  // Option C: repair-9440922.jpg (Roofer drilling/fastening metal roof sheet)
  await sharp(path.join(baseDir, 'candidates', 'repair-9440922.jpg'))
    .resize(1920, 1080, { fit: 'cover', position: 'right' })
    .modulate({ brightness: 1.05, saturation: 1.15 })
    .jpeg({ quality: 92 })
    .toFile(path.join(baseDir, 'candidates', 'hero-option-c.jpg'));
  console.log('Processed Option C');
}

processImages().catch(console.error);
