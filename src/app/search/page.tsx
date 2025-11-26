"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts, getProducts } from "@/lib/data/products";
import { getUser } from "@/lib/mock-auth";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ActiveFiltersBar } from "@/components/product/ActiveFiltersBar";
import { MobileFilterButton } from "@/components/product/MobileFilterButton";
import { SortDropdown } from "@/components/product/SortDropdown";

function SearchContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    if (!q) {
      setProducts([]);
      setTotal(0);
      setLoading(false);
      return;
    }

    try {
      const user = getUser();
      const branchCode = user?.primary_branch_code;
      
      // Get search results first
      const searchResults = searchProducts(q, branchCode);
      
      // If no additional filters, return search results as-is
      const hasFilters = searchParams.get("category") || 
                        searchParams.get("subcategory") || 
                        searchParams.getAll("brand").length > 0 ||
                        searchParams.getAll("attributes").length > 0 ||
                        searchParams.get("min_price") ||
                        searchParams.get("max_price") ||
                        searchParams.get("on_offer") ||
                        searchParams.get("best_seller") ||
                        searchParams.get("stock_level");
      
      if (!hasFilters) {
        setProducts(searchResults);
        setTotal(searchResults.length);
        setLoading(false);
        return;
      }

      // Apply filters to all products
      const filteredResults = getProducts({
        category: searchParams.get("category") || undefined,
        subcategory: searchParams.get("subcategory") || undefined,
        brands: searchParams.getAll("brand"),
        attributes: searchParams.getAll("attributes"),
        minPrice: searchParams.get("min_price") ? parseFloat(searchParams.get("min_price")!) : undefined,
        maxPrice: searchParams.get("max_price") ? parseFloat(searchParams.get("max_price")!) : undefined,
        on_offer: searchParams.get("on_offer") === "true" ? true : undefined,
        bestSeller: searchParams.get("best_seller") === "true" ? true : undefined,
        stock_level: searchParams.get("stock_level") || undefined,
        branchCode,
        sortBy: (searchParams.get("sort") as any) || 'name_az',
        page: 1,
        perPage: 10000, // Get all for filtering
      });

      // Filter the results to only include products that match the search query
      const searchSkus = new Set(searchResults.map(p => p.sku));
      const finalResults = filteredResults.products.filter(p => searchSkus.has(p.sku));
      
      setProducts(finalResults);
      setTotal(finalResults.length);
      setLoading(false);
    } catch (error) {
      console.error("Error loading search results:", error);
      setProducts([]);
      setTotal(0);
      setLoading(false);
    }
  }, [searchParams]);

  const q = searchParams.get("q") ?? "";
  const hasResults = products.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search results</h1>
          <p className="text-gray-600">
            {q ? `"${q}" — ${total} results` : "Enter a search term above"}
          </p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Searching...</div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar - Hidden on mobile, shown on desktop */}
            {/* Note: FilterSidebar will scope to search results automatically via URL params */}
            <aside className="hidden lg:block">
              <FilterSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Active Filters & Sort Bar */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
                <ActiveFiltersBar />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
                  <div className="text-sm text-gray-600">
                    {hasResults ? (
                      <>Showing {total} result{total !== 1 ? 's' : ''}</>
                    ) : (
                      <>No products found</>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Sort by:</span>
                      <SortDropdown />
                    </div>
                  </div>
                </div>
              </div>

              {/* Products or No Results */}
              {hasResults ? (
                <ProductGrid products={products} />
              ) : q ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <p className="text-lg text-gray-600 mb-4">No products found for "{q}"</p>
                  <p className="text-sm text-gray-500">Try searching with different keywords or adjust your filters</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <p className="text-lg text-gray-600">Enter a search term in the search bar above</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Filter Button */}
        <MobileFilterButton />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading search...</div>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
