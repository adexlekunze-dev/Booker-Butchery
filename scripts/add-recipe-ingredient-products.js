const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../src/data/recipes.json');
const productsPath = path.join(__dirname, '../src/data/products.json');

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Category images mapping (reuse existing category images)
const categoryImages = {
  'BEEF': ['/Image/Beef/Image1.webp', '/Image/Beef/Image2.webp', '/Image/Beef/Image3.webp', '/Image/Beef/Image4.webp'],
  'PORK': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'LAMB': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'CHICKEN': ['https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800'],
  'SAUSAGES': ['https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80'],
  'BURGERS': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
  'ADDED VALUE': ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800', 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800'],
};

// Extract all ingredients with null SKUs
const ingredientsNeedingProducts = [];
const ingredientMap = new Map(); // To track unique ingredients by name

recipes.forEach(recipe => {
  if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) return;
  
  recipe.ingredients.forEach(ingredient => {
    if (ingredient.sku === null || ingredient.sku === undefined) {
      const name = ingredient.name.trim();
      
      // Group by ingredient name (case-insensitive)
      const key = name.toLowerCase();
      if (!ingredientMap.has(key)) {
        ingredientMap.set(key, {
          name: name,
          recipeCategory: recipe.category,
          quantity: ingredient.quantity,
          price: ingredient.price || 0,
          notes: ingredient.notes,
          recipes: [recipe.title || recipe.slug]
        });
      } else {
        // Add recipe to list if not already there
        const existing = ingredientMap.get(key);
        if (!existing.recipes.includes(recipe.title || recipe.slug)) {
          existing.recipes.push(recipe.title || recipe.slug);
        }
        // Use highest price if multiple
        if (ingredient.price && ingredient.price > existing.price) {
          existing.price = ingredient.price;
        }
      }
    }
  });
});

console.log('🔍 Analyzing Recipe Ingredients...\n');
console.log(`Total recipes: ${recipes.length}`);
console.log(`Ingredients needing products: ${ingredientMap.size}\n`);

// Find max product ID
let maxId = 0;
products.forEach(p => {
  const match = p.id.match(/prod-(\d+)/);
  if (match) {
    const num = parseInt(match[1], 10);
    if (num > maxId) maxId = num;
  }
});

// Generate products for each unique ingredient
const newProducts = [];
const skuMap = new Map(); // Map ingredient name to SKU

let skuCounter = 1;

ingredientMap.forEach((ingredient, key) => {
  maxId++;
  const productId = `prod-${String(maxId).padStart(4, '0')}`;
  
  // Determine category - most non-meat items go to ADDED VALUE
  let category = 'ADDED VALUE';
  const nameLower = ingredient.name.toLowerCase();
  
  // Check if it's a meat product based on name
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
  } else {
    // Use recipe category as fallback for non-meat items
    category = ingredient.recipeCategory || 'ADDED VALUE';
  }
  
  // Generate SKU
  const categoryPrefix = category.replace(/[^A-Z]/g, '').substring(0, 3);
  const sku = `REC-${categoryPrefix}-${String(skuCounter).padStart(3, '0')}`;
  skuCounter++;
  
  skuMap.set(key, sku);
  
  // Extract pack size from quantity if possible
  let packSize = ingredient.quantity || '1 unit';
  // Clean up pack size
  if (packSize.includes('kg')) {
    packSize = packSize;
  } else if (packSize.includes('g')) {
    packSize = packSize;
  } else if (packSize.includes('ml')) {
    packSize = packSize;
  } else if (packSize.includes('tbsp') || packSize.includes('tsp')) {
    packSize = packSize;
  } else {
    packSize = packSize;
  }
  
  // Generate product
  const product = {
    id: productId,
    sku: sku,
    name: ingredient.name,
    brand: 'Booker',
    category: category,
    subcategory: 'General',
    descriptions: {
      short: ingredient.name.toLowerCase(),
      long: `${ingredient.name} by Booker. ${ingredient.notes || 'Premium quality ingredient for your recipes.'}`,
      features: [
        `Brand: Booker`,
        `Category: ${category}`,
        ingredient.notes ? `Notes: ${ingredient.notes}` : null,
        `Pack Size: ${packSize}`
      ].filter(Boolean)
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
  console.log(`   Price: £${product.base_price.toFixed(2)}, Pack: ${packSize}`);
  console.log(`   Used in: ${ingredient.recipes.join(', ')}\n`);
});

// Add new products to products array
products.push(...newProducts);

// Write updated products
fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));

console.log(`\n📦 Added ${newProducts.length} new products to products.json\n`);

// Now update recipes.json with new SKUs
let updatedRecipes = 0;
let updatedIngredients = 0;

recipes.forEach(recipe => {
  if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) return;
  
  let recipeUpdated = false;
  recipe.ingredients.forEach(ingredient => {
    if (ingredient.sku === null || ingredient.sku === undefined) {
      const key = ingredient.name.trim().toLowerCase();
      const newSku = skuMap.get(key);
      
      if (newSku) {
        ingredient.sku = newSku;
        recipeUpdated = true;
        updatedIngredients++;
      }
    }
  });
  
  if (recipeUpdated) {
    updatedRecipes++;
  }
});

// Write updated recipes
fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));

console.log(`📝 Updated recipes.json:`);
console.log(`   Recipes updated: ${updatedRecipes}`);
console.log(`   Ingredients updated: ${updatedIngredients}\n`);

console.log('✅ Recipe-to-cart functionality is now ready for testing!\n');


