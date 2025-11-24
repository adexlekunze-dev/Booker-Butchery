const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../src/data/category-recipes.ts');
const productsPath = path.join(__dirname, '../src/data/products.json');

// Read recipes file as text to preserve formatting
let recipesContent = fs.readFileSync(recipesPath, 'utf8');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Category images mapping
const categoryImages = {
  'BEEF': ['/Image/Beef/Image1.webp', '/Image/Beef/Image2.webp', '/Image/Beef/Image3.webp', '/Image/Beef/Image4.webp'],
  'PORK': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'LAMB': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'CHICKEN': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'SAUSAGES': ['https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80'],
  'BURGERS': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'ADDED VALUE': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'POULTRY & GAME': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'VEAL': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'MUTTON': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'EGGS & FATS': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'FISH': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
};

// Parse recipes to find ingredients without SKUs using a simpler line-by-line approach
const existingSkus = new Set(products.map(p => p.sku));
const ingredientsWithoutSku = [];

console.log('🔍 Finding ingredients without SKUs...\n');

// Process line by line to avoid performance issues
const lines = recipesContent.split('\n');
let lineNumber = 0;

for (const line of lines) {
  lineNumber++;
  
  // Look for ingredient lines that don't have "sku:" before "quantity:"
  // Pattern: { name: "...", quantity: ... (no sku: in between)
  if (line.includes('name:') && line.includes('quantity:') && !line.includes('sku:')) {
    // Extract name, quantity, unit, price, brand using simpler regex
    const nameMatch = line.match(/name:\s*"([^"]+)"/);
    const quantityMatch = line.match(/quantity:\s*([^,]+)/);
    const unitMatch = line.match(/unit:\s*"([^"]+)"/);
    const priceMatch = line.match(/price:\s*([^,}]+)/);
    const brandMatch = line.match(/brand:\s*"([^"]+)"/);
    
    if (nameMatch && quantityMatch && unitMatch) {
      const name = nameMatch[1];
      const quantity = quantityMatch[1].trim();
      const unit = unitMatch[1];
      const price = priceMatch ? parseFloat(priceMatch[1].trim()) : undefined;
      const brand = brandMatch ? brandMatch[1] : undefined;
      
      ingredientsWithoutSku.push({
        name,
        quantity,
        unit,
        price,
        brand,
        fullMatch: line.trim(),
        index: recipesContent.indexOf(line)
      });
    }
  }
}

console.log(`Found ${ingredientsWithoutSku.length} ingredients without SKUs\n`);

if (ingredientsWithoutSku.length === 0) {
  console.log('✅ All ingredients already have SKUs!');
  process.exit(0);
}

// Group by name to avoid duplicates
const ingredientMap = new Map();
ingredientsWithoutSku.forEach(ing => {
  const key = ing.name.toLowerCase().trim();
  if (!ingredientMap.has(key)) {
    ingredientMap.set(key, {
      name: ing.name.trim(),
      quantity: ing.quantity,
      unit: ing.unit,
      price: ing.price || 0,
      brand: ing.brand,
      matches: [ing]
    });
  } else {
    ingredientMap.get(key).matches.push(ing);
    // Use highest price
    if (ing.price && ing.price > ingredientMap.get(key).price) {
      ingredientMap.get(key).price = ing.price;
    }
  }
});

console.log(`Unique ingredients needing products: ${ingredientMap.size}\n`);

// Generate products for missing ingredients
const newProducts = [];
let maxId = 0;
products.forEach(p => {
  const num = parseInt(p.id.replace('prod-', ''));
  if (num > maxId) maxId = num;
});

let skuCounter = 1;
const skuMap = new Map();

ingredientMap.forEach((ingredient, key) => {
  maxId++;
  const productId = `prod-${String(maxId).padStart(4, '0')}`;
  
  // Determine category based on ingredient name
  let category = 'ADDED VALUE';
  const nameLower = ingredient.name.toLowerCase();
  
  if (nameLower.includes('beef') || nameLower.includes('steak') || nameLower.includes('fillet')) {
    category = 'BEEF';
  } else if (nameLower.includes('pork') || nameLower.includes('bacon')) {
    category = 'PORK';
  } else if (nameLower.includes('lamb')) {
    category = 'LAMB';
  } else if (nameLower.includes('chicken')) {
    category = 'CHICKEN';
  } else if (nameLower.includes('sausage')) {
    category = 'SAUSAGES';
  } else if (nameLower.includes('burger')) {
    category = 'BURGERS';
  } else if (nameLower.includes('egg')) {
    category = 'EGGS & FATS';
  } else if (nameLower.includes('fish') || nameLower.includes('salmon') || nameLower.includes('tuna')) {
    category = 'FISH';
  }
  
  // Generate SKU
  const categoryPrefix = category.replace(/[^A-Z]/g, '').substring(0, 3);
  const sku = `REC-${categoryPrefix}-${String(skuCounter).padStart(3, '0')}`;
  skuCounter++;
  
  skuMap.set(key, sku);
  
  // Extract pack size
  let packSize = `${ingredient.quantity} ${ingredient.unit}`;
  
  // Create product
  const product = {
    id: productId,
    sku: sku,
    name: ingredient.name,
    brand: ingredient.brand || 'Booker',
    category: category,
    subcategory: 'General',
    descriptions: {
      short: `${ingredient.name} by ${ingredient.brand || 'Booker'}`,
      long: `${ingredient.name} by ${ingredient.brand || 'Booker'}. Premium quality ingredient for your recipes.`,
      features: [
        `Brand: ${ingredient.brand || 'Booker'}`,
        `Category: ${category}`,
        `Pack Size: ${packSize}`
      ]
    },
    images: categoryImages[category] || categoryImages['ADDED VALUE'],
    base_price: ingredient.price || 0.99,
    was_price: null,
    unit: 'Chill',
    pack_size: packSize,
    bulk_pricing: [],
    attributes: [],
    storage_info: 'Chill',
    on_offer: false,
    best_seller: false,
    seasonal: false,
    active: true,
    created_at: new Date().toISOString(),
    inventory: {
      'MAN001': {
        in_stock: true,
        stock_level: 'high',
        exact_count: 1000,
        available_for_delivery: true,
        available_for_click_collect: true
      }
    },
    recipes: [],
    origin: 'UK',
    quality_tier: 'Standard',
    aging_method: null,
    aging_days: null,
    dietary: null,
    halal: false,
    tags: ['recipe-ingredient']
  };
  
  newProducts.push(product);
  console.log(`✅ Created product: ${sku} - ${ingredient.name} (${category})`);
  console.log(`   Price: £${product.base_price.toFixed(2)}, Pack: ${packSize}\n`);
});

// Add new products to products.json
products.push(...newProducts);
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
console.log(`\n📦 Added ${newProducts.length} new products to products.json\n`);

// Update recipes file with new SKUs
let updatedCount = 0;
ingredientMap.forEach((ingredient, key) => {
  const sku = skuMap.get(key);
  ingredient.matches.forEach(match => {
    // Replace the ingredient entry with one that includes SKU
    const oldPattern = match.fullMatch;
    const newPattern = oldPattern.replace(
      /name:\s*"([^"]+)",(?:\s*sku:\s*"[^"]+",)?/,
      `name: "${match.name}", sku: "${sku}",`
    );
    
    if (oldPattern !== newPattern) {
      recipesContent = recipesContent.replace(oldPattern, newPattern);
      updatedCount++;
    }
  });
});

fs.writeFileSync(recipesPath, recipesContent);
console.log(`📝 Updated ${updatedCount} recipe ingredients with new SKUs\n`);

console.log('✅ All recipe ingredients now have SKUs!');
console.log(`\nSummary:`);
console.log(`- Created ${newProducts.length} new products`);
console.log(`- Updated ${updatedCount} recipe ingredients`);
console.log(`- All ingredients can now be added to cart`);

