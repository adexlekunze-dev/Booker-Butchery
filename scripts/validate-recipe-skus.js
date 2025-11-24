const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, '../src/data/recipes.json');
const productsPath = path.join(__dirname, '../src/data/products.json');

const recipes = JSON.parse(fs.readFileSync(recipesPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Create a map of all valid SKUs
const validSkus = new Set(products.filter(p => p.active).map(p => p.sku));
const skuToProduct = new Map();
products.filter(p => p.active).forEach(p => {
  skuToProduct.set(p.sku, p);
});

console.log('🔍 Validating Recipe SKUs...\n');
console.log(`Total recipes: ${recipes.length}`);
console.log(`Total active products: ${validSkus.size}\n`);

const issues = [];
const validIngredients = [];
const suggestions = [];

recipes.forEach(recipe => {
  if (!recipe.ingredients || !Array.isArray(recipe.ingredients)) return;
  
  recipe.ingredients.forEach(ingredient => {
    if (!ingredient.sku) return; // Skip ingredients without SKU
    
    if (!validSkus.has(ingredient.sku)) {
      issues.push({
        recipe: recipe.title || recipe.slug,
        ingredient: ingredient.name,
        sku: ingredient.sku,
        quantity: ingredient.quantity
      });
      
      // Try to find a matching product by name
      const nameLower = ingredient.name.toLowerCase();
      const possibleMatches = products.filter(p => {
        if (!p.active) return false;
        const productName = p.name.toLowerCase();
        const productCategory = p.category?.toLowerCase() || '';
        
        // Check if ingredient name contains key words from product name
        const ingredientWords = nameLower.split(/\s+/).filter(w => w.length > 3);
        const matches = ingredientWords.some(word => 
          productName.includes(word) || productCategory.includes(word)
        );
        
        return matches;
      }).slice(0, 3); // Get top 3 matches
      
      if (possibleMatches.length > 0) {
        suggestions.push({
          recipe: recipe.title || recipe.slug,
          ingredient: ingredient.name,
          invalidSku: ingredient.sku,
          suggestions: possibleMatches.map(p => ({
            sku: p.sku,
            name: p.name,
            category: p.category
          }))
        });
      }
    } else {
      validIngredients.push({
        recipe: recipe.title || recipe.slug,
        ingredient: ingredient.name,
        sku: ingredient.sku
      });
    }
  });
});

console.log('📊 VALIDATION RESULTS:\n');
console.log(`✅ Valid ingredients: ${validIngredients.length}`);
console.log(`❌ Invalid SKUs: ${issues.length}\n`);

if (issues.length > 0) {
  console.log('❌ INVALID SKUs FOUND:\n');
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. Recipe: "${issue.recipe}"`);
    console.log(`   Ingredient: "${issue.ingredient}"`);
    console.log(`   Invalid SKU: "${issue.sku}"`);
    console.log(`   Quantity: ${issue.quantity}\n`);
  });
  
  if (suggestions.length > 0) {
    console.log('💡 SUGGESTED REPLACEMENTS:\n');
    suggestions.forEach((suggestion, i) => {
      console.log(`${i + 1}. Recipe: "${suggestion.recipe}"`);
      console.log(`   Ingredient: "${suggestion.ingredient}"`);
      console.log(`   Invalid SKU: "${suggestion.invalidSku}"`);
      console.log(`   Suggested products:`);
      suggestion.suggestions.forEach((sug, j) => {
        console.log(`     ${j + 1}. SKU: ${sug.sku} - ${sug.name} (${sug.category})`);
      });
      console.log('');
    });
  }
  
  // Generate update script
  console.log('📝 Generating update recommendations...\n');
  
  // Group by recipe for easier updating
  const updatesByRecipe = {};
  issues.forEach(issue => {
    if (!updatesByRecipe[issue.recipe]) {
      updatesByRecipe[issue.recipe] = [];
    }
    updatesByRecipe[issue.recipe].push(issue);
  });
  
  console.log('RECOMMENDED UPDATES:\n');
  Object.entries(updatesByRecipe).forEach(([recipeName, recipeIssues]) => {
    console.log(`Recipe: "${recipeName}"`);
    recipeIssues.forEach(issue => {
      const suggestion = suggestions.find(s => 
        s.recipe === recipeName && s.ingredient === issue.ingredient
      );
      
      if (suggestion && suggestion.suggestions.length > 0) {
        console.log(`  - Replace SKU "${issue.sku}" with "${suggestion.suggestions[0].sku}" (${suggestion.suggestions[0].name})`);
      } else {
        console.log(`  - Remove or set SKU to null for "${issue.ingredient}" (SKU: ${issue.sku})`);
      }
    });
    console.log('');
  });
  
  // Write report to file
  const reportPath = path.join(__dirname, '../recipe-sku-validation-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
      totalRecipes: recipes.length,
      validIngredients: validIngredients.length,
      invalidSkus: issues.length,
      suggestionsFound: suggestions.length
    },
    issues,
    suggestions,
    validIngredients: validIngredients.slice(0, 10) // Sample
  }, null, 2));
  
  console.log(`\n📄 Full report saved to: ${reportPath}`);
  console.log('\n⚠️  ACTION REQUIRED:');
  console.log('   1. Review the suggestions above');
  console.log('   2. Update recipes.json with valid SKUs');
  console.log('   3. Or set invalid SKUs to null to disable cart functionality for those ingredients\n');
} else {
  console.log('✅ All recipe SKUs are valid!\n');
}


