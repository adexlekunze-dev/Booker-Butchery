// Client-side utility for tracking recently viewed products
const STORAGE_KEY = "booker_recently_viewed";
const MAX_ITEMS = 20;

export interface RecentlyViewedProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  base_price: number;
  images: string[];
  viewedAt: string;
}

// Check if running in browser
const isBrowser = typeof window !== "undefined";

export function addView(product: Omit<RecentlyViewedProduct, "viewedAt">): void {
  if (!isBrowser) return;

  try {
    const existing = getRecentlyViewed();
    
    // Remove if already exists
    const filtered = existing.filter((p) => p.id !== product.id);
    
    // Add to front with timestamp
    const updated = [
      { ...product, viewedAt: new Date().toISOString() },
      ...filtered
    ].slice(0, MAX_ITEMS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Error saving recently viewed product:", error);
  }
}

export function getRecentlyViewed(): RecentlyViewedProduct[] {
  if (!isBrowser) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const items = JSON.parse(stored) as RecentlyViewedProduct[];
    return items.filter((item) => {
      // Remove items older than 30 days
      const viewedDate = new Date(item.viewedAt);
      const daysSince = (Date.now() - viewedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince < 30;
    });
  } catch (error) {
    console.error("Error loading recently viewed products:", error);
    return [];
  }
}

export function clearHistory(): void {
  if (!isBrowser) return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing recently viewed history:", error);
  }
}

export function getRecentlyViewedIds(): string[] {
  return getRecentlyViewed().map((p) => p.id);
}

