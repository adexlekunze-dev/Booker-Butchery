/**
 * Standing Orders System - Mock Data
 * Recurring automatic orders for predictable business needs
 */

export type OrderFrequency = 'weekly' | 'bi-weekly' | 'monthly' | 'custom';
export type DeliveryDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type StandingOrderStatus = 'active' | 'paused' | 'cancelled';

export interface StandingOrderItem {
  product_id: string;
  product_name: string;
  category: string;
  quantity: number;
  unit_price: number;
  notes?: string;
}

export interface StandingOrder {
  id: string;
  name: string;
  description?: string;
  status: StandingOrderStatus;
  frequency: OrderFrequency;
  delivery_day: DeliveryDay;
  items: StandingOrderItem[];
  total_items: number;
  estimated_value: number;
  next_delivery_date: string;
  last_delivery_date?: string;
  created_date: string;
  delivery_count: number;
  auto_adjust_quantities: boolean; // AI-based quantity adjustment
  notify_before_processing: boolean; // Send notification 48h before processing
  skip_on_holidays: boolean;
  paused_until?: string; // Date when it will resume if paused
}

export interface UpcomingDelivery {
  standing_order_id: string;
  standing_order_name: string;
  scheduled_date: string;
  estimated_value: number;
  items_count: number;
  can_skip: boolean;
  can_modify: boolean;
  status: 'scheduled' | 'processing' | 'skipped';
}

export interface StandingOrderHistory {
  id: string;
  standing_order_id: string;
  standing_order_name: string;
  delivery_date: string;
  order_number: string;
  total_value: number;
  items_count: number;
  status: 'completed' | 'skipped' | 'failed';
  modifications?: string; // Description of any changes made
}

/**
 * Mock standing orders data
 */
const MOCK_STANDING_ORDERS: Record<string, StandingOrder[]> = {
  'user-test-001': [
    {
      id: 'standing-001',
      name: 'Weekly Fresh Produce',
      description: 'Regular fresh vegetables and herbs for weekly menu',
      status: 'active',
      frequency: 'weekly',
      delivery_day: 'Tuesday',
      items: [
        {
          product_id: 'produce-potatoes',
          product_name: 'Maris Piper Potatoes 25kg',
          category: 'Greengrocery',
          quantity: 2,
          unit_price: 18.50,
          notes: 'For mash and roasties',
        },
        {
          product_id: 'produce-carrots',
          product_name: 'British Carrots 5kg',
          category: 'Greengrocery',
          quantity: 3,
          unit_price: 8.75,
        },
        {
          product_id: 'produce-onions',
          product_name: 'Brown Onions 10kg',
          category: 'Greengrocery',
          quantity: 2,
          unit_price: 12.00,
        },
        {
          product_id: 'herbs-mixed',
          product_name: 'Fresh Mixed Herbs Bundle',
          category: 'Greengrocery',
          quantity: 4,
          unit_price: 6.50,
        },
      ],
      total_items: 11,
      estimated_value: 109.25,
      next_delivery_date: '2025-11-19',
      last_delivery_date: '2025-11-12',
      created_date: '2024-08-01',
      delivery_count: 42,
      auto_adjust_quantities: true,
      notify_before_processing: true,
      skip_on_holidays: true,
    },
    {
      id: 'standing-002',
      name: 'Bi-Weekly Meat Order',
      description: 'Core meat supplies - chicken and beef',
      status: 'active',
      frequency: 'bi-weekly',
      delivery_day: 'Thursday',
      items: [
        {
          product_id: 'chicken-breast-001',
          product_name: 'Organic Chicken Breast 2.5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 6,
          unit_price: 28.00,
        },
        {
          product_id: 'beef-mince-001',
          product_name: 'Premium Beef Mince 20% Fat 5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 4,
          unit_price: 32.50,
        },
        {
          product_id: 'bacon-streaky-001',
          product_name: 'Streaky Bacon 2.5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 3,
          unit_price: 22.00,
        },
      ],
      total_items: 13,
      estimated_value: 364.00,
      next_delivery_date: '2025-11-21',
      last_delivery_date: '2025-11-07',
      created_date: '2024-06-15',
      delivery_count: 24,
      auto_adjust_quantities: false,
      notify_before_processing: true,
      skip_on_holidays: true,
    },
    {
      id: 'standing-003',
      name: 'Monthly Dry Goods Restock',
      description: 'Oils, seasonings, and kitchen essentials',
      status: 'active',
      frequency: 'monthly',
      delivery_day: 'Monday',
      items: [
        {
          product_id: 'oil-olive-001',
          product_name: 'Extra Virgin Olive Oil 5L',
          category: 'Cooking Ingredients',
          quantity: 2,
          unit_price: 45.00,
        },
        {
          product_id: 'oil-vegetable-001',
          product_name: 'Vegetable Oil 20L',
          category: 'Cooking Ingredients',
          quantity: 1,
          unit_price: 35.00,
        },
        {
          product_id: 'salt-rock-001',
          product_name: 'Rock Salt 5kg',
          category: 'Cooking Ingredients',
          quantity: 2,
          unit_price: 8.50,
        },
        {
          product_id: 'pepper-black-001',
          product_name: 'Black Peppercorns 1kg',
          category: 'Cooking Ingredients',
          quantity: 2,
          unit_price: 12.00,
        },
      ],
      total_items: 7,
      estimated_value: 166.00,
      next_delivery_date: '2025-12-02',
      last_delivery_date: '2025-11-04',
      created_date: '2024-05-10',
      delivery_count: 18,
      auto_adjust_quantities: false,
      notify_before_processing: true,
      skip_on_holidays: false,
    },
    {
      id: 'standing-004',
      name: 'Friday Fish Delivery',
      description: 'Fresh fish for Friday fish & chips special',
      status: 'paused',
      frequency: 'weekly',
      delivery_day: 'Friday',
      items: [
        {
          product_id: 'fish-cod-001',
          product_name: 'Fresh Cod Fillets 5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 4,
          unit_price: 42.00,
        },
        {
          product_id: 'fish-haddock-001',
          product_name: 'Fresh Haddock Fillets 5kg',
          category: 'Meat, Fish & Poultry',
          quantity: 3,
          unit_price: 38.00,
        },
      ],
      total_items: 7,
      estimated_value: 282.00,
      next_delivery_date: '2025-12-15',
      last_delivery_date: '2025-10-25',
      created_date: '2024-03-01',
      delivery_count: 32,
      auto_adjust_quantities: false,
      notify_before_processing: true,
      skip_on_holidays: true,
      paused_until: '2025-12-15',
    },
  ],
};

/**
 * Mock upcoming deliveries
 */
const MOCK_UPCOMING_DELIVERIES: Record<string, UpcomingDelivery[]> = {
  'user-test-001': [
    {
      standing_order_id: 'standing-001',
      standing_order_name: 'Weekly Fresh Produce',
      scheduled_date: '2025-11-19',
      estimated_value: 109.25,
      items_count: 11,
      can_skip: true,
      can_modify: true,
      status: 'scheduled',
    },
    {
      standing_order_id: 'standing-002',
      standing_order_name: 'Bi-Weekly Meat Order',
      scheduled_date: '2025-11-21',
      estimated_value: 364.00,
      items_count: 13,
      can_skip: true,
      can_modify: true,
      status: 'scheduled',
    },
    {
      standing_order_id: 'standing-001',
      standing_order_name: 'Weekly Fresh Produce',
      scheduled_date: '2025-11-26',
      estimated_value: 109.25,
      items_count: 11,
      can_skip: true,
      can_modify: true,
      status: 'scheduled',
    },
  ],
};

/**
 * Mock delivery history
 */
const MOCK_DELIVERY_HISTORY: Record<string, StandingOrderHistory[]> = {
  'user-test-001': [
    {
      id: 'hist-001',
      standing_order_id: 'standing-001',
      standing_order_name: 'Weekly Fresh Produce',
      delivery_date: '2025-11-12',
      order_number: 'BOK20251112001',
      total_value: 109.25,
      items_count: 11,
      status: 'completed',
    },
    {
      id: 'hist-002',
      standing_order_id: 'standing-002',
      standing_order_name: 'Bi-Weekly Meat Order',
      delivery_date: '2025-11-07',
      order_number: 'BOK20251107001',
      total_value: 364.00,
      items_count: 13,
      status: 'completed',
    },
    {
      id: 'hist-003',
      standing_order_id: 'standing-001',
      standing_order_name: 'Weekly Fresh Produce',
      delivery_date: '2025-11-05',
      order_number: 'BOK20251105001',
      total_value: 109.25,
      items_count: 11,
      status: 'completed',
    },
    {
      id: 'hist-004',
      standing_order_id: 'standing-003',
      standing_order_name: 'Monthly Dry Goods Restock',
      delivery_date: '2025-11-04',
      order_number: 'BOK20251104001',
      total_value: 166.00,
      items_count: 7,
      status: 'completed',
    },
    {
      id: 'hist-005',
      standing_order_id: 'standing-001',
      standing_order_name: 'Weekly Fresh Produce',
      delivery_date: '2025-10-29',
      order_number: 'BOK20251029001',
      total_value: 109.25,
      items_count: 11,
      status: 'completed',
      modifications: 'Potatoes quantity increased from 2 to 3',
    },
    {
      id: 'hist-006',
      standing_order_id: 'standing-004',
      standing_order_name: 'Friday Fish Delivery',
      delivery_date: '2025-10-25',
      order_number: '-',
      total_value: 0,
      items_count: 0,
      status: 'skipped',
    },
  ],
};

/**
 * Get all standing orders for a user
 */
export function getStandingOrders(userId: string): StandingOrder[] {
  return MOCK_STANDING_ORDERS[userId] || [];
}

/**
 * Get active standing orders only
 */
export function getActiveStandingOrders(userId: string): StandingOrder[] {
  const orders = getStandingOrders(userId);
  return orders.filter(order => order.status === 'active');
}

/**
 * Get a specific standing order by ID
 */
export function getStandingOrderById(userId: string, orderId: string): StandingOrder | null {
  const orders = getStandingOrders(userId);
  return orders.find(order => order.id === orderId) || null;
}

/**
 * Get upcoming deliveries
 */
export function getUpcomingDeliveries(userId: string, limit?: number): UpcomingDelivery[] {
  const deliveries = MOCK_UPCOMING_DELIVERIES[userId] || [];
  // Sort by scheduled date
  const sorted = deliveries.sort((a, b) =>
    new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Get delivery history
 */
export function getDeliveryHistory(userId: string, limit?: number): StandingOrderHistory[] {
  const history = MOCK_DELIVERY_HISTORY[userId] || [];
  // Sort by delivery date descending
  const sorted = history.sort((a, b) =>
    new Date(b.delivery_date).getTime() - new Date(a.delivery_date).getTime()
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

/**
 * Calculate next delivery date based on frequency
 */
export function calculateNextDelivery(
  lastDelivery: string,
  frequency: OrderFrequency,
  deliveryDay: DeliveryDay
): string {
  const last = new Date(lastDelivery);

  switch (frequency) {
    case 'weekly':
      last.setDate(last.getDate() + 7);
      break;
    case 'bi-weekly':
      last.setDate(last.getDate() + 14);
      break;
    case 'monthly':
      last.setMonth(last.getMonth() + 1);
      break;
    default:
      // Custom frequency would need more parameters
      last.setDate(last.getDate() + 7);
  }

  return last.toISOString().split('T')[0];
}

/**
 * Pause a standing order (mock function)
 */
export function pauseStandingOrder(
  userId: string,
  orderId: string,
  pauseUntil?: string
): { success: boolean; message: string } {
  console.log(`Pausing standing order ${orderId} for user ${userId}`, pauseUntil ? `until ${pauseUntil}` : 'indefinitely');
  return { success: true, message: 'Standing order paused successfully' };
}

/**
 * Resume a standing order (mock function)
 */
export function resumeStandingOrder(
  userId: string,
  orderId: string
): { success: boolean; message: string } {
  console.log(`Resuming standing order ${orderId} for user ${userId}`);
  return { success: true, message: 'Standing order resumed successfully' };
}

/**
 * Skip next delivery (mock function)
 */
export function skipNextDelivery(
  userId: string,
  standingOrderId: string,
  deliveryDate: string
): { success: boolean; message: string } {
  console.log(`Skipping delivery for standing order ${standingOrderId} on ${deliveryDate}`);
  return { success: true, message: 'Delivery skipped successfully' };
}

/**
 * Create new standing order (mock function)
 */
export function createStandingOrder(
  userId: string,
  order: Omit<StandingOrder, 'id' | 'created_date' | 'delivery_count'>
): StandingOrder {
  const newOrder: StandingOrder = {
    ...order,
    id: `standing-${Date.now()}`,
    created_date: new Date().toISOString().split('T')[0],
    delivery_count: 0,
  };

  console.log('Creating new standing order:', newOrder);
  return newOrder;
}

/**
 * Calculate total monthly cost from all active standing orders
 */
export function calculateMonthlyCost(userId: string): number {
  const orders = getActiveStandingOrders(userId);

  return orders.reduce((total, order) => {
    let monthlyValue = 0;

    switch (order.frequency) {
      case 'weekly':
        monthlyValue = order.estimated_value * 4.33; // Average weeks per month
        break;
      case 'bi-weekly':
        monthlyValue = order.estimated_value * 2.17; // Average bi-weekly periods per month
        break;
      case 'monthly':
        monthlyValue = order.estimated_value;
        break;
      default:
        monthlyValue = order.estimated_value * 4.33;
    }

    return total + monthlyValue;
  }, 0);
}
