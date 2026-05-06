import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputDir = join(__dirname, '..', 'images');
const outputDir = join(__dirname, '..', 'public', 'images');

const LARGE_FILE_THRESHOLD = 500 * 1024; // 500 KB
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;

await mkdir(outputDir, { recursive: true });

const files = await readdir(inputDir);
const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));

console.log(`\nOptimizando ${imageFiles.length} imágenes...\n`);

for (const file of imageFiles) {
  const inputPath = join(inputDir, file);
  const outputName = basename(file, extname(file)) + '.webp';
  const outputPath = join(outputDir, outputName);

  const { size } = await stat(inputPath);
  const isLarge = size > LARGE_FILE_THRESHOLD;

  let pipeline = sharp(inputPath);

  if (isLarge) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath);

  const { size: outSize } = await stat(outputPath);
  const reduction = Math.round((1 - outSize / size) * 100);
  console.log(
    `  ${file.padEnd(42)} ${(size / 1024).toFixed(0).padStart(7)} KB  →  ${(outSize / 1024).toFixed(0).padStart(6)} KB  (-${reduction}%)`
  );
}

console.log('\nListo! Imágenes guardadas en public/images/\n');
