import fs from 'fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  const artworksPath = path.join(process.cwd(), 'public', 'img', 'artworks');
  
  try {
    const files = await fs.readdir(artworksPath);
    return files.filter(file => 
      /\.(jpe?g|png|gif|webp|avif)$/i.test(file)
    );
  } catch (error) {
    console.error('Error reading artworks directory:', error);
    return [];
  }
});