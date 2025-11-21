// Client-side filter computation functions

import productsData from '@/data/products.json';
import type { Product } from './products';

type FilterOptions = {
  brands: Array<{ label: string; value: string; count: number }>;
  attributes: Array<{ label: string; value: string; count: number }>;
  meat_types?: Array<{ label: string; value: string; count: number }>;
  categories?: Array<{ label: string; value: string; count: number }>;
  subcategories?: Array<{ label: string; value: string; count: number }>;
  quality_tiers?: Array<{ label: string; value: string; count: number }>;
  halal_options?: Array<{ label: string; value: string; count: number }>;
  origins?: Array<{ label: string; value: string; count: number }>;
  aging_methods?: Array<{ label: string; value: string; count: number }>;
  aging_days?: Array<{ label: string; value: number; count: number }>;
  storage_types?: Array<{ label: string; value: string; count: number }>;
  best_seller: { count: number };
  on_offer: { count: number };
  price_ranges: Array<{ label: string; value: string; min?: number; max?: number; count: number }>;
  stock_levels?: Array<{ label: string; value: string; count: number }>;
};

type FilterParams = {
  category?: string;
  subcategory?: string;
  attributes?: string[];
  brands?: string[];
  on_offer?: boolean;
  bestSeller?: boolean;
  minPrice?: number;
  maxPrice?: number;
  meatType?: string | string[];
  branchCode?: string;
  sectors?: string | string[];
  quality_tier?: string;
  halal?: boolean;
  origin?: string;
  aging_method?: string;
  aging_days?: number;
  storage_type?: string;
  stock_level?: string;
};

export function getFilterOptions(
  category: string | null, 
  branchCode?: string,
  currentFilters?: FilterParams
): FilterOptions {
  // Start with all active products
  let baseProducts = (productsData as Product[]).filter(p => p.active);
  
  // Apply sector filter first (if provided)
  if (currentFilters?.sectors) {
    const sectorArray = Array.isArray(currentFilters.sectors) ? currentFilters.sectors : [currentFilters.sectors];
    baseProducts = baseProducts.filter(p => {
      const productSectors = Array.isArray(p.sectors) ? p.sectors : [];
      return sectorArray.some(sector => productSectors.includes(sector));
    });
  }
  
  // Apply category filter if specified
  if (category) {
    baseProducts = baseProducts.filter(p => p.category.toUpperCase() === category.toUpperCase());
  } else if (currentFilters?.category) {
    // If no category param but currentFilters has category, use that
    baseProducts = baseProducts.filter(p => p.category.toUpperCase() === currentFilters.category.toUpperCase());
  }
  // If category is null and no category in currentFilters, include all categories
  
  // Apply current filters to get the filtered product set
  // But we'll calculate each filter type excluding itself
  const getFilteredProducts = (excludeFilter?: 'brands' | 'attributes' | 'price' | 'on_offer' | 'best_seller' | 'meat_type' | 'category' | 'subcategory' | 'quality_tier' | 'halal' | 'origin' | 'aging_method' | 'aging_days' | 'storage_type' | 'stock_level') => {
    let filtered = [...baseProducts];
    
    // Apply sector filter (already done in baseProducts, but keep for consistency)
    if (currentFilters?.sectors) {
      const sectorArray = Array.isArray(currentFilters.sectors) ? currentFilters.sectors : [currentFilters.sectors];
      filtered = filtered.filter(p => {
        const productSectors = Array.isArray(p.sectors) ? p.sectors : [];
        return sectorArray.some(sector => productSectors.includes(sector));
      });
    }
    
    // Apply category filter (already done, but keep for consistency)
    if (currentFilters?.category && !category) {
      filtered = filtered.filter(p => p.category === currentFilters.category);
    }
    
    // Apply subcategory filter (unless we're calculating subcategory counts)
    if (currentFilters?.subcategory && excludeFilter !== 'subcategory') {
      filtered = filtered.filter(p => p.subcategory === currentFilters.subcategory);
    }
    
    // Apply brand filter (unless we're calculating brand counts)
    if (currentFilters?.brands && currentFilters.brands.length > 0 && excludeFilter !== 'brands') {
      filtered = filtered.filter(p => currentFilters.brands!.includes(p.brand));
    }
    
    // Apply attribute filters (unless we're calculating attribute counts)
    if (currentFilters?.attributes && currentFilters.attributes.length > 0 && excludeFilter !== 'attributes') {
      filtered = filtered.filter(p => {
        const productAttrs = Array.isArray(p.attributes) ? p.attributes : [];
        return currentFilters.attributes!.every(attr =>
          productAttrs.some(pa => pa.toLowerCase() === attr.toLowerCase())
        );
      });
    }
    
    // Apply on_offer filter (unless we're calculating on_offer count)
    if (currentFilters?.on_offer !== undefined && excludeFilter !== 'on_offer') {
      filtered = filtered.filter(p => p.on_offer === currentFilters.on_offer);
    }
    
    // Apply bestSeller filter (unless we're calculating best_seller count)
    if (currentFilters?.bestSeller !== undefined && excludeFilter !== 'best_seller') {
      filtered = filtered.filter(p => p.best_seller === currentFilters.bestSeller);
    }
    
    // Apply price range filter (unless we're calculating price counts)
    if (excludeFilter !== 'price') {
      if (currentFilters?.minPrice !== undefined) {
        filtered = filtered.filter(p => p.base_price >= currentFilters.minPrice!);
      }
      if (currentFilters?.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.base_price <= currentFilters.maxPrice!);
      }
    }
    
    // Apply meat type filter (unless we're calculating meat_type counts)
    if (currentFilters?.meatType && excludeFilter !== 'meat_type') {
      const meatTypes = Array.isArray(currentFilters.meatType) ? currentFilters.meatType : [currentFilters.meatType];
      filtered = filtered.filter(p => {
        const productAttrs = Array.isArray(p.attributes) ? p.attributes : [];
        return meatTypes.some(mt => 
          productAttrs.some(attr => attr.toLowerCase().includes(mt.toLowerCase())) ||
          p.subcategory.toLowerCase().includes(mt.toLowerCase())
        );
      });
    }
    
    // Apply quality_tier filter (unless we're calculating quality_tier counts)
    if (currentFilters?.quality_tier && excludeFilter !== 'quality_tier') {
      filtered = filtered.filter(p => (p as any).quality_tier === currentFilters.quality_tier);
    }

    // Apply halal filter (unless we're calculating halal counts)
    if (currentFilters?.halal !== undefined && excludeFilter !== 'halal') {
      filtered = filtered.filter(p => (p as any).halal === currentFilters.halal);
    }

    // Apply origin filter (unless we're calculating origin counts)
    if (currentFilters?.origin && excludeFilter !== 'origin') {
      filtered = filtered.filter(p => (p as any).origin === currentFilters.origin);
    }

    // Apply aging_method filter (unless we're calculating aging_method counts)
    if (currentFilters?.aging_method && excludeFilter !== 'aging_method') {
      filtered = filtered.filter(p => (p as any).aging_method === currentFilters.aging_method);
    }

    // Apply aging_days filter (unless we're calculating aging_days counts)
    if (currentFilters?.aging_days !== undefined && excludeFilter !== 'aging_days') {
      filtered = filtered.filter(p => (p as any).aging_days === currentFilters.aging_days);
    }

    // Apply storage_type filter (unless we're calculating storage_type counts)
    if (currentFilters?.storage_type && excludeFilter !== 'storage_type') {
      filtered = filtered.filter(p => (p as any).storage_info === currentFilters.storage_type);
    }

    // Apply stock_level filter (unless we're calculating stock_level counts)
    if (currentFilters?.stock_level && excludeFilter !== 'stock_level') {
      filtered = filtered.filter(p => {
        const inventory = p.inventory || {};
        const inventoryEntry = Object.values(inventory)[0];
        if (!inventoryEntry) {
          return currentFilters.stock_level === 'out';
        }
        return inventoryEntry.stock_level === currentFilters.stock_level;
      });
    }

    // Note: Branch inventory filtering removed for single-branch prototype
    // All products have MAN001 inventory, so no filtering needed

    return filtered;
  };

  // Get base filtered products (with all current filters applied)
  const baseFilteredProducts = getFilteredProducts();

  // Brand counts - exclude brand filters when calculating
  const brandProducts = getFilteredProducts('brands');
  const brandMap = new Map<string, number>();
  brandProducts.forEach(p => {
    const count = brandMap.get(p.brand) || 0;
    brandMap.set(p.brand, count + 1);
  });
  
  // Include all brands that exist in the base category (for showing all options)
  baseProducts.forEach(p => {
    if (!brandMap.has(p.brand)) {
      brandMap.set(p.brand, 0);
    }
  });
  
  const brands = Array.from(brandMap.entries())
    .map(([value, count]) => ({
      label: value,
      value,
      count,
    }))
    .sort((a, b) => {
      if (a.count > 0 && b.count === 0) return -1;
      if (a.count === 0 && b.count > 0) return 1;
      return a.label.localeCompare(b.label);
    });

  // Attribute counts - exclude attribute filters when calculating
  const attributeProducts = getFilteredProducts('attributes');
  const attributeMap = new Map<string, number>();
  attributeProducts.forEach(p => {
    const attrs = Array.isArray(p.attributes) ? p.attributes : [];
    attrs.forEach(attr => {
      const count = attributeMap.get(attr) || 0;
      attributeMap.set(attr, count + 1);
    });
  });

  // Collect all unique attributes from base products to show all options
  const allUniqueAttributes = new Set<string>();
  baseProducts.forEach(p => {
    const attrs = Array.isArray(p.attributes) ? p.attributes : [];
    attrs.forEach(attr => allUniqueAttributes.add(attr.toLowerCase()));
  });
  
  // Include all attributes that exist in the base category (even with 0 counts)
  allUniqueAttributes.forEach(attr => {
    if (!attributeMap.has(attr)) {
      attributeMap.set(attr, 0);
    }
  });

  const attributes = Array.from(attributeMap.entries())
    .map(([value, count]) => ({
      label: value.charAt(0).toUpperCase() + value.slice(1).replace('-', ' '),
      value: value.toLowerCase(),
      count,
    }))
    .sort((a, b) => {
      if (a.count > 0 && b.count === 0) return -1;
      if (a.count === 0 && b.count > 0) return 1;
      return a.label.localeCompare(b.label);
    });

  // Meat types (for Meat category only) - exclude meat_type filters when calculating
  let meatTypes: Array<{ label: string; value: string; count: number }> = [];
  const effectiveCategory = category || currentFilters?.category;
  // Show meat types if category is Meat, or if no category (all categories) and we have meat products
  const showMeatTypes = effectiveCategory === 'Meat, Fish & Poultry' || (!effectiveCategory && baseProducts.some(p => p.category === 'Meat, Fish & Poultry'));
  if (showMeatTypes) {
    const meatTypeProducts = getFilteredProducts('meat_type');
    const meatTypeMap = new Map<string, number>();
    meatTypeProducts.forEach(p => {
      const attrs = Array.isArray(p.attributes) ? p.attributes : [];
      // Extract meat type from attributes or subcategory
      let meatType = '';
      if (attrs.some(a => a.toLowerCase().includes('beef'))) meatType = 'beef';
      else if (attrs.some(a => a.toLowerCase().includes('lamb'))) meatType = 'lamb';
      else if (attrs.some(a => a.toLowerCase().includes('pork'))) meatType = 'pork';
      else if (attrs.some(a => a.toLowerCase().includes('chicken')) || p.subcategory.includes('Poultry')) meatType = 'poultry';
      else if (p.subcategory.includes('Beef')) meatType = 'beef';
      else if (p.subcategory.includes('Lamb')) meatType = 'lamb';
      else if (p.subcategory.includes('Pork')) meatType = 'pork';
      
      if (meatType) {
        const count = meatTypeMap.get(meatType) || 0;
        meatTypeMap.set(meatType, count + 1);
      }
    });

    meatTypes = Array.from(meatTypeMap.entries())
      .map(([value, count]) => ({
        label: value.charAt(0).toUpperCase() + value.slice(1),
        value,
        count,
      }))
      .sort((a, b) => {
        if (a.count > 0 && b.count === 0) return -1;
        if (a.count === 0 && b.count > 0) return 1;
        return a.label.localeCompare(b.label);
      });
  }

  // Best seller count - exclude best_seller filter when calculating
  const bestSellerProducts = getFilteredProducts('best_seller');
  const bestSellerCount = bestSellerProducts.filter(p => p.best_seller).length;

  // On offer count - exclude on_offer filter when calculating
  const onOfferProducts = getFilteredProducts('on_offer');
  const onOfferCount = onOfferProducts.filter(p => p.on_offer).length;

  // Price ranges with counts - exclude price filter when calculating
  const priceProducts = getFilteredProducts('price');
  const priceRanges = [
    { label: 'Under £10', value: 'under-10', min: 0, max: 10 },
    { label: '£10 - £20', value: '10-20', min: 10, max: 20 },
    { label: '£20 - £30', value: '20-30', min: 20, max: 30 },
    { label: '£30 - £50', value: '30-50', min: 30, max: 50 },
    { label: 'Over £50', value: 'over-50', min: 50, max: undefined },
  ].map(range => {
    const count = priceProducts.filter(p => {
      if (range.min !== undefined && p.base_price < range.min) return false;
      if (range.max !== undefined && p.base_price >= range.max) return false;
      if (range.max === undefined && p.base_price < range.min!) return false;
      return true;
    }).length;
    return { ...range, count };
  });

  // Category counts (for butchery filter - when showing all products)
  const categoryProducts = getFilteredProducts('category' as any);
  const categoryMap = new Map<string, number>();
  categoryProducts.forEach(p => {
    const count = categoryMap.get(p.category) || 0;
    categoryMap.set(p.category, count + 1);
  });

  const categories = Array.from(categoryMap.entries())
    .map(([value, count]) => ({
      label: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), // Title Case: BEEF -> Beef
      value,
      count,
    }))
    .filter(c => c.count > 0)
    .sort((a, b) => b.count - a.count);

  // Quality tier counts (for butchery products)
  const qualityTierProducts = getFilteredProducts('quality_tier' as any);
  const qualityTierMap = new Map<string, number>();
  qualityTierProducts.forEach(p => {
    const tier = (p as any).quality_tier;
    if (tier) {
      const count = qualityTierMap.get(tier) || 0;
      qualityTierMap.set(tier, count + 1);
    }
  });

  const qualityTiers = Array.from(qualityTierMap.entries())
    .map(([value, count]) => ({
      label: value,
      value,
      count,
    }))
    .filter(qt => qt.count > 0)
    .sort((a, b) => {
      const order = ['Premium', 'Standard', 'Value'];
      return order.indexOf(a.value) - order.indexOf(b.value);
    });

  // Halal options (for butchery products)
  const halalProducts = getFilteredProducts('halal' as any);
  const halalCount = halalProducts.filter(p => (p as any).halal === true).length;
  const nonHalalCount = halalProducts.filter(p => !(p as any).halal).length;

  const halalOptions = [
    { label: 'Halal Certified', value: 'true', count: halalCount },
    { label: 'Non-Halal', value: 'false', count: nonHalalCount },
  ].filter(h => h.count > 0);

  // Origin counts (for butchery products)
  const originProducts = getFilteredProducts('origin' as any);
  const originMap = new Map<string, number>();
  originProducts.forEach(p => {
    const origin = (p as any).origin;
    if (origin) {
      const count = originMap.get(origin) || 0;
      originMap.set(origin, count + 1);
    }
  });

  const origins = Array.from(originMap.entries())
    .map(([value, count]) => ({
      label: value,
      value,
      count,
    }))
    .filter(o => o.count > 0)
    .sort((a, b) => b.count - a.count);

  // Subcategory counts (Cut Type - for butchery products)
  const subcategoryProducts = getFilteredProducts('subcategory' as any);
  const subcategoryMap = new Map<string, number>();
  subcategoryProducts.forEach(p => {
    const subcategory = p.subcategory;
    if (subcategory) {
      const count = subcategoryMap.get(subcategory) || 0;
      subcategoryMap.set(subcategory, count + 1);
    }
  });

  const subcategories = Array.from(subcategoryMap.entries())
    .map(([value, count]) => ({
      label: value,
      value,
      count,
    }))
    .filter(s => s.count > 0)
    .sort((a, b) => b.count - a.count);

  // Aging method counts (for premium aged products)
  const agingMethodProducts = getFilteredProducts('aging_method' as any);
  const agingMethodMap = new Map<string, number>();
  agingMethodProducts.forEach(p => {
    const method = (p as any).aging_method;
    if (method) {
      const count = agingMethodMap.get(method) || 0;
      agingMethodMap.set(method, count + 1);
    }
  });

  const agingMethods = Array.from(agingMethodMap.entries())
    .map(([value, count]) => ({
      label: value,
      value,
      count,
    }))
    .filter(a => a.count > 0)
    .sort((a, b) => a.label.localeCompare(b.label));

  // Aging days counts (for aged products)
  const agingDaysProducts = getFilteredProducts('aging_days' as any);
  const agingDaysMap = new Map<number, number>();
  agingDaysProducts.forEach(p => {
    const days = (p as any).aging_days;
    if (days !== undefined && days !== null) {
      const count = agingDaysMap.get(days) || 0;
      agingDaysMap.set(days, count + 1);
    }
  });

  const agingDays = Array.from(agingDaysMap.entries())
    .map(([value, count]) => ({
      label: `${value} days`,
      value,
      count,
    }))
    .filter(a => a.count > 0)
    .sort((a, b) => b.value - a.value); // Sort by days descending (32, 28, 21, 14)

  // Storage type counts (for storage planning)
  const storageTypeProducts = getFilteredProducts('storage_type' as any);
  const storageTypeMap = new Map<string, number>();
  const validStorageTypes = ['Chill', 'Frozen', 'Ambient']; // Only include clean values

  storageTypeProducts.forEach(p => {
    const storage = (p as any).storage_info;
    if (storage && validStorageTypes.includes(storage)) {
      const count = storageTypeMap.get(storage) || 0;
      storageTypeMap.set(storage, count + 1);
    }
  });

  const storageTypes = Array.from(storageTypeMap.entries())
    .map(([value, count]) => ({
      label: value,
      value,
      count,
    }))
    .filter(s => s.count > 0)
    .sort((a, b) => {
      // Sort by priority: Chill, Frozen, Ambient
      const order = ['Chill', 'Frozen', 'Ambient'];
      return order.indexOf(a.value) - order.indexOf(b.value);
    });

  // Stock level counts
  const stockLevelProducts = getFilteredProducts('stock_level' as any);
  const stockLevelCounts: Record<string, number> = {
    high: 0,
    medium: 0,
    low: 0,
    out: 0,
  };

  stockLevelProducts.forEach(p => {
    const inventory = p.inventory || {};
    const inventoryEntry = Object.values(inventory)[0];
    const stockLevel = inventoryEntry?.stock_level || 'out';
    if (stockLevel in stockLevelCounts) {
      stockLevelCounts[stockLevel]++;
    }
  });

  const stockLevels = [
    { label: 'High Stock', value: 'high', count: stockLevelCounts.high },
    { label: 'Medium Stock', value: 'medium', count: stockLevelCounts.medium },
    { label: 'Low Stock', value: 'low', count: stockLevelCounts.low },
    { label: 'Out of Stock', value: 'out', count: stockLevelCounts.out },
  ].filter(level => level.count > 0);

  return {
    brands,
    attributes,
    ...(meatTypes.length > 0 && { meat_types: meatTypes }),
    ...(categories.length > 0 && { categories }),
    ...(stockLevels.length > 0 && { stock_levels: stockLevels }),
    ...(subcategories.length > 0 && { subcategories }),
    ...(qualityTiers.length > 0 && { quality_tiers: qualityTiers }),
    ...(halalOptions.length > 0 && { halal_options: halalOptions }),
    ...(origins.length > 0 && { origins }),
    ...(agingMethods.length > 0 && { aging_methods: agingMethods }),
    ...(agingDays.length > 0 && { aging_days: agingDays }),
    ...(storageTypes.length > 0 && { storage_types: storageTypes }),
    best_seller: { count: bestSellerCount },
    on_offer: { count: onOfferCount },
    price_ranges: priceRanges,
  };
}

