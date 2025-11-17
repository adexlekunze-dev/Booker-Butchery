"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getProducts } from "@/lib/data/products";
import { getTrendingProducts } from "@/lib/data/mock-trending-data";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";
import { getCurrentMonth, isFestiveSeason } from "@/lib/utils/dates";

export function DecemberSeasonPicksSection() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    if (currentSession?.user) {
      loadSeasonalProducts();
      loadTrendingData();
    }
  }, []);

  const loadSeasonalProducts = () => {
    const branchCode = user?.primary_branch_code;
    
    // Get seasonal products (Christmas/New Year themed)
    const result = getProducts({
      branchCode,
      seasonal: true,
      perPage: 12,
    });

    setProducts(result.products);
    setLoading(false);
  };

  const loadTrendingData = () => {
    const trendingData = getTrendingProducts();
    setTrending(trendingData);
  };

  if (!session?.user || loading) {
    return null;
  }
  
  // Only show in festive season
  if (!isFestiveSeason()) {
    return null;
  }
  
  const currentMonth = getCurrentMonth();

  // Get trending info for a product
  const getTrendingInfo = (productId: string) => {
    return trending.find(t => t.product_id === productId);
  };

  return (
    <section className="bg-white border-b border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {currentMonth.toUpperCase()} SEASON PICKS - FESTIVE MENU INSPIRATION
              </h2>
              <p className="text-gray-600 mt-1">
                {currentMonth === 'December' ? 'Christmas Day Bookings (Dec 25) • ' : ''}New Year's Eve Parties • Office Parties • Winter Wedding Season
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-2">
          {['all', 'christmas', 'new-year', 'winter'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter === 'all' ? '●' : ''} {filter === 'all' ? 'All Festive' : filter === 'christmas' ? 'Christmas Day' : filter === 'new-year' ? "New Year's Eve" : 'Winter Menu'}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {products.slice(0, 6).map((product) => {
                const trendingInfo = getTrendingInfo(product.id);
                return (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    {trendingInfo && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        📈 +{trendingInfo.trend_percent}% {trendingInfo.trend_period}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {products.slice(6, 12).map((product) => {
                const trendingInfo = getTrendingInfo(product.id);
                return (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    {trendingInfo && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        📈 +{trendingInfo.trend_percent}% {trendingInfo.trend_period}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Trending Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-gray-900">
                  🎅 TRENDING NOW: Champagne orders up 312% for New Year's Eve
                </p>
                <p className="text-gray-700">
                  🎄 ORDER BY DEC 18: Guaranteed delivery before Christmas
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/best-sellers?seasonal=true">
                <Button variant="secondary" size="sm">
                  View All 48 Festive Products →
                </Button>
              </Link>
              <Button variant="secondary" size="sm">
                Download Christmas Menu Ideas PDF
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">
            No seasonal products available
          </div>
        )}
      </div>
    </section>
  );
}

