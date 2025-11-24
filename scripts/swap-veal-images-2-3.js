const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products.json');

console.log('🔄 Swapping Image2 and Image3 for VEAL products...\n');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let updatedCount = 0;

products.forEach(product => {
  if (product.category === 'VEAL' && product.active && product.images && product.images.length >= 3) {
    // Current order: Image1, Image2, Image3, Image4
    // New order: Image1, Image3, Image2, Image4
    const [img1, img2, img3, img4] = product.images;
    product.images = [img1, img3, img2, img4];
    updatedCount++;
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

console.log(`✅ Swapped Image2 and Image3 for ${updatedCount} VEAL products`);
console.log(`   New order: Image1, Image3, Image2, Image4\n`);


