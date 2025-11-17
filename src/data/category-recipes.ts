export interface CategoryRecipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  difficulty?: 'Easy' | 'Medium' | 'Advanced';
  cookTime?: string;
  servings?: string;
}

export const categoryRecipes: CategoryRecipe[] = [
  // Beef Recipes
  {
    id: "aged-ribeye-steak",
    title: "Pan-Seared Aged Ribeye",
    description: "Restaurant-quality ribeye with herb butter, perfect medium-rare finish",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80",
    category: "BEEF",
    link: "/recipes/aged-ribeye-steak",
    difficulty: "Medium",
    cookTime: "15 mins",
    servings: "2-4",
  },
  {
    id: "slow-braised-beef-short-ribs",
    title: "Red Wine Braised Short Ribs",
    description: "Melt-in-your-mouth short ribs slow-cooked in red wine with aromatics",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    category: "BEEF",
    link: "/recipes/slow-braised-beef-short-ribs",
    difficulty: "Advanced",
    cookTime: "4 hours",
    servings: "4-6",
  },
  {
    id: "premium-beef-burgers",
    title: "Premium Beef Burgers",
    description: "Gourmet burgers with premium mince, aged cheddar, and caramelized onions",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    category: "BEEF",
    link: "/recipes/premium-beef-burgers",
    difficulty: "Easy",
    cookTime: "20 mins",
    servings: "4",
  },
  {
    id: "beef-wellington",
    title: "Classic Beef Wellington",
    description: "Tender beef fillet wrapped in mushroom duxelles and golden puff pastry",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80",
    category: "BEEF",
    link: "/recipes/beef-wellington",
    difficulty: "Advanced",
    cookTime: "1.5 hours",
    servings: "6-8",
  },

  // Pork Recipes
  {
    id: "slow-roast-pork-belly",
    title: "Crispy Pork Belly",
    description: "Perfectly crispy skin and tender meat, Asian-inspired with five-spice",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    category: "PORK",
    link: "/recipes/slow-roast-pork-belly",
    difficulty: "Medium",
    cookTime: "3 hours",
    servings: "6-8",
  },
  {
    id: "bbq-pulled-pork",
    title: "BBQ Pulled Pork",
    description: "Slow-cooked pork shoulder with smoky BBQ sauce, perfect for sliders",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80",
    category: "PORK",
    link: "/recipes/bbq-pulled-pork",
    difficulty: "Easy",
    cookTime: "8 hours",
    servings: "10-12",
  },
  {
    id: "stuffed-pork-loin",
    title: "Herb-Stuffed Pork Loin",
    description: "Premium pork loin stuffed with sage, apricot, and fresh herbs",
    image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&q=80",
    category: "PORK",
    link: "/recipes/stuffed-pork-loin",
    difficulty: "Medium",
    cookTime: "1.5 hours",
    servings: "6-8",
  },

  // Lamb Recipes
  {
    id: "rack-of-lamb",
    title: "Herb-Crusted Rack of Lamb",
    description: "Premium rack of lamb with herb and breadcrumb crust, perfectly pink",
    image: "https://images.unsplash.com/photo-1595777216528-071e0127ccbf?w=400&q=80",
    category: "LAMB",
    link: "/recipes/rack-of-lamb",
    difficulty: "Advanced",
    cookTime: "45 mins",
    servings: "4",
  },
  {
    id: "slow-roast-lamb-shoulder",
    title: "Slow-Roast Lamb Shoulder",
    description: "Tender lamb shoulder with rosemary, garlic, and red wine",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80",
    category: "LAMB",
    link: "/recipes/slow-roast-lamb-shoulder",
    difficulty: "Easy",
    cookTime: "4 hours",
    servings: "6-8",
  },
  {
    id: "lamb-tagine",
    title: "Moroccan Lamb Tagine",
    description: "Aromatic lamb stew with apricots, almonds, and North African spices",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    category: "LAMB",
    link: "/recipes/lamb-tagine",
    difficulty: "Medium",
    cookTime: "2.5 hours",
    servings: "6",
  },

  // Chicken Recipes
  {
    id: "roast-chicken",
    title: "Perfect Roast Chicken",
    description: "Classic roast chicken with crispy skin, lemon, and fresh herbs",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    category: "CHICKEN",
    link: "/recipes/roast-chicken",
    difficulty: "Easy",
    cookTime: "1.5 hours",
    servings: "4-6",
  },
  {
    id: "chicken-supreme",
    title: "Pan-Seared Chicken Supreme",
    description: "Skin-on chicken breast with wild mushroom and tarragon cream sauce",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&q=80",
    category: "CHICKEN",
    link: "/recipes/chicken-supreme",
    difficulty: "Medium",
    cookTime: "30 mins",
    servings: "4",
  },
  {
    id: "buttermilk-fried-chicken",
    title: "Buttermilk Fried Chicken",
    description: "Crispy Southern-style fried chicken, perfect for pub menus",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&q=80",
    category: "CHICKEN",
    link: "/recipes/buttermilk-fried-chicken",
    difficulty: "Medium",
    cookTime: "1 hour",
    servings: "4-6",
  },

  // Sausage Recipes
  {
    id: "gourmet-sausage-board",
    title: "Gourmet Sausage Board",
    description: "Selection of premium sausages with artisan condiments and pickles",
    image: "https://images.unsplash.com/photo-1624365169609-e3c2ea5a7255?w=400&q=80",
    category: "SAUSAGES",
    link: "/recipes/gourmet-sausage-board",
    difficulty: "Easy",
    cookTime: "25 mins",
    servings: "6-8",
  },
  {
    id: "bangers-and-mash",
    title: "Traditional Bangers & Mash",
    description: "Classic British comfort food with creamy mash and rich onion gravy",
    image: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=400&q=80",
    category: "SAUSAGES",
    link: "/recipes/bangers-and-mash",
    difficulty: "Easy",
    cookTime: "45 mins",
    servings: "4",
  },
  {
    id: "sausage-casserole",
    title: "Hearty Sausage Casserole",
    description: "Comforting sausage and bean casserole, perfect for batch cooking",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80",
    category: "SAUSAGES",
    link: "/recipes/sausage-casserole",
    difficulty: "Easy",
    cookTime: "1 hour",
    servings: "6-8",
  },
];

export function getRecipesForCategory(category: string): CategoryRecipe[] {
  return categoryRecipes.filter((recipe) => recipe.category === category).slice(0, 3);
}
