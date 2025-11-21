export function getRecipesLandingPageSEO(): string {
  return `
    <h2>Professional Butchery Recipes for Commercial Kitchens</h2>
    <p>Discover our comprehensive collection of professional butchery recipes designed specifically for commercial kitchens, restaurants, pubs, and catering businesses. Our recipe library features over 80 professionally tested recipes covering all major meat categories: beef, pork, lamb, chicken, and sausages.</p>
    
    <h3>Recipe Categories for Every Occasion</h3>
    <p>Our recipes are organized by use case to help you find the perfect dish for your menu:</p>
    <ul>
      <li><strong>Pub & Casual Dining:</strong> Hearty, crowd-pleasing recipes perfect for casual dining establishments. From traditional bangers and mash to gourmet burgers, these recipes are designed for high-volume service.</li>
      <li><strong>Fine Dining & Special Occasions:</strong> Elegant, sophisticated recipes showcasing premium cuts. Perfect for special events, fine dining restaurants, and occasions that demand exceptional presentation.</li>
      <li><strong>Quick Lunch Service:</strong> Fast, efficient recipes designed for lunch service. These dishes can be prepared quickly without compromising on quality or flavor.</li>
      <li><strong>Large Events & Catering:</strong> Scalable recipes perfect for weddings, corporate events, and large gatherings. All recipes include portion calculations for 40+ servings.</li>
    </ul>
    
    <h3>Browse by Protein Type</h3>
    <p>Find recipes organized by protein to match your menu planning needs:</p>
    <ul>
      <li><strong>Beef Recipes:</strong> From classic roasts to gourmet steaks, our beef recipes showcase premium cuts including ribeye, fillet, short ribs, and brisket.</li>
      <li><strong>Chicken Recipes:</strong> Versatile chicken recipes ranging from quick pan-seared dishes to slow-roasted classics perfect for any menu.</li>
      <li><strong>Pork Recipes:</strong> Discover the versatility of pork with recipes for belly, shoulder, loin, and specialty cuts.</li>
      <li><strong>Lamb Recipes:</strong> Premium lamb recipes featuring racks, shoulders, and leg cuts, perfect for fine dining and special occasions.</li>
      <li><strong>Sausage Recipes:</strong> Traditional and gourmet sausage recipes, from classic bangers and mash to sophisticated sausage boards.</li>
    </ul>
    
    <h3>Recipe Difficulty Levels</h3>
    <p>Our recipes are categorized by difficulty to help you choose dishes that match your kitchen's skill level:</p>
    <ul>
      <li><strong>Simple (3 steps or less):</strong> Easy-to-follow recipes perfect for busy kitchens or when training new staff.</li>
      <li><strong>Moderate (requires some prep):</strong> Recipes that require standard preparation techniques and moderate cooking skills.</li>
      <li><strong>Advanced (chef-level technique):</strong> Sophisticated recipes requiring advanced culinary skills, perfect for experienced chefs and fine dining establishments.</li>
    </ul>
    
    <h3>Seasonal Recipe Collections</h3>
    <p>Browse recipes organized by season to create menus that celebrate the best of each time of year:</p>
    <ul>
      <li><strong>Spring Specials:</strong> Light, fresh recipes featuring spring lamb, seasonal vegetables, and bright flavors.</li>
      <li><strong>Summer BBQ:</strong> Perfect recipes for outdoor cooking, grilling, and summer dining. Ideal for pub gardens and outdoor events.</li>
      <li><strong>Autumn Comforts:</strong> Hearty, warming recipes perfect for cooler weather. Rich flavors and comforting dishes.</li>
      <li><strong>Winter Warmers:</strong> Substantial, warming recipes ideal for winter menus. Slow-cooked dishes and rich, satisfying flavors.</li>
    </ul>
    
    <h3>Complete Recipe Details</h3>
    <p>Each recipe includes:</p>
    <ul>
      <li><strong>Detailed Instructions:</strong> Step-by-step cooking instructions written for professional kitchens.</li>
      <li><strong>Ingredient Lists:</strong> Complete ingredient lists with quantities calculated for commercial scale (40+ portions).</li>
      <li><strong>Product Integration:</strong> Direct links to purchase ingredients from Booker, with automatic basket addition for all recipe ingredients.</li>
      <li><strong>Portion Calculator:</strong> Adjust recipes to serve any number of portions with automatic quantity and price recalculation.</li>
      <li><strong>Cooking Times:</strong> Accurate prep and cooking times to help with kitchen planning.</li>
      <li><strong>Difficulty Ratings:</strong> Clear difficulty indicators to help you choose appropriate recipes.</li>
    </ul>
    
    <h3>Why Use Professional Recipes?</h3>
    <p>Our recipes are developed specifically for commercial kitchens, with:</p>
    <ul>
      <li><strong>Scalable Portions:</strong> All recipes are designed for commercial quantities, easily adjusted for any service size.</li>
      <li><strong>Cost Calculations:</strong> Automatic pricing for all ingredients, helping you plan menu costs and profitability.</li>
      <li><strong>Quality Ingredients:</strong> Recipes feature premium Booker products, ensuring consistent quality and flavor.</li>
      <li><strong>Time Efficiency:</strong> Recipes optimized for commercial kitchen workflows and service times.</li>
      <li><strong>Menu Inspiration:</strong> Discover new dishes to add to your menu, with recipes tested in professional kitchens.</li>
    </ul>
    
    <h3>Get Started with Recipe Planning</h3>
    <p>Browse our recipe collection by use case, protein type, difficulty, or season. Each recipe page includes complete instructions, ingredient lists with Booker product links, and portion scaling tools. Add all recipe ingredients to your basket with one click, or customize quantities based on your service requirements.</p>
    
    <p>Whether you're planning a new menu, looking for seasonal specials, or need inspiration for a special event, our professional recipe collection has something for every commercial kitchen.</p>
  `;
}

export function getRecipeDetailPageSEO(recipe: {
  title: string;
  category: string;
  difficulty?: string;
  useCase?: string;
  season?: string;
  description: string;
}): string {
  const categoryName = recipe.category.toLowerCase();
  const difficultyText = recipe.difficulty || "moderate";
  const useCaseText = recipe.useCase 
    ? recipe.useCase === 'pub-casual' ? 'pub and casual dining' 
      : recipe.useCase === 'fine-dining' ? 'fine dining' 
      : recipe.useCase === 'quick-lunch' ? 'quick lunch service' 
      : 'large events and catering'
    : 'commercial kitchens';
  const seasonText = recipe.season || 'year-round';

  return `
    <h2>${recipe.title} - Professional Recipe Guide</h2>
    <p>${recipe.description}</p>
    
    <h3>About This ${categoryName} Recipe</h3>
    <p>This ${recipe.title.toLowerCase()} recipe is designed for ${useCaseText}, featuring ${categoryName} as the primary protein. The recipe is rated as ${difficultyText} difficulty, making it ${difficultyText === 'Easy' ? 'perfect for busy kitchens' : difficultyText === 'Advanced' ? 'ideal for experienced chefs' : 'suitable for most professional kitchens'}.</p>
    
    <h3>Perfect for ${useCaseText === 'pub and casual dining' ? 'Pub Menus' : useCaseText === 'fine dining' ? 'Fine Dining Restaurants' : useCaseText === 'quick lunch service' ? 'Lunch Service' : 'Large Events'}</h3>
    <p>This recipe is specifically designed for ${useCaseText}, with portion calculations and preparation methods optimized for ${useCaseText === 'pub and casual dining' ? 'high-volume service' : useCaseText === 'fine dining' ? 'elegant presentation' : useCaseText === 'quick lunch service' ? 'fast service times' : 'large-scale catering'}.</p>
    
    <h3>Seasonal Availability</h3>
    <p>This ${seasonText} recipe features ingredients and flavors perfect for ${seasonText === 'spring' ? 'spring menus, with fresh, light flavors' : seasonText === 'summer' ? 'summer dining, ideal for outdoor service' : seasonText === 'autumn' ? 'autumn menus, with hearty, comforting flavors' : seasonText === 'winter' ? 'winter service, with rich, warming dishes' : 'year-round service'}.</p>
    
    <h3>Commercial Kitchen Preparation</h3>
    <p>All ingredients in this recipe are available from Booker Wholesale, with next-day delivery available when ordered by 3pm. The recipe includes automatic portion scaling, allowing you to adjust quantities for any number of servings. Bulk pricing is automatically applied for large orders.</p>
    
    <h3>Recipe Tips for Success</h3>
    <ul>
      <li>All ingredients are calculated for commercial scale (40+ portions by default)</li>
      <li>Use the portion calculator to adjust quantities for your specific service requirements</li>
      <li>Add all ingredients to your basket with one click for convenient ordering</li>
      <li>Fresh ingredients are delivered next-day from your local Booker branch</li>
      <li>Bulk pricing automatically applies for large quantity orders</li>
    </ul>
    
    <h3>Related ${categoryName} Recipes</h3>
    <p>Explore more ${categoryName} recipes in our collection, including options for different use cases, difficulty levels, and seasons. Each recipe includes complete instructions, ingredient lists, and product links.</p>
  `;
}

