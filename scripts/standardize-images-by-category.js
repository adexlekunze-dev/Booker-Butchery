const fs = require('fs');
const path = require('path');

// One image per category for prototype consistency
const categoryImages = {
  'BEEF': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'PORK': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'LAMB': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'CHICKEN': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
  'POULTRY & GAME': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
  'VEAL': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'MUTTON': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'BURGERS': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'SAUSAGES': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'ADDED VALUE': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'EGGS & FATS': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
  'FISH': 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'
};

const productsPath = path.join(__dirname, '../src/data/products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const categoryCounts = {};
let updatedCount = 0;
const missingCategories = new Set();

data.forEach(product => {
  if (!product.category || !product.active) return;
  
  const category = product.category.toUpperCase();
  const standardImage = categoryImages[category];
  
  if (!standardImage) {
    missingCategories.add(category);
    return;
  }
  
  // Set all 4 image slots to the same category image
  product.images = [
    standardImage,
    standardImage,
    standardImage,
    standardImage
  ];
  
  categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  updatedCount++;
});

// Write updated data
fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));

console.log('✅ Standardized images by category:\n');
Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([category, count]) => {
    console.log(`  ${category}: ${count} products`);
    console.log(`    Image: ${categoryImages[category]}\n`);
  });

if (missingCategories.size > 0) {
  console.log(`\n⚠️  Categories without image mapping (${missingCategories.size}):`);
  Array.from(missingCategories).sort().forEach(cat => {
    console.log(`    - ${cat}`);
  });
}

console.log(`\n✅ Total products updated: ${updatedCount}`);

