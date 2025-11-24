const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products.json');

console.log('🔍 Validating product weight information...');
console.log('📂 Reading products.json...');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log(`✅ Loaded ${products.length} products\n`);

// Function to parse weight from pack_size
function parseWeight(packSize) {
  if (!packSize || typeof packSize !== 'string') {
    return { hasWeight: false, weightKg: null, type: 'missing' };
  }

  const lower = packSize.toLowerCase().trim();
  
  // Check for "Per Kg" or variable weight
  if (lower.includes('per kg') || lower === 'variable') {
    return { hasWeight: false, weightKg: null, type: 'variable' };
  }
  
  // Try to extract kg
  const kgMatch = lower.match(/([\d.]+)\s*kg/);
  if (kgMatch) {
    return { hasWeight: true, weightKg: parseFloat(kgMatch[1]), type: 'fixed' };
  }
  
  // Try to extract grams
  const gMatch = lower.match(/([\d.]+)\s*g/);
  if (gMatch) {
    return { hasWeight: true, weightKg: parseFloat(gMatch[1]) / 1000, type: 'fixed' };
  }
  
  // Check for pieces/units (no weight)
  if (lower.includes('piece') || lower.includes('unit') || lower.includes('each')) {
    return { hasWeight: false, weightKg: null, type: 'count' };
  }
  
  return { hasWeight: false, weightKg: null, type: 'unparseable' };
}

const results = {
  total: products.length,
  hasFixedWeight: 0,
  variableWeight: 0,
  missingWeight: 0,
  unparseable: 0,
  countBased: 0,
  missingPackSize: 0
};

const issues = [];
let processed = 0;

console.log('🔄 Processing products...\n');

for (let i = 0; i < products.length; i++) {
  const product = products[i];
  processed++;
  
  // Progress indicator every 1000 products
  if (processed % 1000 === 0) {
    console.log(`  Processed ${processed}/${products.length}...`);
  }
  
  if (!product.pack_size) {
    results.missingPackSize++;
    if (issues.length < 50) {
      issues.push({
        sku: product.sku,
        name: product.name,
        issue: 'Missing pack_size field'
      });
    }
    continue;
  }

  const weightInfo = parseWeight(product.pack_size);
  
  if (weightInfo.type === 'fixed') {
    results.hasFixedWeight++;
  } else if (weightInfo.type === 'variable') {
    results.variableWeight++;
  } else if (weightInfo.type === 'count') {
    results.countBased++;
  } else if (weightInfo.type === 'unparseable') {
    results.unparseable++;
    if (issues.length < 50) {
      issues.push({
        sku: product.sku,
        name: product.name,
        pack_size: product.pack_size,
        issue: 'Unparseable pack_size format'
      });
    }
  } else {
    results.missingWeight++;
    if (issues.length < 50) {
      issues.push({
        sku: product.sku,
        name: product.name,
        pack_size: product.pack_size,
        issue: 'Missing weight information'
      });
    }
  }
}

console.log('\n📊 Results:\n');
console.log(`✅ Products with fixed weight (kg/g): ${results.hasFixedWeight}`);
console.log(`⚠️  Products with variable weight ("Per Kg"): ${results.variableWeight}`);
console.log(`📦 Products sold by count (pieces/units): ${results.countBased}`);
console.log(`❌ Products missing pack_size: ${results.missingPackSize}`);
console.log(`❌ Products with unparseable pack_size: ${results.unparseable}`);
console.log(`❌ Products missing weight info: ${results.missingWeight}\n`);

if (issues.length > 0) {
  const totalIssues = results.missingPackSize + results.unparseable + results.missingWeight;
  console.log(`\n⚠️  Found ${totalIssues} products with issues (showing first ${issues.length}):\n`);
  issues.forEach(issue => {
    console.log(`  • ${issue.sku} - ${issue.name}`);
    console.log(`    Pack Size: ${issue.pack_size || 'N/A'}`);
    console.log(`    Issue: ${issue.issue}\n`);
  });
  
  if (totalIssues > issues.length) {
    console.log(`  ... and ${totalIssues - issues.length} more issues\n`);
  }
}

// Summary for recipe-to-cart normalization
console.log('\n📋 Summary for Recipe-to-Cart Weight Normalization:\n');
console.log(`Total products: ${results.total}`);
console.log(`Products that can be normalized to weight: ${results.hasFixedWeight + results.variableWeight}`);
console.log(`Products that cannot be normalized (count-based): ${results.countBased}`);
console.log(`Products with issues: ${results.missingPackSize + results.unparseable + results.missingWeight}\n`);

if (results.missingPackSize + results.unparseable + results.missingWeight === 0) {
  console.log('✅ All products have weight information!');
} else {
  console.log('⚠️  Some products need weight information added before implementing weight normalization.');
}