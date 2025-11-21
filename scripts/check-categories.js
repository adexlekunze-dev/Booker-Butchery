const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products.json');
const data = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const categories = [...new Set(data.map(p => p.category))].sort();
console.log('Categories in products.json:');
categories.forEach(c => console.log('  -', c));
console.log('\nTotal products:', data.length);

// Check specific SKUs
const testSkus = ['M165610', 'M296504', 'M959445', 'M885244', 'M068779', 'M289705', 'M292226'];
console.log('\nChecking specific SKUs:');
testSkus.forEach(sku => {
  const product = data.find(p => p.sku === sku);
  if (product) {
    console.log(`  ${sku}: Found - Category: ${product.category}, Subcategory: ${product.subcategory}`);
  } else {
    console.log(`  ${sku}: NOT FOUND`);
  }
});

