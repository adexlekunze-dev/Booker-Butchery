// localStorage-based basket management
// Replaces database-backed basket for frontend-only operation

import type { Product } from './data/products';
import { getProductBySku } from './data/products';

const STORAGE_KEY = 'booker_basket';

export type BasketItem = {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  brand: string;
  quantity: number;
  unit_price: number;
  pack_size?: string;
  images: string[];
  fulfillment: {
    method: 'delivery' | 'click_collect';
    branch_code?: string;
  };
};

function generateId(): string {
  return `basket_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getBasket(): BasketItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const basketStr = localStorage.getItem(STORAGE_KEY);
    if (!basketStr) return [];
    return JSON.parse(basketStr);
  } catch {
    return [];
  }
}

export function addToBasket(
  sku: string,
  quantity: number = 1,
  fulfillment: BasketItem['fulfillment'] = { method: 'delivery' }
): { success: boolean; error?: string } {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available' };
  }
  
  const product = getProductBySku(sku);
  if (!product) {
    return { success: false, error: 'Product not found' };
  }
  
  // Check stock if branch-specific
  if (fulfillment.branch_code) {
    const inventory = product.inventory[fulfillment.branch_code];
    if (!inventory || !inventory.in_stock) {
      return { success: false, error: 'Product not available at your branch' };
    }
  }
  
  const basket = getBasket();
  const existingIndex = basket.findIndex(item => item.sku === sku && 
    item.fulfillment.method === fulfillment.method &&
    item.fulfillment.branch_code === fulfillment.branch_code
  );
  
  if (existingIndex >= 0) {
    // Update existing item
    basket[existingIndex].quantity += quantity;
  } else {
    // Add new item
    basket.push({
      id: generateId(),
      product_id: product.id,
      sku: product.sku,
      name: product.name,
      brand: product.brand,
      quantity,
      unit_price: product.base_price,
      pack_size: product.pack_size,
      images: product.images,
      fulfillment,
    });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
  return { success: true };
}

export function updateBasketItem(id: string, quantity: number): { success: boolean; error?: string } {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available' };
  }
  
  if (quantity <= 0) {
    return removeFromBasket(id);
  }
  
  const basket = getBasket();
  const itemIndex = basket.findIndex(item => item.id === id);
  
  if (itemIndex < 0) {
    return { success: false, error: 'Item not found' };
  }
  
  basket[itemIndex].quantity = quantity;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
  return { success: true };
}

export function removeFromBasket(id: string): { success: boolean; error?: string } {
  if (typeof window === 'undefined') {
    return { success: false, error: 'Not available' };
  }
  
  const basket = getBasket();
  const filtered = basket.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return { success: true };
}

export function clearBasket(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getBasketItemCount(): number {
  const basket = getBasket();
  return basket.reduce((sum, item) => sum + item.quantity, 0);
}

export function getBasketTotal(): number {
  const basket = getBasket();
  return basket.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
}

