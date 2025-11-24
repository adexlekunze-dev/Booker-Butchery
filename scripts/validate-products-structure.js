const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log('=== PRODUCT STRUCTURE VALIDATION ===\n');

// 1. Basic counts
console.log('📊 BASIC COUNTS:');
console.log(`Total products: ${data.length}`);

// 2. Check for required fields
const requiredFields = ['id', 'sku', 'name', 'brand', 'category', 'active', 'inventory'];
const issues = [];
const missingFields = {};

data.forEach((p, i) => {
  requiredFields.forEach(field => {
    if (!(field in p)) {
      if (!missingFields[field]) missingFields[field] = [];
      missingFields[field].push({ index: i, sku: p.sku || 'NO SKU', name: p.name || 'NO NAME' });
    }
  });
  
  // Check active status
  if (p.active !== true) {
    issues.push({ type: 'not_active', index: i, sku: p.sku, name: p.name });
  }
  
  // Check inventory structure
  if (!p.inventory) {
    issues.push({ type: 'no_inventory', index: i, sku: p.sku, name: p.name });
  } else if (!p.inventory.MAN001) {
    issues.push({ type: 'no_MAN001', index: i, sku: p.sku, name: p.name, inventory_keys: Object.keys(p.inventory) });
  } else {
    const inv = p.inventory.MAN001;
    if (typeof inv.in_stock !== 'boolean') {
      issues.push({ type: 'invalid_in_stock', index: i, sku: p.sku, name: p.name });
    }
    if (!['high', 'medium', 'low', 'out'].includes(inv.stock_level)) {
      issues.push({ type: 'invalid_stock_level', index: i, sku: p.sku, name: p.name, stock_level: inv.stock_level });
    }
  }
  
  // Check category format
  if (p.category && p.category !== p.category.toUpperCase()) {
    issues.push({ type: 'lowercase_category', index: i, sku: p.sku, category: p.category });
  }
});

console.log(`\n✅ Active products: ${data.filter(p => p.active === true).length}`);
console.log(`❌ Inactive products: ${data.filter(p => p.active !== true).length}`);

// 3. Missing fields report
if (Object.keys(missingFields).length > 0) {
  console.log(`\n⚠️  MISSING REQUIRED FIELDS:`);
  Object.entries(missingFields).forEach(([field, products]) => {
    console.log(`  ${field}: ${products.length} products missing`);
    if (products.length <= 10) {
      products.forEach(p => console.log(`    - ${p.sku} | ${p.name}`));
    } else {
      console.log(`    - First 10:`);
      products.slice(0, 10).forEach(p => console.log(`      ${p.sku} | ${p.name}`));
      console.log(`    - ... and ${products.length - 10} more`);
    }
  });
} else {
  console.log(`\n✅ All products have required fields`);
}

// 4. Inventory issues
const inventoryIssues = issues.filter(i => i.type.startsWith('no_') || i.type.startsWith('invalid_'));
if (inventoryIssues.length > 0) {
  console.log(`\n⚠️  INVENTORY ISSUES: ${inventoryIssues.length}`);
  inventoryIssues.slice(0, 20).forEach(issue => {
    console.log(`  ${issue.type}: ${issue.sku} | ${issue.name}`);
    if (issue.inventory_keys) console.log(`    Has: ${issue.inventory_keys.join(', ')}`);
    if (issue.stock_level) console.log(`    Stock level: ${issue.stock_level}`);
  });
  if (inventoryIssues.length > 20) {
    console.log(`  ... and ${inventoryIssues.length - 20} more`);
  }
} else {
  console.log(`\n✅ All products have valid MAN001 inventory`);
}

// 5. Test getProducts logic
console.log(`\n🔍 TESTING getProducts() LOGIC:\n`);

// Simulate what getProducts does
let filtered = data.filter(p => p.active);
console.log(`After active filter: ${filtered.length}`);

// Test inventory mapping (what might be filtering products)
const productsWithAvailability = filtered.map(p => {
  const allInventories = Object.values(p.inventory || {});
  
  if (allInventories.length === 0) {
    return null; // This would cause issues
  }
  
  // Simulate aggregateInventory
  const inStockInventories = allInventories.filter(inv => inv.in_stock);
  const hasStock = inStockInventories.length > 0;
  
  if (!hasStock) {
    return { ...p, availability: { in_stock: false, stock_level: 'out' } };
  }
  
  return { ...p, availability: { in_stock: true, stock_level: 'medium' } };
});

const nullProducts = productsWithAvailability.filter(p => p === null);
if (nullProducts.length > 0) {
  console.log(`⚠️  ${nullProducts.length} products returned null during inventory mapping!`);
} else {
  console.log(`✅ All products mapped successfully`);
}

const finalCount = productsWithAvailability.filter(p => p !== null).length;
console.log(`Final product count: ${finalCount}`);

// 6. Category breakdown
console.log(`\n📂 CATEGORY BREAKDOWN:`);
const categoryCounts = {};
data.filter(p => p.active).forEach(p => {
  const cat = p.category || 'UNCATEGORIZED';
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
});

Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count} products`);
  });

// 7. Summary
console.log(`\n\n🎯 SUMMARY:`);
console.log(`Total products: ${data.length}`);
console.log(`Active products: ${data.filter(p => p.active).length}`);
console.log(`Products with MAN001: ${data.filter(p => p.inventory && p.inventory.MAN001).length}`);
console.log(`Issues found: ${issues.length}`);

if (issues.length === 0 && finalCount === 444) {
  console.log(`\n✅ ALL CHECKS PASSED - All 444 products should display!`);
  console.log(`\n💡 If you're still seeing 304, the issue is likely:`);
  console.log(`   1. Browser cache (clear localStorage and hard refresh)`);
  console.log(`   2. Vercel build cache (trigger a new deployment)`);
  console.log(`   3. A filter in the URL you're not seeing`);
} else {
  console.log(`\n⚠️  ISSUES DETECTED - These need to be fixed!`);
}

console.log('\n=== END OF VALIDATION ===\n');


