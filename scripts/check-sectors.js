const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🔍 Checking product sectors...\n');

  // Read products.json
  const productsPath = path.join(__dirname, '../src/data/products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  console.log(`✓ Found ${products.length} total products\n`);

  // Check products with sectors field
  const productsWithSectors = products.filter(p => p.sectors && Array.isArray(p.sectors) && p.sectors.length > 0);
  const productsWithoutSectors = products.filter(p => !p.sectors || !Array.isArray(p.sectors) || p.sectors.length === 0);

  console.log(`📊 Products with sectors: ${productsWithSectors.length}`);
  console.log(`⚠️  Products without sectors: ${productsWithoutSectors.length}\n`);

  if (productsWithoutSectors.length > 0) {
    console.log('📋 Products without sectors (first 20):');
    productsWithoutSectors.slice(0, 20).forEach(p => {
      console.log(`   - ${p.sku}: ${p.name} (${p.category})`);
    });
    if (productsWithoutSectors.length > 20) {
      console.log(`   ... and ${productsWithoutSectors.length - 20} more`);
    }
    console.log('');
  }

  // Check what sectors exist
  const allSectors = new Set();
  products.forEach(p => {
    if (p.sectors && Array.isArray(p.sectors)) {
      p.sectors.forEach(s => allSectors.add(s));
    }
  });

  console.log('📊 Unique Sectors Found:');
  Array.from(allSectors).sort().forEach(sector => {
    const count = products.filter(p => p.sectors && p.sectors.includes(sector)).length;
    console.log(`   ${sector}: ${count} products`);
  });
  console.log('');

  // Check if "butchery" sector exists
  const butcheryProducts = products.filter(p => 
    p.sectors && Array.isArray(p.sectors) && p.sectors.some(s => s.toLowerCase().includes('butchery'))
  );
  console.log(`🥩 Products with "butchery" in sectors: ${butcheryProducts.length}\n`);

  // Summary
  console.log('📈 Summary:');
  console.log(`   Total products: ${products.length}`);
  console.log(`   Products with sectors: ${productsWithSectors.length}`);
  console.log(`   Products without sectors: ${productsWithoutSectors.length}`);
}

main().catch(console.error);

