const fs = require('fs');
const path = require('path');

// Check if sharp is available (Next.js uses it for image optimization)
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.log('⚠️  Sharp not found. Installing sharp for image optimization...');
  console.log('   Run: npm install sharp');
  console.log('   For now, copying images as-is (Next.js will optimize on-demand)');
}

// Check if source images are in Image/Burger or already in public/Image/Burger
// Note: Folder is "Burger" but category is "BURGERS"
const sourceDir = path.join(__dirname, '../Image/Burger');
const publicDir = path.join(__dirname, '../public/Image/Burger');
const productsPath = path.join(__dirname, '../src/data/products.json');

// Ensure public directory exists
if (!fs.existsSync(path.join(__dirname, '../public/Image'))) {
  fs.mkdirSync(path.join(__dirname, '../public/Image'), { recursive: true });
}
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Image files - handle lowercase "image1.png" and normalize to "Image1.png"
const imageFiles = ['image1.png', 'image2.png', 'image3.png', 'image4.png'];
const normalizedNames = ['Image1.png', 'Image2.png', 'Image3.png', 'Image4.png'];

async function optimizeImages() {
  const optimizedPaths = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const fileName = imageFiles[i];
    const normalizedName = normalizedNames[i];
    
    // Try source directory first, then public directory
    let sourcePath = path.join(sourceDir, fileName);
    if (!fs.existsSync(sourcePath)) {
      // Try public directory (already there)
      sourcePath = path.join(publicDir, fileName);
    }
    if (!fs.existsSync(sourcePath)) {
      // Try with capital I
      sourcePath = path.join(sourceDir, normalizedName);
    }
    if (!fs.existsSync(sourcePath)) {
      sourcePath = path.join(publicDir, normalizedName);
    }
    
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Source image not found: ${fileName} or ${normalizedName}`);
      continue;
    }
    
    const publicPath = path.join(publicDir, normalizedName);
    
    if (sharp) {
      try {
        // Optimize: Convert to WebP, resize to max 1200px width, quality 85%
        const image = sharp(sourcePath);
        const metadata = await image.metadata();
        
        // Resize if too large (max 1200px width, maintain aspect ratio)
        let pipeline = image;
        if (metadata.width > 1200) {
          pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
        }
        
        // Convert to WebP with quality 85%
        const webpPath = publicPath.replace('.png', '.webp');
        await pipeline.webp({ quality: 85 }).toFile(webpPath);
        
        // Also keep PNG version (optimized) for fallback
        await pipeline.png({ quality: 90, compressionLevel: 9 }).toFile(publicPath);
        
        const originalSize = fs.statSync(sourcePath).size;
        const webpSize = fs.statSync(webpPath).size;
        const pngSize = fs.statSync(publicPath).size;
        
        console.log(`✅ Optimized ${fileName}:`);
        console.log(`   Original: ${(originalSize / 1024).toFixed(2)} KB`);
        console.log(`   WebP: ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% smaller)`);
        console.log(`   PNG: ${(pngSize / 1024).toFixed(2)} KB (${((1 - pngSize/originalSize) * 100).toFixed(1)}% smaller)`);
        
        // Use WebP as primary, PNG as fallback
        // Note: Folder is "Burger" but we'll use "Burger" in the path
        optimizedPaths.push(`/Image/Burger/${normalizedName.replace('.png', '.webp')}`);
      } catch (error) {
        console.log(`❌ Error optimizing ${fileName}:`, error.message);
        // Fallback: just copy the file
        fs.copyFileSync(sourcePath, publicPath);
        optimizedPaths.push(`/Image/Burger/${normalizedName}`);
      }
    } else {
      // No sharp: just copy (Next.js will optimize on-demand)
      fs.copyFileSync(sourcePath, publicPath);
      optimizedPaths.push(`/Image/Burger/${normalizedName}`);
      console.log(`📋 Copied ${fileName} to public folder (Next.js will optimize on-demand)`);
    }
  }
  
  return optimizedPaths;
}

async function updateProducts() {
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  const imagePaths = await optimizeImages();
  
  if (imagePaths.length === 0) {
    console.log('❌ No images to assign. Exiting.');
    return;
  }
  
  // If we have WebP, use those; otherwise use PNG
  const finalImagePaths = imagePaths.length === 4 
    ? imagePaths 
    : imagePaths.map(p => p.replace('.webp', '.png'));
  
  let updatedCount = 0;
  
  products.forEach(product => {
    if (product.category === 'BURGERS' && product.active) {
      // Assign all 4 images in order
      product.images = [...finalImagePaths];
      updatedCount++;
    }
  });
  
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
  
  console.log(`\n✅ Updated ${updatedCount} BURGERS products with optimized images`);
  console.log(`   Images assigned: ${finalImagePaths.join(', ')}`);
  console.log(`\n💡 Next.js Image component will further optimize these on-demand`);
}

updateProducts().catch(console.error);


