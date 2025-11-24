/**
 * SEO-Friendly Short Descriptions for Category Pages
 * Engaging, keyword-optimized descriptions (50-80 words) for each product category
 * Use {BRANCH_NAME} placeholder for branch personalization (will be replaced with branch name or "across all branches")
 */

export const categoryShortDescriptions: Record<string, string> = {
  "BEEF": "Discover premium British beef cuts from ribeye steaks to slow-cook brisket. Red Tractor certified, aged options available. Order by 3pm for next-day delivery {BRANCH_NAME}.",
  "PORK": "Explore fresh British pork cuts including pork belly, loin, and shoulder. Perfect for roasting, BBQ, and Asian cuisine. Next-day delivery available {BRANCH_NAME}.",
  "LAMB": "Browse premium British lamb cuts from elegant racks to slow-cook shoulders. Ideal for fine dining and special occasions. Order by 3pm for next-day delivery {BRANCH_NAME}.",
  "CHICKEN": "Shop quality British chicken products from whole birds to portioned cuts. Free-range and organic options available. Next-day delivery {BRANCH_NAME}.",
  "SAUSAGES": "Choose from our range of premium British sausages and specialty varieties. Perfect for breakfast menus and pub classics. Order by 3pm for next-day delivery {BRANCH_NAME}.",
  "BURGERS": "Select from gourmet British beef burgers in various portion sizes. Premium blends and specialty options. Next-day delivery available {BRANCH_NAME}.",
  "VEAL": "Browse premium veal cuts for fine dining applications. Tender, delicate flavor perfect for upscale menus. Order by 3pm for next-day delivery {BRANCH_NAME}.",
  "MUTTON": "Explore traditional mutton cuts for slow-cooking and hearty dishes. Rich flavor perfect for stews and roasts. Next-day delivery available {BRANCH_NAME}.",
  "POULTRY & GAME": "Discover game birds and specialty poultry for seasonal menus. Perfect for fine dining and special occasions. Order by 3pm for next-day delivery {BRANCH_NAME}.",
  "FISH": "Shop sustainable fish and seafood from MSC-certified sources. Fresh and frozen options available. Next-day delivery {BRANCH_NAME}.",
  "ADDED VALUE": "Browse prepared and value-added products to streamline your kitchen operations. Ready-to-use options for efficient service. Order by 3pm for next-day delivery {BRANCH_NAME}.",
  "EGGS & FATS": "Choose from quality eggs and cooking fats for your kitchen. British-sourced options available. Next-day delivery available {BRANCH_NAME}.",
};

/**
 * Get category description with branch personalization
 */
export function getCategoryDescription(category: string | null, branchName: string | null, isAuthenticated: boolean): string {
  if (!category || !categoryShortDescriptions[category]) {
    return `Browse our complete range of premium butchery products at wholesale prices. Order by 3pm for next-day delivery ${isAuthenticated && branchName ? `from ${branchName.replace('at ', '')}` : 'across all branches'}.`;
  }
  
  const description = categoryShortDescriptions[category];
  const branchText = isAuthenticated && branchName 
    ? `from ${branchName.replace('at ', '')}` 
    : 'across all branches';
  
  return description.replace('{BRANCH_NAME}', branchText);
}

