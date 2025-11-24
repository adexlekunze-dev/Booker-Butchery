"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { Button } from "@/components/ui/Button";
import { Copy, RotateCcw, CheckSquare, Target, ArrowRight, ChevronLeft, ChevronRight, TrendingUp, AlertCircle, Sparkles, BarChart3 } from "lucide-react";
import { getNextDeliveryDayName } from "@/lib/utils/dates";
import { getPreviousOrdersByDay, getLastOrder } from "@/lib/data/mock-order-patterns";
import { getOrderPatterns, getSmartOrderSuggestions, getOrderFrequencyAnalysis, getTrendingProducts } from "@/lib/data/mock-order-patterns";
import { getShoppingLists } from "@/lib/data/mock-shopping-lists";
import type { SmartOrderSuggestion, OrderFrequencyInsight, ProductTrend } from "@/lib/data/mock-order-patterns";
import { getProducts, getProductBySku } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import productsData from '@/data/products.json';
import { getRecentlyViewed } from "@/lib/recently-viewed";

// Get all unique categories from products
const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  (productsData as any[]).forEach(product => {
    if (product.category && product.active) {
      categories.add(product.category);
    }
  });
  return Array.from(categories);
};

// Get category priority order based on business type
const getCategoryOrderByBusinessType = (businessType: string): Record<string, number> => {
  // Category priority by business type (lower number = higher priority)
  const priorityMap: Record<string, Record<string, number>> = {
    'restaurant': {
      'Meat, Fish & Poultry': 1,
      'Greengrocery': 2,
      'Beer, Cider and Alcoholic RTDs': 3,
    },
    'pub': {
      'Beer, Cider and Alcoholic RTDs': 1,
      'Meat, Fish & Poultry': 2,
      'Greengrocery': 3,
    },
    'hotel': {
      'Meat, Fish & Poultry': 1,
      'Greengrocery': 2,
      'Beer, Cider and Alcoholic RTDs': 3,
    },
    'takeaway': {
      'Meat, Fish & Poultry': 1,
      'Greengrocery': 2,
      'Beer, Cider and Alcoholic RTDs': 3,
    },
    'cafe': {
      'Greengrocery': 1,
      'Meat, Fish & Poultry': 2,
      'Beer, Cider and Alcoholic RTDs': 3,
    },
    'coffee-shop': {
      'Greengrocery': 1,
      'Meat, Fish & Poultry': 2,
      'Beer, Cider and Alcoholic RTDs': 3,
    },
  };

  // Default priority (if business type not found, use restaurant priority)
  return priorityMap[businessType] || priorityMap['restaurant'];
};

export function QuickReorderHub() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [nextDeliveryDay, setNextDeliveryDay] = useState<string>("");
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [orderPatterns, setOrderPatterns] = useState<any>(null);
  const [shoppingLists, setShoppingLists] = useState<any[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("");
  const [categoryProducts, setCategoryProducts] = useState<Record<string, any[]>>({});
  const [scrollPosition, setScrollPosition] = useState<Record<string, number>>({});
  const [canScrollRight, setCanScrollRight] = useState<Record<string, boolean>>({});
  const [smartSuggestions, setSmartSuggestions] = useState<SmartOrderSuggestion[]>([]);
  const [frequencyInsights, setFrequencyInsights] = useState<OrderFrequencyInsight[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<ProductTrend[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [recommendationScrollPosition, setRecommendationScrollPosition] = useState(0);
  const [canScrollRecommendationsRight, setCanScrollRecommendationsRight] = useState(false);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      
      // Get next delivery day (respects 3pm cutoff)
      const nextDay = getNextDeliveryDayName();
      setNextDeliveryDay(nextDay);
      
      // Get order patterns for typical order info
      const patterns = getOrderPatterns(userId);
      setOrderPatterns(patterns);
      
      // Get last order for this day (both cards will use the same order)
      const last = getLastOrder(userId, nextDay);
      setLastOrder(last);
      
      // Get shopping lists
      const lists = getShoppingLists(userId);
      setShoppingLists(lists);

      // Get smart suggestions and insights
      const suggestions = getSmartOrderSuggestions(userId);
      setSmartSuggestions(suggestions);

      const insights = getOrderFrequencyAnalysis(userId);
      setFrequencyInsights(insights);

      const trending = getTrendingProducts(userId);
      setTrendingProducts(trending);
    }
  }, []);

  // Load best sellers when lastOrder or orderPatterns change
  useEffect(() => {
    const currentUser = getUser();
    const businessType = currentUser?.business_type || 'restaurant';
    const branchCode = currentUser?.primary_branch_code;
    
    // Get all available categories from products
    const allCategories = getAllCategories();
    
    // Get categories from order history or use all available
    const orderCategories = lastOrder?.categories || orderPatterns?.typical_categories || [];
    const categoriesToUse = orderCategories.length > 0
      ? orderCategories.filter((cat: string) => allCategories.includes(cat))
      : allCategories;
    
    // Ensure we have categories
    const finalCategories = categoriesToUse.length > 0 ? categoriesToUse : allCategories;
    
    // Get priority order for business type
    const categoryPriority = getCategoryOrderByBusinessType(businessType);
    
    // Sort categories by business type relevance
    const sortedCategories = [...finalCategories].sort((a, b) => {
      const priorityA = categoryPriority[a] || 999;
      const priorityB = categoryPriority[b] || 999;
      return priorityA - priorityB;
    });
    
    const productsByCategory: Record<string, any[]> = {};
    
    sortedCategories.forEach((category) => {
      const result = getProducts({
        category: category,
        branchCode,
        perPage: 8,
      });
      productsByCategory[category] = result.products;
    });
    
    setCategoryProducts(productsByCategory);
    
    // Set first category as active if not already set
    if (sortedCategories.length > 0 && !activeCategoryTab) {
      setActiveCategoryTab(sortedCategories[0]);
    }
    
    // Initialize scroll state for all categories
    const initialScrollState: Record<string, number> = {};
    const initialCanScrollState: Record<string, boolean> = {};
    sortedCategories.forEach((cat) => {
      initialScrollState[cat] = 0;
      initialCanScrollState[cat] = true; // Will be updated on first scroll
    });
    setScrollPosition(initialScrollState);
    setCanScrollRight(initialCanScrollState);
  }, [lastOrder, orderPatterns]);
  
  // Update scroll state when tab changes
  useEffect(() => {
    if (activeCategoryTab) {
      // Check if we can scroll right for the active tab
      setTimeout(() => {
        const container = document.getElementById(`products-scroll-${activeCategoryTab}`);
        if (container) {
          const maxScroll = container.scrollWidth - container.clientWidth;
          setCanScrollRight({
            ...canScrollRight,
            [activeCategoryTab]: maxScroll > 10,
          });
        }
      }, 100);
    }
  }, [activeCategoryTab, categoryProducts]);

  // Generate recommendations based on ordering patterns and recently viewed
  useEffect(() => {
    const currentUser = getUser();
    const branchCode = currentUser?.primary_branch_code;
    const recommendations: any[] = [];
    const seenProductIds = new Set<string>();

    // Get recently viewed products
    const recentlyViewed = getRecentlyViewed();
    recentlyViewed.forEach((item) => {
      if (!seenProductIds.has(item.id)) {
        const product = getProductBySku(item.sku, branchCode);
        if (product && product.active) {
          recommendations.push(product);
          seenProductIds.add(product.id);
        }
      }
    });

    // Get products from ordering patterns (frequent products)
    if (orderPatterns?.frequent_products) {
      orderPatterns.frequent_products.forEach((freqProduct: any) => {
        if (!seenProductIds.has(freqProduct.product_id)) {
          // Try to find product by name or ID
          const product = (productsData as any[]).find(
            (p) => (p.id === freqProduct.product_id || 
                    p.name.toLowerCase().includes(freqProduct.product_name.toLowerCase())) &&
                    p.active
          );
          if (product) {
            const fullProduct = getProductBySku(product.sku, branchCode);
            if (fullProduct && !seenProductIds.has(fullProduct.id)) {
              recommendations.push(fullProduct);
              seenProductIds.add(fullProduct.id);
            }
          }
        }
      });
    }

    // If no recommendations yet, get products from typical categories  
    if (recommendations.length === 0 && orderPatterns?.typical_categories) {
      orderPatterns.typical_categories.forEach((category: any) => {
        if (recommendations.length >= 20) return;
        const categoryProducts = getProducts({
          category: category,
          branchCode,
          perPage: 5,
        });
        categoryProducts.products.forEach((product) => {
          if (!seenProductIds.has(product.id) && recommendations.length < 20) {
            recommendations.push(product);
            seenProductIds.add(product.id);
          }
        });
      });
    }

    // Final fallback: get best sellers from any category
    if (recommendations.length === 0) {
      const fallbackProducts = getProducts({
        branchCode,
        bestSeller: true,
        perPage: 20,
      });
      setRecommendedProducts(fallbackProducts.products);
    } else {
      // Limit to 20 products for performance
      setRecommendedProducts(recommendations.slice(0, 20));
    }

    // Check scroll capability
    setTimeout(() => {
      const container = document.getElementById('recommendations-scroll');
      if (container) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        setCanScrollRecommendationsRight(maxScroll > 10);
      }
    }, 100);
  }, [orderPatterns]);

  if (!session?.user) {
    return null;
  }

  // Format date for display (e.g., "Dec 13")
  const formatOrderDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${day}`;
  };

  // Format date with day name (e.g., "Wednesday, Dec 13")
  const formatOrderDateWithDay = (dateString: string, dayName: string) => {
    return `${dayName}, ${formatOrderDate(dateString)}`;
  };

  // Get typical order info for smart tip
  const typicalCategory = orderPatterns?.typical_categories?.[0] || 'items';
  const typicalItems = orderPatterns?.typical_tuesday_order?.items || 17;
  const typicalValue = orderPatterns?.typical_tuesday_order?.value || 210.00;

  // Get categories from products, ordered by business type relevance
  const currentUser = getUser();
  const businessType = currentUser?.business_type || 'restaurant';
  const allCategories = getAllCategories();
  const orderCategories = lastOrder?.categories || orderPatterns?.typical_categories || [];
  const categoriesToUse = orderCategories.length > 0
    ? orderCategories.filter((cat: string) => allCategories.includes(cat) && cat !== 'All categories')
    : allCategories;
  
  // Get priority order for business type
  const categoryPriority = getCategoryOrderByBusinessType(businessType);
  
  // Sort categories by business type relevance
  const displayCategories = [...categoriesToUse].sort((a, b) => {
    const priorityA = categoryPriority[a] || 999;
    const priorityB = categoryPriority[b] || 999;
    return priorityA - priorityB;
  });
  
  // Ensure we always have categories to show
  const finalDisplayCategories = displayCategories.length > 0 ? displayCategories : allCategories;

  // Category route mapping (using actual categories from codebase)
  const categoryRouteMap: Record<string, string> = {
    "Meat, Fish & Poultry": "/meat-fish-poultry/shop",
    "Greengrocery": "/greengrocery/shop",
    "Beer, Cider and Alcoholic RTDs": "/beer/shop",
  };

  // Get shopping list (first one or "Weekly Essentials")
  const weeklyList = shoppingLists.find(list => 
    list.name.toLowerCase().includes('weekly') || 
    list.name.toLowerCase().includes('essentials')
  ) || shoppingLists[0];

  return (
    <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-pink-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              BUILD YOUR {nextDeliveryDay.toUpperCase()} ORDER
            </h2>
          </div>
          {orderPatterns && (
            <p className="text-gray-600 text-sm">
              You typically order {typicalItems} {typicalCategory} items on {nextDeliveryDay}s for £{typicalValue.toFixed(2)}
            </p>
          )}
        </div>

        {/* Three Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Card 1: Copy Your Last [DAY] Order */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Copy className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Copy Your Last {nextDeliveryDay} Order
              </h3>
            </div>
            {lastOrder ? (
              <>
                <p className="text-sm text-gray-600 mb-1">
                  (From {formatOrderDateWithDay(lastOrder.date, nextDeliveryDay)})
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  {lastOrder.items_count} items • £{lastOrder.total_value.toFixed(2)}
                </p>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    console.log('Copy order:', lastOrder.id);
                  }}
                >
                  Copy Order
                </Button>
              </>
            ) : (
              <p className="text-sm text-gray-500 mb-4">No previous order found</p>
            )}
          </div>

          {/* Card 2: Reorder Last [DAY] Order (Immediate) */}
          <div className="bg-white border-2 border-orange-400 rounded-lg p-6 hover:border-orange-500 transition-all shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <RotateCcw className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Reorder Last {nextDeliveryDay} Order
              </h3>
            </div>
            {lastOrder ? (
              <>
                <p className="text-sm text-gray-600 mb-1">
                  (From {formatOrderDateWithDay(lastOrder.date, nextDeliveryDay)})
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  {lastOrder.items_count} items • £{lastOrder.total_value.toFixed(2)}
                </p>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => {
                    // Add all items to basket immediately and proceed
                    console.log('Reorder immediately:', lastOrder.id);
                  }}
                >
                  Reorder Now
                </Button>
              </>
            ) : (
              <p className="text-sm text-gray-500 mb-4">No previous order found</p>
            )}
          </div>

          {/* Card 3: Shopping List */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">
                Your '{weeklyList?.name || "Weekly Essentials"}' List
              </h3>
            </div>
            {weeklyList ? (
              <>
                <p className="text-sm text-gray-600 mb-1">
                  {weeklyList.item_count || weeklyList.items?.length || 0} items saved
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-4">
                  {weeklyList.item_count || weeklyList.items?.length || 0} items
                </p>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    console.log('Use list:', weeklyList.id);
                  }}
                >
                  Use List
                </Button>
              </>
            ) : (
              <p className="text-sm text-gray-500 mb-4">No shopping list found</p>
            )}
          </div>
        </div>

        {/* Smart Suggestions Section */}
        {/* {smartSuggestions.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <h3 className="text-xl font-bold text-gray-900">Smart Suggestions for Your Order</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {smartSuggestions.slice(0, 4).map((suggestion, index) => {
                const getIcon = () => {
                  switch (suggestion.type) {
                    case 'running_low': return AlertCircle;
                    case 'trending_up': return TrendingUp;
                    case 'seasonal': return Sparkles;
                    case 'popular_today': return BarChart3;
                    default: return Target;
                  }
                };
                const Icon = getIcon();

                const getColorClass = () => {
                  switch (suggestion.priority) {
                    case 'high': return 'border-orange-400 bg-orange-50';
                    case 'medium': return 'border-blue-400 bg-blue-50';
                    default: return 'border-gray-300 bg-gray-50';
                  }
                };

                return (
                  <div
                    key={index}
                    className={`border-2 rounded-lg p-4 ${getColorClass()} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        suggestion.priority === 'high' ? 'bg-orange-200' :
                        suggestion.priority === 'medium' ? 'bg-blue-200' : 'bg-gray-200'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          suggestion.priority === 'high' ? 'text-orange-700' :
                          suggestion.priority === 'medium' ? 'text-blue-700' : 'text-gray-700'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600">{suggestion.message}</p>
                      </div>
                    </div>
                    {suggestion.products.length > 0 && (
                      <div className="mb-3">
                        <div className="text-xs text-gray-500 mb-2">
                          {suggestion.products.slice(0, 3).map((product, i) => (
                            <div key={i} className="truncate">
                              • {product.product_name}
                              {product.suggested_quantity && <span className="text-gray-400"> (qty: {product.suggested_quantity})</span>}
                            </div>
                          ))}
                          {suggestion.products.length > 3 && (
                            <div className="text-gray-400">+ {suggestion.products.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full text-sm"
                      onClick={() => console.log('Add suggestion:', suggestion.type)}
                    >
                      {suggestion.action_label}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}

        {/* Order Insights Panel */}
        {/* {frequencyInsights.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">Your Ordering Patterns</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {frequencyInsights.slice(0, 4).map((insight) => (
                <div key={insight.day_of_week} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-sm font-semibold text-gray-900 mb-1">{insight.day_of_week}</div>
                  <div className="text-xs text-gray-600 mb-2">
                    {insight.avg_items} items • £{insight.avg_value.toFixed(0)}
                  </div>
                  <div className="flex items-center gap-1">
                    {insight.trend === 'increasing' && <TrendingUp className="w-3 h-3 text-green-600" />}
                    <span className={`text-xs font-medium ${
                      insight.trend === 'increasing' ? 'text-green-600' :
                      insight.trend === 'decreasing' ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {insight.percentage_of_total.toFixed(0)}% of orders
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <span className="font-semibold">Insight:</span> You order most frequently on {frequencyInsights[0]?.day_of_week}s
              ({frequencyInsights[0]?.percentage_of_total.toFixed(0)}% of your orders)
            </div>
          </div>
        )} */}

        {/* Category Tabs - Add More Items */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add More Items</h3>
          
          {/* Category Tabs */}
          {finalDisplayCategories.length > 0 && (
            <>
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide border-b border-gray-200 -mx-4 sm:mx-0 px-4 sm:px-0">
                {finalDisplayCategories.map((category) => {
                  // Abbreviated category names for mobile
                  const getCategoryLabel = (cat: string) => {
                    const abbreviations: Record<string, string> = {
                      'Meat, Fish & Poultry': 'Meat & Fish',
                      'Beer, Cider and Alcoholic RTDs': 'Beer & Cider',
                      'Greengrocery': 'Greengrocery',
                    };
                    return abbreviations[cat] || cat;
                  };
                  
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategoryTab(category)}
                      className={`px-3 sm:px-4 py-2 rounded-t-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-colors border-b-2 flex-shrink-0 min-w-fit ${
                        activeCategoryTab === category
                          ? 'bg-primary text-white border-primary'
                          : 'bg-transparent text-gray-700 border-transparent hover:border-gray-300'
                      }`}
                    >
                      <span className="hidden sm:inline">{category}</span>
                      <span className="sm:hidden">{getCategoryLabel(category)}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content - Products */}
              {activeCategoryTab && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">{activeCategoryTab}</h4>
                    <Link
                      href={categoryRouteMap[activeCategoryTab] || "/search"}
                      className="flex items-center gap-1 text-primary hover:text-primary font-medium text-sm"
                    >
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  
                  {/* Products Scrollable Line */}
                  <div className="relative">
                    {/* Left Scroll Button */}
                    {scrollPosition[activeCategoryTab] > 0 && (
                      <button
                        onClick={() => {
                          const container = document.getElementById(`products-scroll-${activeCategoryTab}`);
                          if (!container) return;
                          const newPosition = Math.max(0, scrollPosition[activeCategoryTab] - 400);
                          container.scrollTo({ left: newPosition, behavior: "smooth" });
                          setScrollPosition({ ...scrollPosition, [activeCategoryTab]: newPosition });
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
                        aria-label="Scroll left"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2} />
                      </button>
                    )}

                    {/* Products Container */}
                    <div
                      id={`products-scroll-${activeCategoryTab}`}
                      className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 items-stretch"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                      onScroll={(e) => {
                        const container = e.currentTarget;
                        const currentScroll = container.scrollLeft;
                        const maxScroll = container.scrollWidth - container.clientWidth;
                        
                        setScrollPosition({
                          ...scrollPosition,
                          [activeCategoryTab]: currentScroll,
                        });
                        
                        setCanScrollRight({
                          ...canScrollRight,
                          [activeCategoryTab]: currentScroll < maxScroll - 10, // 10px threshold
                        });
                      }}
                    >
                      {categoryProducts[activeCategoryTab]?.length > 0 ? (
                        categoryProducts[activeCategoryTab].map((product) => (
                          <div key={product.id} className="flex-shrink-0 w-64 flex items-stretch">
                            <ProductCard product={product} />
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500 w-full">
                          No products found in this category
                        </div>
                      )}
                    </div>

                    {/* Right Scroll Button */}
                    {canScrollRight[activeCategoryTab] && categoryProducts[activeCategoryTab]?.length > 0 && (
                      <button
                        onClick={() => {
                          const container = document.getElementById(`products-scroll-${activeCategoryTab}`);
                          if (!container) return;
                          const newPosition = scrollPosition[activeCategoryTab] + 400;
                          container.scrollTo({ left: newPosition, behavior: "smooth" });
                          setScrollPosition({ ...scrollPosition, [activeCategoryTab]: newPosition });
                        }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
                        aria-label="Scroll right"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-700" strokeWidth={2} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Recommendations Section - Based on Ordering Patterns and Recently Viewed */}
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recommended for You</h3>
              <Link
                href="/butchery/shop"
                className="flex items-center gap-1 text-primary hover:text-primary font-medium text-sm"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Products Scrollable Line */}
            <div className="relative">
              {/* Left Scroll Button */}
              {recommendationScrollPosition > 0 && (
                <button
                  onClick={() => {
                    const container = document.getElementById('recommendations-scroll');
                    if (!container) return;
                    const newPosition = Math.max(0, recommendationScrollPosition - 400);
                    container.scrollTo({ left: newPosition, behavior: "smooth" });
                    setRecommendationScrollPosition(newPosition);
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2} />
                </button>
              )}

              {/* Products Container */}
              <div
                id="recommendations-scroll"
                className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 items-stretch"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const currentScroll = container.scrollLeft;
                  const maxScroll = container.scrollWidth - container.clientWidth;
                  
                  setRecommendationScrollPosition(currentScroll);
                  setCanScrollRecommendationsRight(currentScroll < maxScroll - 10);
                }}
              >
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="flex-shrink-0 w-64 flex items-stretch">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Right Scroll Button */}
              {canScrollRecommendationsRight && (
                <button
                  onClick={() => {
                    const container = document.getElementById('recommendations-scroll');
                    if (!container) return;
                    const newPosition = recommendationScrollPosition + 400;
                    container.scrollTo({ left: newPosition, behavior: "smooth" });
                    setRecommendationScrollPosition(newPosition);
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-50 transition-all"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
      </div>
    </section>
  );
}
