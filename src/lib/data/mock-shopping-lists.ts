export interface ShoppingList {
  id: string;
  name: string;
  description?: string;
  item_count: number;
  estimated_value: number;
  created_at: string;
  updated_at: string;
  items: Array<{
    product_id: string;
    product_name?: string;
    quantity: number;
  }>;
}

export const MOCK_SHOPPING_LISTS: ShoppingList[] = [
  {
    id: 'list-001',
    name: 'WEEKLY ORDER',
    description: 'Standard weekly items',
    item_count: 18,
    estimated_value: 287.50,
    created_at: '2024-11-15',
    updated_at: '2024-11-26',
    items: [
      { product_id: 'prod-001', product_name: 'Organic Chicken Breast 2.5kg', quantity: 2 },
      { product_id: 'prod-002', product_name: 'Winter Root Veg Selection 5kg', quantity: 1 },
      // More items would be here
    ],
  },
];

export function getShoppingLists(userId: string): ShoppingList[] {
  return MOCK_SHOPPING_LISTS;
}

export function getShoppingListById(userId: string, listId: string): ShoppingList | null {
  return MOCK_SHOPPING_LISTS.find(list => list.id === listId) || null;
}


