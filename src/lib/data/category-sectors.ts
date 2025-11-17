/**
 * Mapping from product categories to relevant sector slugs
 * Used by ShopBySectorSection component to display relevant sectors for each category
 */

export const categoryToSectors: Record<string, string[]> = {
  "Meat, Fish & Poultry": [
    "restaurants",
    "pubs-bars",
    "hotels",
    "events",
    "takeaways",
    "care-education",
  ],
  "Beer, Cider and Alcoholic RTDs": [
    "pubs-bars",
    "hotels",
    "restaurants",
    "events",
    "convenience-retailing",
  ],
  "Greengrocery": [
    "restaurants",
    "coffee-shops-cafes",
    "care-education",
    "convenience-retailing",
  ],
};

/**
 * Get relevant sector slugs for a given category
 */
export function getSectorsForCategory(category: string): string[] {
  return categoryToSectors[category] || [];
}

