/**
 * Menu Builder System - Mock Data
 * Allows professional kitchens to save complete menus and reorder quickly
 */

export interface MenuItem {
  product_id: string;
  product_name: string;
  category: string;
  quantity: number;
  notes?: string; // e.g., "for starters", "main course protein"
}

export interface SavedMenu {
  id: string;
  name: string;
  description?: string;
  menu_type: 'standard' | 'seasonal' | 'event' | 'weekly_special' | 'custom';
  occasion?: string; // e.g., "Sunday Roast", "Christmas", "Valentine's Day"
  items: MenuItem[];
  total_items: number;
  estimated_value: number;
  created_date: string;
  last_used_date?: string;
  times_used: number;
  is_template: boolean;
  is_active: boolean;
  covers_estimate?: number; // How many customers this menu serves
  tags?: string[]; // e.g., ["british", "roast", "winter", "popular"]
}

export interface MenuTemplate {
  id: string;
  name: string;
  description: string;
  category: 'roast' | 'festive' | 'fine_dining' | 'pub_classics' | 'seasonal';
  items: MenuItem[];
  suggested_occasions: string[];
  estimated_value: number;
}

/**
 * Mock saved menus for a user
 */
const MOCK_SAVED_MENUS: Record<string, SavedMenu[]> = {
  'user-test-001': [
    {
      id: 'menu-001',
      name: 'Sunday Roast Menu',
      description: 'Traditional British Sunday roast with all the trimmings',
      menu_type: 'standard',
      occasion: 'Sunday Service',
      items: [
        {
          product_id: 'beef-rib-001',
          product_name: 'Prime Rib of Beef 5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 3,
          notes: 'Main protein - serves 30-35',
        },
        {
          product_id: 'produce-potatoes',
          product_name: 'Maris Piper Potatoes 25kg',
          category: 'Greengrocery',
          quantity: 2,
          notes: 'For roast potatoes',
        },
        {
          product_id: 'produce-carrots',
          product_name: 'British Carrots 5kg',
          category: 'Greengrocery',
          quantity: 2,
        },
        {
          product_id: 'produce-parsnips',
          product_name: 'British Parsnips 5kg',
          category: 'Greengrocery',
          quantity: 1,
        },
        {
          product_id: 'veg-sprouts',
          product_name: 'Brussels Sprouts 2kg',
          category: 'Greengrocery',
          quantity: 3,
        },
        {
          product_id: 'gravy-mix',
          product_name: 'Professional Gravy Mix 2.5kg',
          category: 'Cooking Ingredients',
          quantity: 2,
        },
      ],
      total_items: 13,
      estimated_value: 285.00,
      created_date: '2024-10-15',
      last_used_date: '2024-12-01',
      times_used: 18,
      is_template: false,
      is_active: true,
      covers_estimate: 35,
      tags: ['british', 'roast', 'sunday', 'popular'],
    },
    {
      id: 'menu-002',
      name: 'Christmas Dinner Menu',
      description: 'Traditional Christmas dinner service',
      menu_type: 'seasonal',
      occasion: 'Christmas',
      items: [
        {
          product_id: 'turkey-crown-001',
          product_name: 'Free Range Turkey Crown 3-4kg',
          category: 'Meat, Fish & Poultry',
          quantity: 8,
          notes: 'Main course',
        },
        {
          product_id: 'gammon-001',
          product_name: 'Honey Glazed Gammon Joint 2kg',
          category: 'Meat, Fish & Poultry',
          quantity: 4,
          notes: 'Alternative protein',
        },
        {
          product_id: 'veg-sprouts',
          product_name: 'Brussels Sprouts 2kg',
          category: 'Greengrocery',
          quantity: 6,
        },
        {
          product_id: 'cranberry-sauce',
          product_name: 'Cranberry Sauce 1kg',
          category: 'Condiments',
          quantity: 3,
        },
        {
          product_id: 'pigs-in-blankets',
          product_name: 'Premium Pigs in Blankets 1kg',
          category: 'Meat, Fish & Poultry',
          quantity: 5,
        },
        {
          product_id: 'produce-potatoes',
          product_name: 'Maris Piper Potatoes 25kg',
          category: 'Greengrocery',
          quantity: 3,
        },
      ],
      total_items: 29,
      estimated_value: 485.00,
      created_date: '2024-11-01',
      last_used_date: '2024-12-20',
      times_used: 4,
      is_template: true,
      is_active: true,
      covers_estimate: 60,
      tags: ['christmas', 'festive', 'seasonal', 'turkey'],
    },
    {
      id: 'menu-003',
      name: 'Friday Fish & Chips',
      description: 'Classic British fish and chips night',
      menu_type: 'weekly_special',
      occasion: 'Friday Night',
      items: [
        {
          product_id: 'fish-cod-001',
          product_name: 'Fresh Cod Fillets 5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 4,
        },
        {
          product_id: 'fish-haddock-001',
          product_name: 'Fresh Haddock Fillets 5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 3,
        },
        {
          product_id: 'produce-potatoes',
          product_name: 'Maris Piper Potatoes 25kg',
          category: 'Greengrocery',
          quantity: 3,
          notes: 'For chips',
        },
        {
          product_id: 'produce-peas',
          product_name: 'Garden Peas 2.5kg',
          category: 'Greengrocery',
          quantity: 4,
          notes: 'Mushy peas',
        },
      ],
      total_items: 14,
      estimated_value: 195.00,
      created_date: '2024-09-10',
      last_used_date: '2024-11-29',
      times_used: 22,
      is_template: false,
      is_active: true,
      covers_estimate: 45,
      tags: ['fish', 'friday', 'british', 'weekly'],
    },
    {
      id: 'menu-004',
      name: 'Valentine\'s Day Special',
      description: 'Romantic fine dining menu',
      menu_type: 'event',
      occasion: 'Valentine\'s Day',
      items: [
        {
          product_id: 'beef-fillet-001',
          product_name: 'Blackgate 28-Day Aged Fillet Steak 250g',
          category: 'Meat, Fish & Poultry',
          quantity: 20,
          notes: 'Premium main course',
        },
        {
          product_id: 'lobster-tail-001',
          product_name: 'Canadian Lobster Tails 200g',
          category: 'Meat, Fish & Poultry',
          quantity: 15,
          notes: 'Surf & turf option',
        },
        {
          product_id: 'asparagus-001',
          product_name: 'British Asparagus Bundle 500g',
          category: 'Greengrocery',
          quantity: 6,
        },
      ],
      total_items: 41,
      estimated_value: 820.00,
      created_date: '2024-01-15',
      last_used_date: '2024-02-14',
      times_used: 3,
      is_template: true,
      is_active: false, // Not currently in season
      covers_estimate: 40,
      tags: ['valentines', 'fine_dining', 'premium', 'steak'],
    },
    {
      id: 'menu-005',
      name: 'Midweek Burger Night',
      description: 'Popular Wednesday burger specials',
      menu_type: 'weekly_special',
      occasion: 'Wednesday Night',
      items: [
        {
          product_id: 'beef-mince-001',
          product_name: 'Premium Beef Mince 20% Fat 5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 8,
          notes: 'For burger patties',
        },
        {
          product_id: 'cheese-cheddar-001',
          product_name: 'Mature Cheddar Cheese 2.5kg',
          category: 'Dairy',
          quantity: 3,
        },
        {
          product_id: 'bacon-streaky-001',
          product_name: 'Streaky Bacon 2.5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 4,
        },
        {
          product_id: 'produce-lettuce',
          product_name: 'Iceberg Lettuce (10 pack)',
          category: 'Greengrocery',
          quantity: 2,
        },
        {
          product_id: 'produce-tomatoes',
          product_name: 'Beef Tomatoes 3kg',
          category: 'Greengrocery',
          quantity: 2,
        },
      ],
      total_items: 19,
      estimated_value: 165.00,
      created_date: '2024-08-05',
      last_used_date: '2024-11-27',
      times_used: 28,
      is_template: false,
      is_active: true,
      covers_estimate: 50,
      tags: ['burgers', 'wednesday', 'popular', 'casual'],
    },
  ],
};

/**
 * Pre-built menu templates available to all users
 */
const MENU_TEMPLATES: MenuTemplate[] = [
  {
    id: 'template-001',
    name: 'Classic Sunday Roast',
    description: 'Traditional British Sunday roast with seasonal vegetables',
    category: 'roast',
    items: [
      {
        product_id: 'beef-rib-001',
        product_name: 'Prime Rib of Beef 5kg',
        category: 'Meat, Fish & Poultry',
        quantity: 3,
      },
      {
        product_id: 'produce-potatoes',
        product_name: 'Maris Piper Potatoes 25kg',
        category: 'Greengrocery',
        quantity: 2,
      },
      {
        product_id: 'yorkshire-pudding-mix',
        product_name: 'Yorkshire Pudding Mix 2.5kg',
        category: 'Cooking Ingredients',
        quantity: 2,
      },
    ],
    suggested_occasions: ['Sunday Service', 'Special Events', 'Traditional British'],
    estimated_value: 195.00,
  },
  {
    id: 'template-002',
    name: 'Festive Turkey Feast',
    description: 'Complete Christmas dinner menu with all the trimmings',
    category: 'festive',
    items: [
      {
        product_id: 'turkey-crown-001',
        product_name: 'Free Range Turkey Crown 3-4kg',
        category: 'Meat, Fish & Poultry',
        quantity: 8,
      },
      {
        product_id: 'veg-sprouts',
        product_name: 'Brussels Sprouts 2kg',
        category: 'Greengrocery',
        quantity: 6,
      },
      {
        product_id: 'cranberry-sauce',
        product_name: 'Cranberry Sauce 1kg',
        category: 'Condiments',
        quantity: 3,
      },
      {
        product_id: 'pigs-in-blankets',
        product_name: 'Premium Pigs in Blankets 1kg',
        category: 'Meat, Fish & Poultry',
        quantity: 5,
      },
    ],
    suggested_occasions: ['Christmas', 'New Year', 'Winter Celebrations'],
    estimated_value: 385.00,
  },
  {
    id: 'template-003',
    name: 'Premium Steakhouse Menu',
    description: 'Fine dining steak selection with premium cuts',
    category: 'fine_dining',
    items: [
      {
        product_id: 'beef-ribeye-001',
        product_name: 'Blackgate 28-Day Aged Ribeye 250g',
        category: 'Meat, Fish & Poultry',
        quantity: 15,
      },
      {
        product_id: 'beef-fillet-001',
        product_name: 'Blackgate 28-Day Aged Fillet Steak 250g',
        category: 'Meat, Fish & Poultry',
        quantity: 12,
      },
    ],
    suggested_occasions: ['Fine Dining', 'Special Events', 'Date Night'],
    estimated_value: 520.00,
  },
];

/**
 * Get all saved menus for a user
 */
export function getSavedMenus(userId: string): SavedMenu[] {
  return MOCK_SAVED_MENUS[userId] || [];
}

/**
 * Get active menus only
 */
export function getActiveMenus(userId: string): SavedMenu[] {
  const menus = getSavedMenus(userId);
  return menus.filter(menu => menu.is_active);
}

/**
 * Get menus by type
 */
export function getMenusByType(userId: string, type: SavedMenu['menu_type']): SavedMenu[] {
  const menus = getSavedMenus(userId);
  return menus.filter(menu => menu.menu_type === type);
}

/**
 * Get menu templates
 */
export function getMenuTemplates(): MenuTemplate[] {
  return MENU_TEMPLATES;
}

/**
 * Get a specific menu by ID
 */
export function getMenuById(userId: string, menuId: string): SavedMenu | null {
  const menus = getSavedMenus(userId);
  return menus.find(menu => menu.id === menuId) || null;
}

/**
 * Get most frequently used menus
 */
export function getPopularMenus(userId: string, limit: number = 3): SavedMenu[] {
  const menus = getSavedMenus(userId);
  return menus
    .sort((a, b) => b.times_used - a.times_used)
    .slice(0, limit);
}

/**
 * Get recently used menus
 */
export function getRecentMenus(userId: string, limit: number = 3): SavedMenu[] {
  const menus = getSavedMenus(userId);
  return menus
    .filter(menu => menu.last_used_date)
    .sort((a, b) => {
      const dateA = new Date(a.last_used_date || 0).getTime();
      const dateB = new Date(b.last_used_date || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, limit);
}

/**
 * Save a new menu (mock function - would be API call in real implementation)
 */
export function saveMenu(userId: string, menu: Omit<SavedMenu, 'id' | 'created_date' | 'times_used'>): SavedMenu {
  const newMenu: SavedMenu = {
    ...menu,
    id: `menu-${Date.now()}`,
    created_date: new Date().toISOString().split('T')[0],
    times_used: 0,
  };

  // In real implementation, this would save to database
  console.log('Saving menu:', newMenu);
  return newMenu;
}

/**
 * Use a menu (increments usage count, updates last used date)
 */
export function useMenu(userId: string, menuId: string): void {
  // In real implementation, this would update the database
  console.log(`Using menu ${menuId} for user ${userId}`);
}
