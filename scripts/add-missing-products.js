const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Reuse transform logic
function transformProduct(csvProduct, index, startId) {
  const id = `prod-${String(startId + index).padStart(4, '0')}`;
  const sku = csvProduct.MCODE || `SKU-${id}`;
  const name = csvProduct.Description || 'Unknown Product';
  const category = csvProduct.Category || 'Butchery';
  const subcategory = csvProduct.Subcategory || 'General';

  // Generate default pricing based on category
  const qualityTier = csvProduct.Quality_Tier || 'Standard';
  const basePrice = generateDefaultPrice(category, subcategory, qualityTier, csvProduct.Pack_Size);
  const bulkPricing = generateDefaultBulkPricing(basePrice);

  // Build features
  const features = [];
  if (csvProduct.Brand) features.push(`Brand: ${csvProduct.Brand}`);
  if (csvProduct.Origin) features.push(`Origin: ${csvProduct.Origin}`);
  if (csvProduct.Quality_Tier) features.push(`Quality: ${csvProduct.Quality_Tier}`);
  if (csvProduct.Cut_Type) features.push(`Cut: ${csvProduct.Cut_Type}`);
  if (csvProduct.Processing) features.push(`Processing: ${csvProduct.Processing}`);
  const halal = csvProduct.Halal === 'Yes';
  if (halal) features.push('Halal Certified');
  if (csvProduct.Storage) features.push(`Storage: ${csvProduct.Storage}`);
  if (csvProduct.Pack_Size) features.push(`Pack Size: ${csvProduct.Pack_Size}`);

  // Build attributes
  const attributes = [];
  if (csvProduct.Origin && csvProduct.Origin.toLowerCase().includes('british')) {
    attributes.push('british');
  }
  if (csvProduct.Quality_Tier === 'Premium') {
    attributes.push('premium');
  }
  if (halal) {
    attributes.push('halal');
  }

  // Handle images
  const images = [
    csvProduct.image1,
    csvProduct.image2,
    csvProduct.image3,
    csvProduct.image4
  ].filter(img => img && img.trim() && img.startsWith('http'));

  if (images.length === 0) {
    images.push('https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80');
  }

  // Build inventory
  const stockQuantity = Math.floor(Math.random() * 500) + 100;
  const actualBestSeller = csvProduct.Best_Seller === 'Yes';
  const stockLevel = actualBestSeller ? 'high' : (stockQuantity > 200 ? 'medium' : 'low');

  const inventory = {
    "MAN001": {
      in_stock: stockQuantity > 0,
      stock_level: stockLevel,
      exact_count: stockQuantity,
      available_for_delivery: true,
      available_for_click_collect: true
    }
  };

  // Build long description
  let longDesc = name;
  if (csvProduct.Brand) longDesc += ` by ${csvProduct.Brand}`;
  if (csvProduct.Quality_Tier === 'Premium') longDesc += '. Premium quality';
  if (csvProduct.Origin) longDesc += `. Sourced from ${csvProduct.Origin}`;
  if (halal) longDesc += '. Halal certified';
  longDesc += '.';

  const packSize = csvProduct.Pack_Size || csvProduct.Case_Size || 'Variable';
  const unit = csvProduct.Unit || 'per kg';
  const storage = csvProduct.Storage || 'Chill';

  return {
    id,
    sku,
    name,
    brand: csvProduct.Brand || 'Booker',
    category: category,
    subcategory: subcategory,
    descriptions: {
      short: name.toLowerCase(),
      long: longDesc,
      features: features
    },
    images: images,
    base_price: basePrice,
    was_price: null,
    unit: unit,
    pack_size: packSize,
    bulk_pricing: bulkPricing,
    attributes: attributes,
    storage_info: storage,
    on_offer: false,
    best_seller: actualBestSeller,
    seasonal: false,
    active: true,
    created_at: new Date().toISOString(),
    inventory: inventory,
    recipes: [],
    origin: csvProduct.Origin || 'UK',
    quality_tier: csvProduct.Quality_Tier || 'Standard',
    aging_method: csvProduct.Aging_Method || null,
    aging_days: csvProduct.Aging_Days ? parseInt(csvProduct.Aging_Days) : null,
    dietary: csvProduct.Dietary || null,
    halal: halal,
    tags: [
      actualBestSeller ? 'best-seller' : null,
      halal ? 'halal' : null,
      csvProduct.Quality_Tier === 'Premium' ? 'premium' : null
    ].filter(Boolean)
  };
}

// Generate default pricing by category
function generateDefaultPrice(category, subcategory, qualityTier, packSize) {
  const priceMap = {
    'POULTRY & GAME': {
      'Duck Breast': qualityTier === 'Premium' ? 18.99 : 14.99,
      'Duck Leg': qualityTier === 'Premium' ? 12.99 : 9.99,
      'Duck Whole Birds': qualityTier === 'Premium' ? 24.99 : 19.99,
      'Turkey Breast': qualityTier === 'Premium' ? 16.99 : 12.99,
      'Game Venison': 22.99,
      'Game Guinea Fowl': 19.99,
      'Game Rabbit': 15.99,
      'Game Goat': qualityTier === 'Premium' ? 18.99 : 14.99,
    },
    'VEAL': {
      'default': qualityTier === 'Premium' ? 24.99 : 19.99,
    },
    'MUTTON': {
      'default': qualityTier === 'Premium' ? 16.99 : 12.99,
    },
    'ADDED VALUE': {
      'Cooked': 12.99,
      'Black Pudding': 8.99,
      'Haggis': 9.99,
      'Kebabs': 11.99,
    },
    'EGGS & FATS': {
      'Fats': qualityTier === 'Premium' ? 15.99 : 12.99,
      'Eggs': 4.99, // per dozen equivalent
    },
    'FISH': {
      'default': qualityTier === 'Premium' ? 18.99 : 14.99,
    }
  };

  const categoryPrices = priceMap[category];
  if (!categoryPrices) return qualityTier === 'Premium' ? 20.99 : 15.99;

  const subcatPrice = categoryPrices[subcategory] || categoryPrices['default'];
  return subcatPrice || (qualityTier === 'Premium' ? 20.99 : 15.99);
}

// Generate default bulk pricing tiers
function generateDefaultBulkPricing(basePrice) {
  return [
    {
      min_quantity: 5,
      price_per_unit: basePrice * 0.95,
      discount_percent: 5
    },
    {
      min_quantity: 10,
      price_per_unit: basePrice * 0.90,
      discount_percent: 10
    },
    {
      min_quantity: 20,
      price_per_unit: basePrice * 0.85,
      discount_percent: 15
    }
  ];
}

async function main() {
  console.log('🦆 Adding ALL missing products to products.json...\n');

  // Read existing products.json
  const productsPath = path.join(__dirname, '../src/data/products.json');
  const existingProducts = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  
  // Find highest ID
  const maxId = existingProducts.reduce((max, p) => {
    const idNum = parseInt(p.id.replace('prod-', ''));
    return idNum > max ? idNum : max;
  }, 0);
  
  console.log(`✓ Found ${existingProducts.length} existing products`);
  console.log(`✓ Next product ID will start at: prod-${String(maxId + 1).padStart(4, '0')}\n`);

  // Get existing SKUs to avoid duplicates
  const existingSkus = new Set(existingProducts.map(p => p.sku));
  const existingCategories = new Set(existingProducts.map(p => p.category));

  // Missing categories to add
  const missingCategories = [
    'POULTRY & GAME',
    'VEAL',
    'MUTTON',
    'ADDED VALUE',
    'EGGS & FATS',
    'FISH'
  ];

  console.log('📋 Missing categories to add:');
  missingCategories.forEach(cat => {
    const exists = existingCategories.has(cat);
    console.log(`   ${exists ? '✓' : '✗'} ${cat}`);
  });
  console.log('');

  // Read CSV and filter for missing categories
  const csvPath = path.join(__dirname, '../complete_butchery_catalog_with_images.csv');
  const csvProducts = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        if (missingCategories.includes(row.Category)) {
          csvProducts.push(row);
        }
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  console.log(`✓ Found ${csvProducts.length} products in CSV for missing categories\n`);

  // Group by category for reporting
  const byCategory = {};
  csvProducts.forEach(p => {
    if (!byCategory[p.Category]) byCategory[p.Category] = [];
    byCategory[p.Category].push(p);
  });

  console.log('📊 Products by category:');
  Object.entries(byCategory).forEach(([cat, products]) => {
    console.log(`   ${cat}: ${products.length} products`);
  });
  console.log('');

  // Transform CSV products to JSON structure
  console.log('🔄 Transforming products...');
  const newProducts = csvProducts.map((product, index) => {
    return transformProduct(product, index, maxId + 1);
  });

  // Check for duplicates by SKU and update categories if needed
  let categoryUpdates = 0;
  const productsToAdd = [];
  
  newProducts.forEach(newProduct => {
    const existingIndex = existingProducts.findIndex(ep => ep.sku === newProduct.sku);
    
    if (existingIndex !== -1) {
      // Product exists - check if category needs update
      const existing = existingProducts[existingIndex];
      if (existing.category !== newProduct.category || existing.subcategory !== newProduct.subcategory) {
        console.log(`   Updating ${newProduct.sku}: ${existing.category} → ${newProduct.category}`);
        existingProducts[existingIndex].category = newProduct.category;
        existingProducts[existingIndex].subcategory = newProduct.subcategory;
        categoryUpdates++;
      }
    } else {
      // Product doesn't exist - add it
      productsToAdd.push(newProduct);
    }
  });
  
  if (categoryUpdates > 0) {
    console.log(`\n✓ Updated categories for ${categoryUpdates} existing products`);
  }

  if (productsToAdd.length === 0 && categoryUpdates === 0) {
    console.log('✓ All products already exist in products.json with correct categories');
    return;
  }

  // Add new products to existing array (existingProducts already updated if needed)
  const updatedProducts = [...existingProducts, ...productsToAdd];

  // Write back to file
  console.log(`💾 Writing ${productsToAdd.length} new products to products.json...`);
  fs.writeFileSync(productsPath, JSON.stringify(updatedProducts, null, 2));
  
  console.log(`\n✅ Successfully added ${productsToAdd.length} products!`);
  console.log(`📦 Total products: ${updatedProducts.length}`);
  
  // Show summary by category
  console.log('\n📊 Added Products Summary:');
  const categoryCount = {};
  productsToAdd.forEach(p => {
    const key = `${p.category} > ${p.subcategory}`;
    categoryCount[key] = (categoryCount[key] || 0) + 1;
  });
  Object.entries(categoryCount)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([key, count]) => {
      console.log(`   ${key}: ${count} products`);
    });
}

main().catch(console.error);

