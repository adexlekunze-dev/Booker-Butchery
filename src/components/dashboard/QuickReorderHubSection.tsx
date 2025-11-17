"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Zap, Clock, TrendingUp } from "lucide-react";
import { getNextDeliveryDayName } from "@/lib/utils/dates";

const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: '●' },
  { id: 'greengrocery', name: 'Fresh Produce', icon: '🥬', category: 'Greengrocery' },
  { id: 'meat', name: 'Meat & Poultry', icon: '🥩', category: 'Meat, Fish & Poultry' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛', category: 'Dairy' },
  { id: 'beverages', name: 'Beverages', icon: '🍺', category: 'Beer, Cider and Alcoholic RTDs' },
  { id: 'frozen', name: 'Frozen & Desserts', icon: '🍰' },
  { id: 'cleaning', name: 'Cleaning Supplies', icon: '🧼' },
  { id: 'packaging', name: 'Packaging & Disposables', icon: '🎁' },
];

export function QuickReorderHubSection() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    if (currentSession?.user) {
      loadProducts('all');
    }
  }, []);

  const loadProducts = (categoryId: string) => {
    setActiveCategory(categoryId);
    setLoading(true);

    const category = CATEGORIES.find(c => c.id === categoryId);
    const currentUser = getUser();
    const branchCode = currentUser?.primary_branch_code;

    // Get products for the category (limit to 6 per category)
    const result = getProducts({
      category: category?.category,
      branchCode,
      bestSeller: true,
      perPage: 6,
    });

    setProducts(result.products);
    setLoading(false);
  };

  if (!session?.user) {
    return null;
  }

  const getCategoryRoute = (categoryId: string) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (!category?.category) return '/best-sellers';
    
    const routeMap: Record<string, string> = {
      'Meat, Fish & Poultry': '/meat-fish-poultry/shop',
      'Beer, Cider and Alcoholic RTDs': '/beer/shop',
      'Greengrocery': '/greengrocery/shop',
    };
    
    return routeMap[category.category] || '/best-sellers';
  };

  return (
    <section className="bg-gray-50 border-b border-gray-200 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1 min-w-0">
              <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900">
                ⚡ QUICK REORDER - YOUR RESTAURANT ESSENTIALS
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Build your complete order from frequently-ordered items:</p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-4 sm:mb-8 overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
          <div className="flex gap-2 pb-2 border-b border-gray-300">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => loadProducts(cat.id)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-t-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-colors touch-manipulation min-h-[44px] flex items-center ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700 active:bg-gray-300'
                }`}
              >
                <span className="mr-1 sm:mr-2 text-base sm:text-lg">{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
                <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-8">Loading products...</div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-4 sm:mt-6">
              <Button variant="primary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm min-h-[44px] touch-manipulation">
                + Add All {CATEGORIES.find(c => c.id === activeCategory)?.name || 'Items'} ({products.length})
              </Button>
              <Link href={getCategoryRoute(activeCategory)} className="w-full sm:w-auto">
                <Button variant="secondary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm min-h-[44px] touch-manipulation">
                  Browse All {CATEGORIES.find(c => c.id === activeCategory)?.name || 'Products'} →
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">
            No products found in this category
          </div>
        )}

        {/* Smart Summary */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-300">
          <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column - Smart Summary */}
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">💡 SMART SUMMARY:</h3>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                  <p>• You typically order 17 items across categories on {getNextDeliveryDayName()}</p>
                  <p>• Current basket: 0 items</p>
                </div>
                <Button variant="primary" size="sm" className="w-full text-xs sm:text-sm min-h-[44px] touch-manipulation">
                  + Add All Your Usual Items (17 items • £287.50)
                </Button>
              </div>

              {/* Right Column - Festive Additions */}
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3">🎄 FESTIVE ADDITIONS RECOMMENDED:</h4>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">
                  <p>• Turkey crown, Brussels sprouts, cranberries (Christmas menu)</p>
                  <p>• Champagne, Prosecco (New Year's Eve stock)</p>
                  <p>• Festive desserts (Christmas pudding, mince pies)</p>
                </div>
                <Button variant="primary" size="sm" className="w-full text-xs sm:text-sm min-h-[44px] touch-manipulation">
                  + Add Festive Essentials Bundle (8 items • £298.50)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

