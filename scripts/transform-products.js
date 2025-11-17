const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Transform CSV product to app format
function transformProduct(csvProduct, index) {
  const id = `prod-${String(index + 1).padStart(4, '0')}`;
  const sku = csvProduct.MCODE || `SKU-${id}`;

  // Build name
  const name = csvProduct.Description || 'Unknown Product';

  // Category mapping
  const category = csvProduct.Category || 'Butchery';
  const subcategory = csvProduct.Subcategory || 'General';

  // Detect if CSV is misaligned (Best_Seller column missing)
  const isMisaligned = csvProduct.Best_Seller && csvProduct.Best_Seller.startsWith('http');

  // Corrected field mappings when misaligned (fields from Best_Seller onwards shift left by 1)
  let packSize, unit, storage, halal, actualBestSeller, basePrice, tier1Min, tier1Price, tier1Discount, tier2Min, tier2Price, tier2Discount, tier3Min, tier3Price, tier3Discount;
  if (isMisaligned) {
    // Fields before Best_Seller are correct
    packSize = csvProduct.Pack_Size || csvProduct.Case_Size || 'Variable';
    unit = csvProduct.Unit || 'per kg';
    storage = csvProduct.Storage || 'Chill';
    halal = csvProduct.Halal === 'Yes';
    actualBestSeller = 'No';  // Missing column

    // Fields from Best_Seller onwards are shifted left by 1
    // Best_Seller header reads image1 value, image1 reads image2, etc.
    // So we use the "next" field to get the correct value
    basePrice = parseFloat(csvProduct.image4) || 0;      // image4 header has base_price value
    tier1Min = parseInt(csvProduct.base_price) || 0;     // base_price header has tier1_min value
    tier1Price = parseFloat(csvProduct.tier1_min) || 0;  // tier1_min header has tier1_price value
    tier1Discount = parseInt(csvProduct.tier1_price) || 0;
    tier2Min = parseInt(csvProduct.tier1_discount) || 0;
    tier2Price = parseFloat(csvProduct.tier2_min) || 0;
    tier2Discount = parseInt(csvProduct.tier2_price) || 0;
    tier3Min = parseInt(csvProduct.tier2_discount) || 0;
    tier3Price = parseFloat(csvProduct.tier3_min) || 0;
    tier3Discount = parseInt(csvProduct.tier3_price) || 0;
  } else {
    // Columns are correctly aligned
    packSize = csvProduct.Pack_Size || csvProduct.Case_Size || 'Variable';
    unit = csvProduct.Unit || 'per kg';
    storage = csvProduct.Storage || 'Chill';
    halal = csvProduct.Halal === 'Yes';
    actualBestSeller = csvProduct.Best_Seller || 'No';
    basePrice = parseFloat(csvProduct.base_price) || 0;
    tier1Min = parseInt(csvProduct.tier1_min) || 0;
    tier1Price = parseFloat(csvProduct.tier1_price) || 0;
    tier1Discount = parseInt(csvProduct.tier1_discount) || 0;
    tier2Min = parseInt(csvProduct.tier2_min) || 0;
    tier2Price = parseFloat(csvProduct.tier2_price) || 0;
    tier2Discount = parseInt(csvProduct.tier2_discount) || 0;
    tier3Min = parseInt(csvProduct.tier3_min) || 0;
    tier3Price = parseFloat(csvProduct.tier3_price) || 0;
    tier3Discount = parseInt(csvProduct.tier3_discount) || 0;
  }

  // Build description features
  const features = [];
  if (csvProduct.Brand) features.push(`Brand: ${csvProduct.Brand}`);
  if (csvProduct.Origin) features.push(`Origin: ${csvProduct.Origin}`);
  if (csvProduct.Quality_Tier) features.push(`Quality: ${csvProduct.Quality_Tier}`);
  if (csvProduct.Aging_Method && csvProduct.Aging_Days) {
    features.push(`${csvProduct.Aging_Method} ${csvProduct.Aging_Days} days`);
  }
  if (csvProduct.Cut_Type) features.push(`Cut: ${csvProduct.Cut_Type}`);
  if (csvProduct.Processing) features.push(`Processing: ${csvProduct.Processing}`);
  if (halal) features.push('Halal Certified');
  if (storage) features.push(`Storage: ${storage}`);
  if (packSize) features.push(`Pack Size: ${packSize}`);

  // Build attributes array
  const attributes = [];
  if (csvProduct.Origin && csvProduct.Origin.toLowerCase().includes('british')) {
    attributes.push('british');
  }
  if (csvProduct.Quality_Tier === 'Premium') {
    attributes.push('premium');
  }
  if (csvProduct.Halal === 'Yes') {
    attributes.push('halal');
  }
  if (csvProduct.Aging_Method) {
    attributes.push('aged');
  }

  // Build bulk pricing (using corrected variables from earlier)
  const bulkPricing = [];

  if (tier1Min && tier1Price) {
    bulkPricing.push({
      min_quantity: tier1Min,
      price_per_unit: tier1Price,
      discount_percent: tier1Discount
    });
  }

  if (tier2Min && tier2Price) {
    bulkPricing.push({
      min_quantity: tier2Min,
      price_per_unit: tier2Price,
      discount_percent: tier2Discount
    });
  }

  if (tier3Min && tier3Price) {
    bulkPricing.push({
      min_quantity: tier3Min,
      price_per_unit: tier3Price,
      discount_percent: tier3Discount
    });
  }

  // Handle images (using isMisaligned from earlier)
  let imageFields = [];
  if (isMisaligned) {
    // Column shifted: Best_Seller contains image1, image1 contains image2, etc.
    imageFields = [
      csvProduct.Best_Seller,  // This is actually image1
      csvProduct.image1,       // This is actually image2
      csvProduct.image2,       // This is actually image3
      csvProduct.image3        // This is actually image4
    ];
  } else {
    // Columns are correct
    imageFields = [
      csvProduct.image1,
      csvProduct.image2,
      csvProduct.image3,
      csvProduct.image4
    ];
  }

  // Images
  const images = imageFields.filter(img => img && img.trim() && img !== '' && img.startsWith('http'));

  // Build inventory for single branch (Record format)
  const stockQuantity = Math.floor(Math.random() * 500) + 100;
  const stockLevel = actualBestSeller === 'Yes' ? 'high' : (stockQuantity > 200 ? 'medium' : 'low');

  const inventory = {
    "MAN001": {
      in_stock: stockQuantity > 0,
      stock_level: stockLevel,
      exact_count: stockQuantity,
      available_for_delivery: true,
      available_for_click_collect: true
    }
  };

  // Build rich description
  let longDesc = name;
  if (csvProduct.Brand) longDesc += ` by ${csvProduct.Brand}`;
  if (csvProduct.Quality_Tier === 'Premium') longDesc += '. Premium quality';
  if (csvProduct.Aging_Method && csvProduct.Aging_Days) {
    longDesc += `. ${csvProduct.Aging_Method} for ${csvProduct.Aging_Days} days`;
  }
  if (csvProduct.Origin) longDesc += `. Sourced from ${csvProduct.Origin}`;
  if (csvProduct.Halal === 'Yes') longDesc += '. Halal certified';
  longDesc += '.';

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
    images: images.length > 0 ? images : [
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80'
    ],
    base_price: basePrice,
    was_price: null,
    unit: unit,
    pack_size: packSize,
    bulk_pricing: bulkPricing,
    attributes: attributes,
    storage_info: storage,
    on_offer: false,
    best_seller: actualBestSeller === 'Yes',
    seasonal: false,
    active: true,
    created_at: new Date().toISOString(),
    inventory: inventory,
    recipes: [],
    // Additional butchery-specific fields
    origin: csvProduct.Origin || 'UK',
    quality_tier: csvProduct.Quality_Tier || 'Standard',
    aging_method: csvProduct.Aging_Method || null,
    aging_days: csvProduct.Aging_Days ? parseInt(csvProduct.Aging_Days) : null,
    dietary: csvProduct.Dietary || null,
    halal: halal,
    tags: [
      actualBestSeller === 'Yes' ? 'best-seller' : null,
      halal ? 'halal' : null,
      csvProduct.Quality_Tier === 'Premium' ? 'premium' : null
    ].filter(Boolean)
  };
}

// Main transformation
async function main() {
  console.log('🥩 Starting Butchery Product Transformation...\n');

  const csvPath = path.join(__dirname, '../src/data/products-with-pricing.csv');
  const outputPath = path.join(__dirname, '../src/data/products.json');

  console.log('📄 Reading CSV file...');

  const csvProducts = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        csvProducts.push(row);
      })
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });

  console.log(`✓ Found ${csvProducts.length} products\n`);

  console.log('🔄 Transforming products...');
  const transformedProducts = csvProducts.map((product, index) => {
    return transformProduct(product, index);
  });
  console.log(`✓ Transformed ${transformedProducts.length} products\n`);

  // Category breakdown
  const categoryCount = {};
  const subcategoryCount = {};
  const brandCount = {};

  transformedProducts.forEach(p => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    const subKey = `${p.category} > ${p.subcategory}`;
    subcategoryCount[subKey] = (subcategoryCount[subKey] || 0) + 1;
    brandCount[p.brand] = (brandCount[p.brand] || 0) + 1;
  });

  console.log('📊 Category Breakdown:');
  Object.keys(categoryCount).sort().forEach(cat => {
    console.log(`   ${cat}: ${categoryCount[cat]} products`);
  });

  console.log('\n🏷️  Top Brands:');
  Object.entries(brandCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([brand, count]) => {
      console.log(`   ${brand}: ${count} products`);
    });

  console.log('\n💾 Writing products.json...');
  fs.writeFileSync(outputPath, JSON.stringify(transformedProducts, null, 2));
  console.log(`✓ Saved to ${outputPath}\n`);

  // Stats
  const premiumCount = transformedProducts.filter(p => p.quality_tier === 'Premium').length;
  const halalCount = transformedProducts.filter(p => p.halal).length;
  const bestSellerCount = transformedProducts.filter(p => p.tags.includes('best-seller')).length;
  const agedCount = transformedProducts.filter(p => p.aging_method).length;

  console.log('📈 Product Stats:');
  console.log(`   Premium Quality: ${premiumCount}`);
  console.log(`   Halal Certified: ${halalCount}`);
  console.log(`   Best Sellers: ${bestSellerCount}`);
  console.log(`   Aged Products: ${agedCount}`);

  console.log('\n✅ Transformation complete!');
  console.log(`📦 Total products: ${transformedProducts.length}`);
}

main().catch(console.error);
