const fs = require('fs');
const path = require('path');

// This script helps update recipe SKUs based on validation results
// Usage: node scripts/update-recipe-skus.js [--dry-run]

const recipesPath = path.join(__dirname, '../src/data/recipes.json');
const productsPath = path.join(__dirname, '../src/data/products.json');
const reportPath = path.join(__dirname, '../recipe-sku-validation-report.json');

const isDryRun = process.argv.includes('--dry-run');

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Create a map of all valid SKUs
const validSkus = new Set(products.filter(p => p.active).map(p => p.sku));
const skuToProduct = new Map();
products.filter(p => p.active).forEach(p => {
  skuToProduct.set(p.sku, p);
});

// Load validation report if it exists
let suggestions = [];
if (fs.existsSync(reportPath)) {
  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
  suggestions = report.suggestions || [];
}

console.log('🔄 Recipe SKU Update Tool\n');

let updatedCount = 0;
let removedCount = 0;

recipes.forEach(recipe => {
  if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) return;
  
  recipe.ingredients.forEach(ingredient => {
    if (!ingredient.sku) return;
    
    // Check if SKU is invalid
    if (!validSkus.has(ingredient.sku)) {
      // Try to find a suggestion for this ingredient
      const suggestion = suggestions.find(s => 
        s.recipe === (recipe.title || recipe.slug) && 
        s.ingredient === ingredient.name &&
        s.invalidSku === ingredient.sku
      );
      
      if (suggestion && suggestion.suggestions.length > 0) {
        // Use the first suggested SKU
        const newSku = suggestion.suggestions[0].sku;
        console.log(`📝 Recipe: "${recipe.title || recipe.slug}"`);
        console.log(`   Ingredient: "${ingredient.name}"`);
        console.log(`   Old SKU: "${ingredient.sku}" → New SKU: "${newSku}"`);
        console.log(`   Product: ${suggestion.suggestions[0].name}\n`);
        
        if (!isDryRun) {
          ingredient.sku = newSku;
        }
        updatedCount++;
      } else {
        // No suggestion found, set SKU to null
        console.log(`⚠️  Recipe: "${recipe.title || recipe.slug}"`);
        console.log(`   Ingredient: "${ingredient.name}"`);
        console.log(`   Removing invalid SKU: "${ingredient.sku}" (no replacement found)\n`);
        
        if (!isDryRun) {
          ingredient.sku = null;
        }
        removedCount++;
      }
    }
  });
});

if (isDryRun) {
  console.log(`\n🔍 DRY RUN MODE - No changes made`);
  console.log(`   Would update: ${updatedCount} SKUs`);
  console.log(`   Would remove: ${removedCount} SKUs`);
  console.log(`\n   Run without --dry-run to apply changes\n`);
} else if (updatedCount > 0 || removedCount > 0) {
  fs.writeFileSync(recipesPath, JSON.stringify(recipes, null, 2));
  console.log(`\n✅ Updated recipes.json`);
  console.log(`   Updated: ${updatedCount} SKUs`);
  console.log(`   Removed: ${removedCount} SKUs\n`);
} else {
  console.log(`\n✅ No updates needed - all SKUs are valid!\n`);
}


