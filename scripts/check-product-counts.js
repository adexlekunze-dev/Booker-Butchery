const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🔍 Analyzing product counts...\n');

  // Read products.json
  const productsPath = path.join(__dirname, '../src/data/products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  console.log(`✓ Found ${products.length} total products\n`);

  // Count active products
  const activeProducts = products.filter(p => p.active === true);
  console.log(`📊 Active Products: ${activeProducts.length}\n`);

  // Check products with missing inventory
  const productsWithInventory = products.filter(p => {
    const inventory = p.inventory || {};
    return Object.keys(inventory).length > 0;
  });
  const productsWithoutInventory = products.filter(p => {
    const inventory = p.inventory || {};
    return Object.keys(inventory).length === 0;
  });

  console.log(`📦 Products with inventory data: ${productsWithInventory.length}`);
  console.log(`⚠️  Products without inventory data: ${productsWithoutInventory.length}\n`);

  if (productsWithoutInventory.length > 0) {
    console.log('📋 Products without inventory (first 10):');
    productsWithoutInventory.slice(0, 10).forEach(p => {
      console.log(`   - ${p.sku}: ${p.name} (${p.category})`);
    });
    if (productsWithoutInventory.length > 10) {
      console.log(`   ... and ${productsWithoutInventory.length - 10} more`);
    }
    console.log('');
  }

  // Check products by category
  console.log('📊 Products by Category:');
  const byCategory = {};
  activeProducts.forEach(p => {
    const cat = p.category || 'Unknown';
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  });
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });
  console.log('');

  // Check if products have MAN001 inventory (default branch)
  const productsWithMAN001 = activeProducts.filter(p => {
    return p.inventory && p.inventory['MAN001'];
  });
  console.log(`🏢 Products with MAN001 inventory: ${productsWithMAN001.length}`);
  console.log(`⚠️  Products without MAN001 inventory: ${activeProducts.length - productsWithMAN001.length}\n`);

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total products: ${products.length}`);
  console.log(`   Active products: ${activeProducts.length}`);
  console.log(`   Products with inventory: ${productsWithInventory.length}`);
  console.log(`   Products with MAN001: ${productsWithMAN001.length}`);
}

main().catch(console.error);

