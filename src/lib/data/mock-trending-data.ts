export interface TrendingProduct {
  product_id: string;
  category: string;
  trend_percent: number; // +124%
  trend_period: string; // "this week"
  social_proof?: {
    similar_businesses_percent: number; // "93% of similar restaurants"
    category: string;
  };
  badge?: 'festive' | 'seasonal' | 'new' | 'popular';
}

export function getTrendingProducts(category?: string): TrendingProduct[] {
  // Mock data - in real implementation, calculate from order frequency
  const trending: TrendingProduct[] = [
    {
      product_id: 'prod-brussels-001',
      category: 'Fresh Produce',
      trend_percent: 124,
      trend_period: 'this week',
      social_proof: {
        similar_businesses_percent: 87,
        category: 'restaurants',
      },
      badge: 'festive',
    },
    {
      product_id: 'prod-turkey-001',
      category: 'Meat & Poultry',
      trend_percent: 247,
      trend_period: 'this week',
      social_proof: {
        similar_businesses_percent: 93,
        category: 'restaurants',
      },
      badge: 'festive',
    },
    {
      product_id: 'prod-cranberry-001',
      category: 'Fresh Produce',
      trend_percent: 198,
      trend_period: 'this week',
      social_proof: {
        similar_businesses_percent: 94,
        category: 'restaurants',
      },
      badge: 'festive',
    },
    {
      product_id: 'prod-champagne-001',
      category: 'Beer, Cider and Alcoholic RTDs',
      trend_percent: 312,
      trend_period: 'this week',
      social_proof: {
        similar_businesses_percent: 78,
        category: 'restaurants',
      },
      badge: 'festive',
    },
  ];

  if (category) {
    return trending.filter(t => t.category === category);
  }
  return trending;
}

export function getTrendingByCategory(): Record<string, TrendingProduct[]> {
  const trending = getTrendingProducts();
  const byCategory: Record<string, TrendingProduct[]> = {};
  
  trending.forEach(product => {
    if (!byCategory[product.category]) {
      byCategory[product.category] = [];
    }
    byCategory[product.category].push(product);
  });
  
  return byCategory;
}


