const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🔍 Checking product active status...\n');

  // Read products.json
  const productsPath = path.join(__dirname, '../src/data/products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  console.log(`✓ Found ${products.length} total products\n`);

  // Count active vs inactive
  const activeProducts = products.filter(p => p.active === true);
  const inactiveProducts = products.filter(p => p.active === false || p.active === undefined);

  console.log(`📊 Current Status:`);
  console.log(`   Active: ${activeProducts.length}`);
  console.log(`   Inactive: ${inactiveProducts.length}`);
  console.log(`   Total: ${products.length}\n`);

  if (inactiveProducts.length === 0) {
    console.log('✅ All products are already active!');
    return;
  }

  // Show breakdown by category
  console.log('📋 Inactive Products by Category:');
  const inactiveByCategory = {};
  inactiveProducts.forEach(p => {
    const cat = p.category || 'Unknown';
    inactiveByCategory[cat] = (inactiveByCategory[cat] || 0) + 1;
  });
  Object.entries(inactiveByCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });
  console.log('');

  // Update all inactive products to active
  console.log('🔄 Activating all products...');
  let updated = 0;
  products.forEach(product => {
    if (product.active === false || product.active === undefined) {
      product.active = true;
      updated++;
    }
  });

  // Write updated products
  if (updated > 0) {
    console.log(`💾 Writing ${updated} updated products to products.json...`);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    
    console.log(`\n✅ Successfully activated ${updated} products!`);
    console.log(`📦 Total active products: ${products.length}`);
  } else {
    console.log('✓ No products needed activation');
  }
}

main().catch(console.error);

