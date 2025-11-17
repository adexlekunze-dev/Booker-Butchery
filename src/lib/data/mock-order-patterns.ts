export interface OrderPattern {
  day_of_week: string;
  avg_items: number;
  avg_value: number;
  typical_categories: string[];
  frequent_products: Array<{
    product_id: string;
    product_name: string;
    frequency: number; // orders per month
    last_ordered: string;
    days_since_last: number;
  }>;
  typical_tuesday_order: {
    items: number;
    value: number;
    categories: string[];
  };
}

export interface SmartReminder {
  product_name: string;
  category: string;
  usual_day: string;
  days_since_last: number;
  urgency: 'low' | 'medium' | 'high';
}

export interface PreviousOrder {
  id: string;
  order_number: string;
  date: string;
  day_of_week: string;
  items_count: number;
  total_value: number;
  categories: string[];
}

export function getOrderPatterns(userId: string): OrderPattern {
  // Mock data - in real implementation, analyze order history
  return {
    day_of_week: 'Tuesday',
    avg_items: 17,
    avg_value: 287.50,
    typical_categories: ['Fresh Produce', 'Meat & Poultry', 'Dairy & Eggs'],
    frequent_products: [
      { product_id: 'prod-001', product_name: 'Organic Chicken Breast 2.5kg', frequency: 4, last_ordered: '2024-11-26', days_since_last: 6 },
      { product_id: 'prod-002', product_name: 'Winter Root Veg Selection 5kg', frequency: 3, last_ordered: '2024-11-20', days_since_last: 12 },
    ],
    typical_tuesday_order: {
      items: 17,
      value: 287.50,
      categories: ['Fresh Produce', 'Meat & Poultry', 'Dairy & Eggs', 'Beverages', 'Cleaning'],
    },
  };
}

export function getSmartReminders(userId: string): SmartReminder[] {
  return [
    {
      product_name: 'Organic Chicken Breast 2.5kg',
      category: 'Meat & Poultry',
      usual_day: 'Tuesday',
      days_since_last: 6,
      urgency: 'high',
    },
  ];
}

// Mock orders for different days of the week
const MOCK_ORDERS_BY_DAY: Record<string, PreviousOrder[]> = {
  'Monday': [
    {
      id: 'order-mon-001',
      order_number: 'BOK20241125001',
      date: '2024-11-25',
      day_of_week: 'Monday',
      items_count: 28,
      total_value: 445.00,
      categories: ['All categories'],
    },
    {
      id: 'order-mon-002',
      order_number: 'BOK20241118001',
      date: '2024-11-18',
      day_of_week: 'Monday',
      items_count: 25,
      total_value: 410.00,
      categories: ['All categories'],
    },
  ],
  'Tuesday': [
    {
      id: 'order-001',
      order_number: 'BOK20241126001',
      date: '2024-11-26',
      day_of_week: 'Tuesday',
      items_count: 26,
      total_value: 412.00,
      categories: ['All categories'],
    },
    {
      id: 'order-002',
      order_number: 'BOK20241119001',
      date: '2024-11-19',
      day_of_week: 'Tuesday',
      items_count: 24,
      total_value: 398.00,
      categories: ['All categories'],
    },
  ],
  'Wednesday': [
    {
      id: 'order-wed-001',
      order_number: 'BOK20241127001',
      date: '2024-11-27',
      day_of_week: 'Wednesday',
      items_count: 30,
      total_value: 480.00,
      categories: ['All categories'],
    },
    {
      id: 'order-wed-002',
      order_number: 'BOK20241120001',
      date: '2024-11-20',
      day_of_week: 'Wednesday',
      items_count: 27,
      total_value: 425.00,
      categories: ['All categories'],
    },
  ],
  'Thursday': [
    {
      id: 'order-thu-001',
      order_number: 'BOK20241128001',
      date: '2024-11-28',
      day_of_week: 'Thursday',
      items_count: 29,
      total_value: 465.00,
      categories: ['All categories'],
    },
    {
      id: 'order-thu-002',
      order_number: 'BOK20241121001',
      date: '2024-11-21',
      day_of_week: 'Thursday',
      items_count: 25,
      total_value: 405.00,
      categories: ['All categories'],
    },
  ],
  'Friday': [
    {
      id: 'order-fri-001',
      order_number: 'BOK20241129001',
      date: '2024-11-29',
      day_of_week: 'Friday',
      items_count: 32,
      total_value: 510.00,
      categories: ['All categories'],
    },
    {
      id: 'order-fri-002',
      order_number: 'BOK20241122001',
      date: '2024-11-22',
      day_of_week: 'Friday',
      items_count: 28,
      total_value: 445.00,
      categories: ['All categories'],
    },
  ],
  'Saturday': [
    {
      id: 'order-sat-001',
      order_number: 'BOK20241130001',
      date: '2024-11-30',
      day_of_week: 'Saturday',
      items_count: 24,
      total_value: 390.00,
      categories: ['All categories'],
    },
    {
      id: 'order-sat-002',
      order_number: 'BOK20241123001',
      date: '2024-11-23',
      day_of_week: 'Saturday',
      items_count: 22,
      total_value: 375.00,
      categories: ['All categories'],
    },
  ],
  'Sunday': [
    {
      id: 'order-sun-001',
      order_number: 'BOK20241201001',
      date: '2024-12-01',
      day_of_week: 'Sunday',
      items_count: 20,
      total_value: 350.00,
      categories: ['All categories'],
    },
    {
      id: 'order-sun-002',
      order_number: 'BOK20241124001',
      date: '2024-11-24',
      day_of_week: 'Sunday',
      items_count: 18,
      total_value: 320.00,
      categories: ['All categories'],
    },
  ],
};

export function getPreviousOrdersByDay(userId: string, dayName: string, limit: number = 4): PreviousOrder[] {
  // Get orders for the specified day of week
  const orders = MOCK_ORDERS_BY_DAY[dayName] || [];
  return orders.slice(0, limit);
}

export function getPreviousTuesdayOrders(userId: string, limit: number = 4): PreviousOrder[] {
  // Backward compatibility - use dynamic function
  return getPreviousOrdersByDay(userId, 'Tuesday', limit);
}

export function getLastOrder(userId: string, dayName?: string): PreviousOrder | null {
  const orders = dayName 
    ? getPreviousOrdersByDay(userId, dayName, 1)
    : getPreviousTuesdayOrders(userId, 1);
  return orders[0] || null;
}

/**
 * Get the most recent order across all days of the week
 */
export function getMostRecentOrder(userId: string): PreviousOrder | null {
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const allOrders: PreviousOrder[] = [];

  // Collect all orders from all days
  allDays.forEach(day => {
    const dayOrders = getPreviousOrdersByDay(userId, day, 10); // Get more orders per day
    allOrders.push(...dayOrders);
  });

  // Sort by date (most recent first) - assuming date format is 'YYYY-MM-DD'
  allOrders.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order (newest first)
  });

  return allOrders[0] || null;
}

/**
 * Enhanced order pattern interfaces for intelligent suggestions
 */
export interface OrderFrequencyInsight {
  day_of_week: string;
  order_count: number;
  avg_items: number;
  avg_value: number;
  percentage_of_total: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

export interface ProductTrend {
  product_id: string;
  product_name: string;
  category: string;
  orders_last_month: number;
  orders_previous_month: number;
  trend_percentage: number; // positive = increasing, negative = decreasing
  avg_quantity_per_order: number;
  last_ordered_date: string;
  days_since_last_order: number;
}

export interface ReplenishmentSuggestion {
  product_id: string;
  product_name: string;
  category: string;
  typical_reorder_interval_days: number;
  days_since_last_order: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  suggested_quantity: number;
  confidence_score: number; // 0-100
}

export interface SeasonalInsight {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  product_name: string;
  category: string;
  seasonal_boost_percentage: number;
  suggestion: string;
}

export interface SmartOrderSuggestion {
  type: 'running_low' | 'trending_up' | 'popular_today' | 'seasonal' | 'cost_saving';
  priority: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  products: Array<{
    product_id: string;
    product_name: string;
    suggested_quantity?: number;
  }>;
  action_label: string;
}

/**
 * Analyze order frequency across different days of the week
 */
export function getOrderFrequencyAnalysis(userId: string): OrderFrequencyInsight[] {
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const insights: OrderFrequencyInsight[] = [];
  let totalOrders = 0;

  // Calculate total orders first
  allDays.forEach(day => {
    const orders = getPreviousOrdersByDay(userId, day, 100);
    totalOrders += orders.length;
  });

  // Calculate insights for each day
  allDays.forEach(day => {
    const orders = getPreviousOrdersByDay(userId, day, 100);
    const avgItems = orders.length > 0
      ? orders.reduce((sum, o) => sum + o.items_count, 0) / orders.length
      : 0;
    const avgValue = orders.length > 0
      ? orders.reduce((sum, o) => sum + o.total_value, 0) / orders.length
      : 0;
    const percentage = totalOrders > 0 ? (orders.length / totalOrders) * 100 : 0;

    // Determine trend (simplified - could be more sophisticated)
    const trend: 'increasing' | 'stable' | 'decreasing' =
      avgValue > 400 ? 'increasing' : avgValue < 350 ? 'decreasing' : 'stable';

    insights.push({
      day_of_week: day,
      order_count: orders.length,
      avg_items: Math.round(avgItems),
      avg_value: Math.round(avgValue * 100) / 100,
      percentage_of_total: Math.round(percentage * 10) / 10,
      trend,
    });
  });

  return insights.sort((a, b) => b.percentage_of_total - a.percentage_of_total);
}

/**
 * Get trending products based on order frequency changes
 */
export function getTrendingProducts(userId: string): ProductTrend[] {
  // Mock trending products - in real implementation, analyze order history
  const currentDate = new Date('2025-11-16'); // Using the system date from context

  return [
    {
      product_id: 'beef-001',
      product_name: 'Blackgate 28-Day Aged Ribeye Steak 250g',
      category: 'Meat, Fish & Poultry',
      orders_last_month: 8,
      orders_previous_month: 5,
      trend_percentage: 60, // 60% increase
      avg_quantity_per_order: 12,
      last_ordered_date: '2025-11-12',
      days_since_last_order: 4,
    },
    {
      product_id: 'produce-042',
      product_name: 'Brussels Sprouts 2kg',
      category: 'Greengrocery',
      orders_last_month: 6,
      orders_previous_month: 2,
      trend_percentage: 200, // 200% increase (seasonal)
      avg_quantity_per_order: 5,
      last_ordered_date: '2025-11-09',
      days_since_last_order: 7,
    },
    {
      product_id: 'poultry-015',
      product_name: 'Free Range Turkey Crown 3-4kg',
      category: 'Meat, Fish & Poultry',
      orders_last_month: 4,
      orders_previous_month: 0,
      trend_percentage: 400, // New seasonal item
      avg_quantity_per_order: 2,
      last_ordered_date: '2025-11-10',
      days_since_last_order: 6,
    },
  ];
}

/**
 * Get smart replenishment suggestions based on order patterns
 */
export function getReplenishmentSuggestions(userId: string): ReplenishmentSuggestion[] {
  // Mock suggestions - in real implementation, analyze order intervals
  return [
    {
      product_id: 'chicken-001',
      product_name: 'Organic Chicken Breast 2.5kg',
      category: 'Meat, Fish & Poultry',
      typical_reorder_interval_days: 7,
      days_since_last_order: 8,
      urgency: 'high',
      suggested_quantity: 15,
      confidence_score: 92,
    },
    {
      product_id: 'oil-003',
      product_name: 'Extra Virgin Olive Oil 5L',
      category: 'Cooking Ingredients',
      typical_reorder_interval_days: 14,
      days_since_last_order: 16,
      urgency: 'medium',
      suggested_quantity: 2,
      confidence_score: 85,
    },
    {
      product_id: 'cleaning-007',
      product_name: 'Commercial Kitchen Cleaner 5L',
      category: 'Cleaning Supplies',
      typical_reorder_interval_days: 21,
      days_since_last_order: 25,
      urgency: 'critical',
      suggested_quantity: 3,
      confidence_score: 88,
    },
  ];
}

/**
 * Get seasonal insights and suggestions
 */
export function getSeasonalInsights(userId: string): SeasonalInsight[] {
  // Determine current season based on month (simplified)
  const month = new Date().getMonth(); // 0-11
  const season: 'spring' | 'summer' | 'autumn' | 'winter' =
    month >= 2 && month <= 4 ? 'spring' :
    month >= 5 && month <= 7 ? 'summer' :
    month >= 8 && month <= 10 ? 'autumn' : 'winter';

  // Mock seasonal insights
  if (season === 'winter' || season === 'autumn') {
    return [
      {
        season,
        product_name: 'Turkey Crown',
        category: 'Meat, Fish & Poultry',
        seasonal_boost_percentage: 350,
        suggestion: 'Christmas demand - turkey orders up 350%. Consider stocking extra.',
      },
      {
        season,
        product_name: 'Brussels Sprouts',
        category: 'Greengrocery',
        seasonal_boost_percentage: 280,
        suggestion: 'Traditional Christmas vegetable - demand up 280%.',
      },
      {
        season,
        product_name: 'Cranberry Sauce',
        category: 'Condiments',
        seasonal_boost_percentage: 420,
        suggestion: 'Essential Christmas condiment - orders up 420% in December.',
      },
    ];
  }

  return [];
}

/**
 * Get comprehensive smart order suggestions
 */
export function getSmartOrderSuggestions(userId: string): SmartOrderSuggestion[] {
  const suggestions: SmartOrderSuggestion[] = [];
  const replenishmentItems = getReplenishmentSuggestions(userId);
  const trendingItems = getTrendingProducts(userId);
  const seasonalItems = getSeasonalInsights(userId);

  // Running low suggestions (high urgency replenishment)
  const criticalItems = replenishmentItems.filter(item =>
    item.urgency === 'high' || item.urgency === 'critical'
  );
  if (criticalItems.length > 0) {
    suggestions.push({
      type: 'running_low',
      priority: 'high',
      title: 'Running Low',
      message: `${criticalItems.length} items you order regularly haven't been ordered in a while`,
      products: criticalItems.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        suggested_quantity: item.suggested_quantity,
      })),
      action_label: 'Add to Order',
    });
  }

  // Trending up suggestions
  const strongTrends = trendingItems.filter(item => item.trend_percentage > 50);
  if (strongTrends.length > 0) {
    suggestions.push({
      type: 'trending_up',
      priority: 'medium',
      title: 'Trending in Your Orders',
      message: `You're ordering these items ${strongTrends[0].trend_percentage}% more frequently`,
      products: strongTrends.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        suggested_quantity: item.avg_quantity_per_order,
      })),
      action_label: 'Add Trending Items',
    });
  }

  // Seasonal suggestions
  if (seasonalItems.length > 0) {
    suggestions.push({
      type: 'seasonal',
      priority: 'high',
      title: 'Seasonal Demand Alert',
      message: seasonalItems[0].suggestion,
      products: seasonalItems.map(item => ({
        product_id: item.product_name.toLowerCase().replace(/\s+/g, '-'),
        product_name: item.product_name,
      })),
      action_label: 'Stock Seasonal Items',
    });
  }

  // Popular today (mock data based on trending across all customers)
  suggestions.push({
    type: 'popular_today',
    priority: 'low',
    title: 'Popular This Week',
    message: 'These items are trending across professional kitchens',
    products: [
      { product_id: 'beef-blackgate-01', product_name: 'Blackgate Dry-Aged Beef Selection' },
      { product_id: 'produce-seasonal', product_name: 'Winter Root Vegetable Selection' },
    ],
    action_label: 'See Popular Items',
  });

  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

