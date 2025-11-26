// Client-side product data access functions
// These replace the API routes for frontend-only operation

import productsData from '@/data/products.json';
import branchesData from '@/data/branches.json';

export type Product = {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  descriptions: {
    short: string;
    long?: string;
    features?: string[];
  };
  images: string[];
  specifications?: Record<string, any>;
  base_price: number;
  was_price?: number | null;
  unit: string;
  pack_size?: string;
  bulk_pricing?: Array<{
    min_quantity: number;
    price_per_unit: number;
    discount_percent?: number;
  }>;
  attributes: string[];
  certifications?: string[];
  dietary_info?: Record<string, any>;
  nutrition?: Record<string, any>;
  allergens?: string[];
  storage_info?: string;
  shelf_life_days?: number;
  cooking_instructions?: string;
  recipes?: Array<{
    id: string;
    title: string;
    image: string;
    link?: string;
  }>;
  on_offer: boolean;
  best_seller: boolean;
  seasonal: boolean;
  active: boolean;
  created_at: string;
  sectors?: string[];
  quality_tier?: string;
  halal?: boolean;
  aging_method?: string;
  aging_days?: number;
  inventory: Record<string, {
    in_stock: boolean;
    stock_level: 'high' | 'medium' | 'low' | 'out';
    exact_count: number;
    available_for_delivery: boolean;
    available_for_click_collect: boolean;
  }>;
};

type ProductQueryParams = {
  category?: string;
  subcategory?: string;
  meatType?: string | string[];
  sectors?: string | string[];
  attributes?: string[];
  brands?: string[];
  bestSeller?: boolean;
  inStockOnly?: boolean;
  on_offer?: boolean;
  seasonal?: boolean;
  branchCode?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  perPage?: number;
  quality_tier?: string;
  halal?: boolean;
  origin?: string;
  aging_method?: string;
  aging_days?: number;
  storage_type?: string;
  stock_level?: string;
};

function getStockLevel(count: number): 'high' | 'medium' | 'low' | 'out' {
  if (count === 0) return 'out';
  if (count < 10) return 'low';
  if (count < 50) return 'medium';
  return 'high';
}

function aggregateInventory(inventories: Array<{ in_stock: boolean; stock_level: string }>) {
  const inStockInventories = inventories.filter(inv => inv.in_stock);
  const hasStock = inStockInventories.length > 0;
  
  if (!hasStock) {
    return { in_stock: false, stock_level: 'out' as const };
  }
  
  const stockLevels = inStockInventories.map(inv => inv.stock_level).filter(Boolean);
  const highCount = stockLevels.filter(l => l === 'high').length;
  const mediumCount = stockLevels.filter(l => l === 'medium').length;
  const lowCount = stockLevels.filter(l => l === 'low').length;
  
  let nationalStockLevel: 'high' | 'medium' | 'low' = 'high';
  if (highCount >= mediumCount && highCount >= lowCount) {
    nationalStockLevel = 'high';
  } else if (mediumCount >= lowCount) {
    nationalStockLevel = 'medium';
  } else {
    nationalStockLevel = 'low';
  }
  
  return { in_stock: true, stock_level: nationalStockLevel };
}

export function getProducts(params: ProductQueryParams = {}) {
  const {
    category,
    subcategory,
    meatType,
    sectors,
    attributes = [],
    brands = [],
    bestSeller,
    inStockOnly = false,
    on_offer,
    seasonal,
    branchCode,
    minPrice,
    maxPrice,
    sortBy = 'name_az',
    page = 1,
    perPage = 24,
    quality_tier,
    halal,
    origin,
    aging_method,
    aging_days,
    storage_type,
    stock_level,
  } = params;

  let filtered = (productsData as Product[]).filter(p => p.active);

  // Category filter (case-insensitive matching)
  if (category) {
    const before = filtered.length;
    filtered = filtered.filter(p => 
      p.category.toUpperCase() === category.toUpperCase()
    );
  }

  // Subcategory filter (case-insensitive, handle URL decoding)
  if (subcategory) {
    const before = filtered.length;
    const normalizedSubcategory = decodeURIComponent(subcategory).trim();
    filtered = filtered.filter(p => {
      if (!p.subcategory) return false;
      return p.subcategory.trim().toLowerCase() === normalizedSubcategory.toLowerCase();
    });
  }

  // Sector filter
  if (sectors) {
    const before = filtered.length;
    const sectorArray = Array.isArray(sectors) ? sectors : [sectors];
    filtered = filtered.filter(p => {
      const productSectors = Array.isArray(p.sectors) ? p.sectors : [];
      return sectorArray.some(sector => productSectors.includes(sector));
    });
  }

  // Meat type filter (from attributes)
  if (meatType) {
    const before = filtered.length;
    const meatTypes = Array.isArray(meatType) ? meatType : [meatType];
    filtered = filtered.filter(p => {
      const productAttributes = Array.isArray(p.attributes) ? p.attributes : [];
      return meatTypes.some(mt => 
        productAttributes.some(attr => attr.toLowerCase().includes(mt.toLowerCase()))
      );
    });
  }

  // Attributes filter
  if (attributes.length > 0) {
    const before = filtered.length;
    filtered = filtered.filter(p => {
      const productAttributes = Array.isArray(p.attributes) ? p.attributes : [];
      return attributes.every(attr => 
        productAttributes.some(pa => pa.toLowerCase() === attr.toLowerCase())
      );
    });
  }

  // Brand filter
  if (brands.length > 0) {
    const before = filtered.length;
    filtered = filtered.filter(p => brands.includes(p.brand));
  }

  // Best seller filter
  if (bestSeller !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.best_seller === bestSeller);
  }

  // On offer filter
  if (on_offer !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.on_offer === on_offer);
  }

  // Seasonal filter
  if (seasonal !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.seasonal === seasonal);
  }

  // Quality tier filter
  if (quality_tier !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.quality_tier === quality_tier);
  }

  // Halal filter
  if (halal !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.halal === halal);
  }

  // Origin filter
  if (origin !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => (p as any).origin === origin);
  }

  // Aging method filter
  if (aging_method !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.aging_method === aging_method);
  }

  // Aging days filter
  if (aging_days !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.aging_days === aging_days);
  }

  // Storage type filter
  if (storage_type !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.storage_info === storage_type);
  }

  // Price range filter
  if (minPrice !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.base_price >= minPrice);
  }
  if (maxPrice !== undefined) {
    const before = filtered.length;
    filtered = filtered.filter(p => p.base_price <= maxPrice);
  }

  // Stock level filter
  if (stock_level) {
    const before = filtered.length;
    filtered = filtered.filter(p => {
      const inventory = p.inventory || {};
      // Get the first (and only) inventory entry
      const inventoryEntry = Object.values(inventory)[0];
      if (!inventoryEntry) {
        return stock_level === 'out';
      }
      return inventoryEntry.stock_level === stock_level;
    });
  }
  
  // Apply inventory filtering and attach availability
  const productsWithAvailability = filtered.map(p => {
    const branchInventory = branchCode && p.inventory[branchCode];
    const allInventories = Object.values(p.inventory || {});
    
    if (branchCode && branchInventory) {
      // Authenticated user: branch-specific inventory
      return {
        ...p,
        availability: {
          at_branch: true,
          branch_name: branchesData.find(b => b.branch_code === branchCode)?.name || '',
          branch_code: branchCode,
          in_stock: branchInventory.in_stock,
          stock_level: branchInventory.stock_level,
          exact_count: branchInventory.exact_count,
          available_for_delivery: branchInventory.available_for_delivery,
          available_for_click_collect: branchInventory.available_for_click_collect,
        },
      };
    } else {
      // Unauthenticated user: aggregate national inventory
      const aggregated = aggregateInventory(allInventories);
      return {
        ...p,
        availability: {
          at_branch: false,
          national: true,
          in_stock: aggregated.in_stock,
          stock_level: aggregated.stock_level,
        },
      };
    }
  });

  // Filter by stock if requested
  let finalProducts = productsWithAvailability;
  if (inStockOnly && branchCode) {
    finalProducts = finalProducts.filter(p => p.availability?.in_stock === true);
  }

  // Apply sorting
  const sortOrder: Record<string, (a: any, b: any) => number> = {
    name_az: (a, b) => a.name.localeCompare(b.name),
    name_za: (a, b) => b.name.localeCompare(a.name),
    price_low: (a, b) => a.base_price - b.base_price,
    price_high: (a, b) => b.base_price - a.base_price,
    newest: (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  };

  if (sortOrder[sortBy]) {
    finalProducts.sort(sortOrder[sortBy]);
  }

  // Pagination
  const total = finalProducts.length;
  const paginated = finalProducts.slice((page - 1) * perPage, page * perPage);

  return {
    products: paginated,
    total,
    page,
    perPage,
  };
}

export function getProductBySku(sku: string, branchCode?: string): Product & { availability?: any } | null {
  const product = (productsData as Product[]).find(p => p.sku === sku && p.active);
  if (!product) return null;

  const branchInventory = branchCode && product.inventory[branchCode];
  const allInventories = Object.values(product.inventory || {});

  if (branchCode && branchInventory) {
    return {
      ...product,
      availability: {
        at_branch: true,
        branch_code: branchCode,
        branch_name: branchesData.find(b => b.branch_code === branchCode)?.name || '',
        in_stock: branchInventory.in_stock,
        stock_level: branchInventory.stock_level,
        exact_count: branchInventory.exact_count,
        available_for_delivery: branchInventory.available_for_delivery,
        available_for_click_collect: branchInventory.available_for_click_collect,
      },
    };
  } else {
    const aggregated = aggregateInventory(allInventories);
    return {
      ...product,
      availability: {
        at_branch: false,
        national: true,
        in_stock: aggregated.in_stock,
        stock_level: aggregated.stock_level,
      },
    };
  }
}

export function searchProducts(query: string, branchCode?: string) {
  const searchLower = query.toLowerCase();
  const allProducts = (productsData as Product[]).filter(p => p.active);
  
  // Score products based on match quality (prioritize startsWith over includes)
  const scored = allProducts.map(p => {
    const nameLower = p.name.toLowerCase();
    const brandLower = p.brand.toLowerCase();
    const skuLower = p.sku.toLowerCase();
    const categoryLower = p.category.toLowerCase();
    const subcategoryLower = p.subcategory?.toLowerCase() || '';
    const shortDescLower = p.descriptions?.short?.toLowerCase() || '';
    const longDescLower = p.descriptions?.long?.toLowerCase() || '';
    
    let score = 0;
    let matches = false;
    
    // Highest priority: starts with query
    if (nameLower.startsWith(searchLower)) {
      score = 1000;
      matches = true;
    } else if (brandLower.startsWith(searchLower)) {
      score = 900;
      matches = true;
    } else if (skuLower.startsWith(searchLower)) {
      score = 800;
      matches = true;
    } else if (categoryLower.startsWith(searchLower)) {
      score = 700;
      matches = true;
    } else if (subcategoryLower.startsWith(searchLower)) {
      score = 600;
      matches = true;
    }
    // Medium priority: contains query
    else if (nameLower.includes(searchLower)) {
      score = 500;
      matches = true;
    } else if (brandLower.includes(searchLower)) {
      score = 400;
      matches = true;
    } else if (skuLower.includes(searchLower)) {
      score = 300;
      matches = true;
    } else if (categoryLower.includes(searchLower)) {
      score = 200;
      matches = true;
    } else if (subcategoryLower.includes(searchLower)) {
      score = 100;
      matches = true;
    } else if (shortDescLower.includes(searchLower) || longDescLower.includes(searchLower)) {
      score = 50;
      matches = true;
    }
    
    return { product: p, score, matches };
  });
  
  // Filter to only matching products and sort by score (highest first)
  const matching = scored
    .filter(item => item.matches)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  return matching.map(p => {
    const branchInventory = branchCode && p.inventory[branchCode];
    if (branchCode && branchInventory) {
      return {
        ...p,
        availability: {
          at_branch: true,
          branch_code: branchCode,
          in_stock: branchInventory.in_stock,
          stock_level: branchInventory.stock_level,
          exact_count: branchInventory.exact_count,
          available_for_delivery: branchInventory.available_for_delivery,
          available_for_click_collect: branchInventory.available_for_click_collect,
        },
      };
    } else {
      const aggregated = aggregateInventory(Object.values(p.inventory || {}));
      return {
        ...p,
        availability: {
          at_branch: false,
          national: true,
          in_stock: aggregated.in_stock,
          stock_level: aggregated.stock_level,
        },
      };
    }
  });
}

