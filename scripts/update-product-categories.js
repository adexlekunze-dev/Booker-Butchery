const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// SKU to correct category mapping from complete catalog
async function getCategoryMapping() {
  const csvPath = path.join(__dirname, '../complete_butchery_catalog_with_images.csv');
  const mapping = {};
  
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.MCODE) {
          mapping[row.MCODE] = {
            category: row.Category,
            subcategory: row.Subcategory || ''
          };
        }
      })
      .on('end', () => resolve())
      .on('error', (error) => reject(error));
  });
  
  return mapping;
}

async function main() {
  console.log('🔄 Updating product categories in products.json...\n');

  // Read existing products.json
  const productsPath = path.join(__dirname, '../src/data/products.json');
  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  
  console.log(`✓ Found ${products.length} products\n`);

  // Get correct category mapping from CSV
  console.log('📖 Reading category mapping from complete catalog...');
  const categoryMapping = await getCategoryMapping();
  console.log(`✓ Loaded ${Object.keys(categoryMapping).length} SKU mappings\n`);

  // Track updates
  let updated = 0;
  let notFound = 0;
  const categoryChanges = {};

  // Update products with correct categories
  products.forEach(product => {
    const correctMapping = categoryMapping[product.sku];
    if (correctMapping) {
      const oldCategory = product.category;
      const newCategory = correctMapping.category;
      
      if (oldCategory !== newCategory) {
        product.category = newCategory;
        if (correctMapping.subcategory) {
          product.subcategory = correctMapping.subcategory;
        }
        updated++;
        
        const key = `${oldCategory} → ${newCategory}`;
        categoryChanges[key] = (categoryChanges[key] || 0) + 1;
      }
    } else {
      notFound++;
    }
  });

  // Write updated products
  if (updated > 0) {
    console.log(`💾 Writing ${updated} updated products...`);
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
    
    console.log(`\n✅ Successfully updated ${updated} products!`);
    console.log('\n📊 Category Changes:');
    Object.entries(categoryChanges).forEach(([change, count]) => {
      console.log(`   ${change}: ${count} products`);
    });
  } else {
    console.log('✓ No category updates needed');
  }
  
  if (notFound > 0) {
    console.log(`\n⚠️  ${notFound} products not found in complete catalog (may be from different source)`);
  }
}

main().catch(console.error);

