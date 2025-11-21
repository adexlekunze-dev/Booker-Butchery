const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Find the product
const product = data.find(p => p.sku === 'M249285');

if (!product) {
  console.log('Product M249285 not found!');
  process.exit(1);
}

console.log('Found product:', product.name);
console.log('Current images:', product.images);

// Replace with appropriate chicken wing images
product.images = [
  'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', // Raw chicken wings
  'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=800', // Raw chicken wings
  'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', // Raw meat
  'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800' // Raw chicken
];

// Also update all other chicken wing products to have varied images
const chickenWingProducts = data.filter(p => 
  p.category === 'CHICKEN' && 
  (p.subcategory?.toLowerCase().includes('wing') || p.name?.toLowerCase().includes('wing'))
);

console.log(`\nUpdating ${chickenWingProducts.length} chicken wing products...`);

chickenWingProducts.forEach(p => {
  // Check if product has any of the old inappropriate images
  const hasOldImages = p.images && p.images.some(img => 
    img.includes('photo-1606744824163') ||
    img.includes('60616/fried-chicken') ||
    img.includes('photo-1527477396000') ||
    img.includes('photo-1585238341710')
  );
  
  if (hasOldImages || p.sku === 'M249285') {
    p.images = [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
      'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=800',
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800'
    ];
    console.log(`  Updated: ${p.sku} - ${p.name}`);
  }
});

// Write updated data
fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));

console.log('\n✅ All chicken wing products updated with appropriate images!');
console.log(`\nM249285 images after update:`);
const updated = data.find(p => p.sku === 'M249285');
updated.images.forEach((img, i) => console.log(`  ${i+1}. ${img}`));

