const fs = require('fs');
const path = require('path');

const categoryRecipesPath = path.join(__dirname, '../src/data/category-recipes.ts');
const productsPath = path.join(__dirname, '../src/data/products.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const categoryRecipesContent = fs.readFileSync(categoryRecipesPath, 'utf8');

// Extract all SKUs from category-recipes.ts
const skuMatches = categoryRecipesContent.match(/"sku":\s*"([^"]+)"/g);
if (!skuMatches) {
  console.log('No SKUs found in category-recipes.ts');
  process.exit(0);
}

const skus = skuMatches.map(m => m.match(/"([^"]+)"/)[1]);
const productSkus = new Set(products.map(p => p.sku));

console.log('🔍 Validating SKUs in category-recipes.ts...\n');
console.log(`Total SKUs found: ${skus.length}\n`);

const invalidSkus = [];
const validSkus = [];

skus.forEach(sku => {
  if (productSkus.has(sku)) {
    validSkus.push(sku);
  } else {
    invalidSkus.push(sku);
  }
});

if (invalidSkus.length > 0) {
  console.log(`❌ Invalid SKUs (${invalidSkus.length}):`);
  invalidSkus.forEach(sku => console.log(`   - ${sku}`));
  console.log('');
} else {
  console.log('✅ All SKUs are valid!\n');
}

console.log(`✅ Valid SKUs: ${validSkus.length}`);
console.log(`❌ Invalid SKUs: ${invalidSkus.length}\n`);

if (invalidSkus.length > 0) {
  process.exit(1);
} else {
  console.log('🎉 All recipe SKUs are valid and ready for recipe-to-cart functionality!');
}


