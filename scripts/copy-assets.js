import { copyFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = join(__dirname, '../../casa_biker');
const targetDir = join(__dirname, '../public');

// Asset directories to copy
const directories = {
  images: ['images'],
  videos: ['videos']
};

async function copyAssets() {
  try {
    // Create target directories if they don't exist
    for (const dir of Object.values(directories).flat()) {
      const targetPath = join(targetDir, dir);
      await mkdir(targetPath, { recursive: true });
      console.log(`Created directory: ${targetPath}`);
    }

    // Copy files from each directory
    for (const [type, dirs] of Object.entries(directories)) {
      for (const dir of dirs) {
        const sourcePath = join(sourceDir, dir);
        const targetPath = join(targetDir, dir);
        
        try {
          const files = await readdir(sourcePath);
          for (const file of files) {
            const sourceFile = join(sourcePath, file);
            const targetFile = join(targetPath, file);
            await copyFile(sourceFile, targetFile);
            console.log(`Copied ${type}: ${file}`);
          }
        } catch (err) {
          console.error(`Error copying ${type} from ${sourcePath}:`, err);
        }
      }
    }

    console.log('Asset copy completed successfully!');
  } catch (err) {
    console.error('Error during asset copy:', err);
    process.exit(1);
  }
}

copyAssets();
