const fs = require('fs');
const path = require('path');

// Images to replace
const imagesToReplace = [
  'https://images.unsplash.com/photo-1606744824163-985d376605aa?w=800',
  'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=800',
  'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800',
  'https://images.unsplash.com/photo-1585238341710-886a75e1ede4?w=800'
];

// Appropriate replacement images by product type
const replacementImages = {
  // Raw chicken wings - appropriate images
  'chicken-wings': [
    'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    'https://images.pexels.com/photos/106343/pexels-photo-106343.jpeg?w=800',
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800'
  ],
  // Chicken breast
  'chicken-breast': [
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800',
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800'
  ],
  // Cooked chicken
  'cooked-chicken': [
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
    'https://images.pexels.com/photos/3688/food-dinner-lunch-meal.jpg?w=800',
    'https://images.unsplash.com/photo-1588347818036-af5e5c6f7b57?w=800',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800'
  ],
  // Duck products
  'duck': [
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800',
    'https://images.unsplash.com/photo-1588347818036-af5e5c6f7b57?w=800',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800'
  ],
  // Other chicken products
  'chicken-other': [
    'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800',
    'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?w=800',
    'https://images.unsplash.com/photo-1588347818036-af5e5c6f7b57?w=800',
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800'
  ]
};

function getReplacementImages(product) {
  const category = product.category?.toUpperCase() || '';
  const subcategory = product.subcategory?.toLowerCase() || '';
  const name = product.name?.toLowerCase() || '';

  // Chicken wings
  if (category === 'CHICKEN' && (subcategory.includes('wing') || name.includes('wing'))) {
    return replacementImages['chicken-wings'];
  }
  
  // Cooked chicken
  if (category === 'CHICKEN' && (subcategory.includes('cooked') || name.includes('cooked') || name.includes('steam'))) {
    return replacementImages['cooked-chicken'];
  }
  
  // Chicken breast
  if (category === 'CHICKEN' && (subcategory.includes('breast') || name.includes('breast') || name.includes('fillet'))) {
    return replacementImages['chicken-breast'];
  }
  
  // Duck products
  if (category === 'POULTRY & GAME' && (name.includes('duck') || subcategory.includes('duck'))) {
    return replacementImages['duck'];
  }
  
  // Other chicken
  if (category === 'CHICKEN') {
    return replacementImages['chicken-other'];
  }
  
  // Default
  return replacementImages['chicken-other'];
}

const productsPath = path.join(__dirname, '../src/data/products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

let updatedCount = 0;
let productsUpdated = [];

data.forEach(product => {
  if (!product.images || !Array.isArray(product.images)) return;
  
  const hasInappropriateImages = product.images.some(img => imagesToReplace.includes(img));
  
  if (hasInappropriateImages) {
    const replacement = getReplacementImages(product);
    const newImages = product.images.map(img => {
      if (imagesToReplace.includes(img)) {
        // Replace with corresponding image from replacement array
        const index = imagesToReplace.indexOf(img);
        return replacement[index % replacement.length];
      }
      return img;
    });
    
    product.images = newImages;
    updatedCount++;
    productsUpdated.push({
      sku: product.sku,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory
    });
  }
});

// Write updated data
fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));

console.log(`✅ Updated ${updatedCount} products:\n`);
productsUpdated.forEach(p => {
  console.log(`- ${p.sku}: ${p.name} (${p.category} / ${p.subcategory})`);
});

console.log(`\n✅ All inappropriate images have been replaced with appropriate ones!`);

