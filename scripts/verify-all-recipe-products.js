const fs = require('fs');
const path = require('path');

const categoryRecipesPath = path.join(__dirname, '../src/data/category-recipes.ts');
const productsPath = path.join(__dirname, '../src/data/products.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const categoryRecipesContent = fs.readFileSync(categoryRecipesPath, 'utf8');

// Extract all ingredients with SKUs
const ingredientMatches = categoryRecipesContent.match(/\{\s*name:\s*"([^"]+)",\s*sku:\s*"([^"]+)"/g);
const productSkus = new Set(products.map(p => p.sku));

console.log('🔍 Verifying all recipe ingredients have valid products...\n');

if (!ingredientMatches || ingredientMatches.length === 0) {
  console.log('⚠️  No ingredients with SKUs found in category-recipes.ts');
  process.exit(0);
}

const missingProducts = [];
const validProducts = [];

ingredientMatches.forEach(match => {
  const skuMatch = match.match(/sku:\s*"([^"]+)"/);
  const nameMatch = match.match(/name:\s*"([^"]+)"/);
  
  if (skuMatch && nameMatch) {
    const sku = skuMatch[1];
    const name = nameMatch[1];
    
    if (productSkus.has(sku)) {
      validProducts.push({ name, sku });
    } else {
      missingProducts.push({ name, sku });
    }
  }
});

console.log(`Total ingredients with SKUs: ${ingredientMatches.length}`);
console.log(`✅ Valid products: ${validProducts.length}`);
console.log(`❌ Missing products: ${missingProducts.length}\n`);

if (missingProducts.length > 0) {
  console.log('Missing products:');
  missingProducts.forEach(({ name, sku }) => {
    console.log(`  - ${name} (SKU: ${sku})`);
  });
  console.log('\n⚠️  These products need to be created before recipe-to-cart will work.');
  process.exit(1);
} else {
  console.log('✅ All recipe ingredients have valid products in the database!');
  console.log('\nReady to implement recipe-to-cart functionality.');
}


