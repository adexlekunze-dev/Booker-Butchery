const fs = require('fs');
const path = require('path');

const categoryRecipesPath = path.join(__dirname, '../src/data/category-recipes.ts');
const productsPath = path.join(__dirname, '../src/data/products.json');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Read category-recipes.ts as text to preserve formatting
let categoryRecipesContent = fs.readFileSync(categoryRecipesPath, 'utf8');

// Build a map of product names to SKUs (case-insensitive)
const productMap = new Map();
products.forEach(p => {
  const nameLower = p.name.toLowerCase();
  productMap.set(nameLower, p.sku);
  
  // Also map common variations
  if (nameLower.includes('pork shoulder') && nameLower.includes('bone')) {
    productMap.set('pork shoulder (bone-in)', p.sku);
    productMap.set('pork shoulder bone-in', p.sku);
  }
  if (nameLower.includes('beef fillet') || nameLower.includes('roasting beef')) {
    productMap.set('beef fillet', p.sku);
  }
  if (nameLower.includes('chicken') && (nameLower.includes('thigh') || nameLower.includes('drumstick') || nameLower.includes('pieces'))) {
    productMap.set('chicken pieces', p.sku);
    productMap.set('chicken thighs & drumsticks', p.sku);
  }
  if (nameLower.includes('whole chicken')) {
    productMap.set('whole chicken', p.sku);
  }
  if (nameLower.includes('lamb rack') || nameLower.includes('rack of lamb')) {
    productMap.set('lamb rack', p.sku);
    productMap.set('lamb rack (french trimmed)', p.sku);
  }
});

// Also check for REC- products we created
const recProducts = products.filter(p => p.sku.startsWith('REC-'));
recProducts.forEach(p => {
  const nameLower = p.name.toLowerCase();
  if (nameLower.includes('puff pastry')) {
    productMap.set('puff pastry', p.sku);
  }
  if (nameLower.includes('chestnut mushroom')) {
    productMap.set('chestnut mushrooms', p.sku);
  }
  if (nameLower.includes('parma ham') || nameLower.includes('prosciutto')) {
    productMap.set('prosciutto', p.sku);
    productMap.set('parma ham', p.sku);
  }
});

// SKU mappings - direct replacements
const skuMappings = {
  'PORK-SHOULDER-5KG': 'M959650', // Pork Bone in Shoulder
  'BEEF-FILLET-2KG': 'M297834', // Beef fillet (Roasting Beef)
  'PASTRY-PUFF-3KG': 'REC-BEE-003', // Puff pastry
  'MUSHROOM-CHEST-1KG': 'REC-CHI-027', // Chestnut mushrooms
  'PROSCIUTTO-500G': 'REC-BEE-004', // Parma ham
  'CHICKEN-PIECES-10KG': null, // Need to find
  'LAMB-RACK-FRENCH': null, // Need to find
  'CHICKEN-WHOLE-1-5KG': null, // Need to find
};

// Find missing products
console.log('🔍 Searching for missing products...\n');

// Find chicken pieces
const chickenPieces = products.find(p => 
  p.category === 'CHICKEN' && 
  (p.name.toLowerCase().includes('thigh') || 
   p.name.toLowerCase().includes('drumstick') ||
   p.name.toLowerCase().includes('pieces'))
);
if (chickenPieces) {
  skuMappings['CHICKEN-PIECES-10KG'] = chickenPieces.sku;
  console.log(`✅ Found chicken pieces: ${chickenPieces.sku} - ${chickenPieces.name}`);
}

// Find whole chicken
const wholeChicken = products.find(p => 
  p.category === 'CHICKEN' && 
  p.name.toLowerCase().includes('whole')
);
if (wholeChicken) {
  skuMappings['CHICKEN-WHOLE-1-5KG'] = wholeChicken.sku;
  console.log(`✅ Found whole chicken: ${wholeChicken.sku} - ${wholeChicken.name}`);
}

// Find lamb rack
const lambRack = products.find(p => 
  p.category === 'LAMB' && 
  (p.name.toLowerCase().includes('rack') || p.subcategory.toLowerCase().includes('rack'))
);
if (lambRack) {
  skuMappings['LAMB-RACK-FRENCH'] = lambRack.sku;
  console.log(`✅ Found lamb rack: ${lambRack.sku} - ${lambRack.name}`);
}

console.log('\n📝 SKU Mappings:');
Object.entries(skuMappings).forEach(([oldSku, newSku]) => {
  if (newSku) {
    console.log(`  ${oldSku} → ${newSku}`);
  } else {
    console.log(`  ⚠️  ${oldSku} → NOT FOUND`);
  }
});

// Replace SKUs in category-recipes.ts
let updated = false;
let replacementCount = 0;

Object.entries(skuMappings).forEach(([oldSku, newSku]) => {
  if (newSku) {
    const regex = new RegExp(`"sku":\\s*"${oldSku.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    const matches = categoryRecipesContent.match(regex);
    if (matches) {
      categoryRecipesContent = categoryRecipesContent.replace(regex, `"sku": "${newSku}"`);
      replacementCount += matches.length;
      updated = true;
      console.log(`\n✅ Replaced ${matches.length} occurrence(s) of ${oldSku} with ${newSku}`);
    }
  }
});

if (updated) {
  fs.writeFileSync(categoryRecipesPath, categoryRecipesContent);
  console.log(`\n✅ Updated category-recipes.ts with ${replacementCount} SKU replacement(s)`);
} else {
  console.log('\n⚠️  No SKUs were replaced. Check if the SKUs exist in the file.');
}


