"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts } from "@/lib/data/products";
import { getSession, getUser } from "@/lib/mock-auth";
import { getBranchByCode } from "@/lib/data/branches";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ActiveFiltersBar } from "@/components/product/ActiveFiltersBar";
import { NoResultsState } from "@/components/product/NoResultsState";
import { SortDropdown } from "@/components/product/SortDropdown";
import { MobileFilterButton } from "@/components/product/MobileFilterButton";
import { ContentInjection } from "@/components/product/ContentInjection";
import Link from "next/link";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/Button";

function ViewToggle() {
  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-md overflow-hidden">
      <button className="p-2 bg-primary text-white hover:bg-primary">
        <Grid className="w-4 h-4" />
      </button>
      <button className="p-2 text-gray-600 hover:bg-gray-100">
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}

function BestSellersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<{ products: any[]; total: number; page: number; perPage: number }>({ products: [], total: 0, page: 1, perPage: 24 });
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    // Auto-add best_seller=true to URL if not present
    if (searchParams.get("best_seller") !== "true") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("best_seller", "true");
      router.replace(`/best-sellers?${params.toString()}`);
      return;
    }

    const category = searchParams.get("category") || undefined;
    const attributes = searchParams.getAll("attributes");
    const brands = searchParams.getAll("brand");
    const bestSeller = searchParams.get("best_seller") === "true"; // Read from URL
    const inStockOnly = searchParams.get("in_stock") === "true";
    const sortBy = searchParams.get("sort") || "name_az";
    const page = parseInt(searchParams.get("page") || "1");
    const minPrice = searchParams.get("min_price") ? parseFloat(searchParams.get("min_price")!) : undefined;
    const maxPrice = searchParams.get("max_price") ? parseFloat(searchParams.get("max_price")!) : undefined;
    const branchCode = currentUser?.primary_branch_code;

    const result = getProducts({
      category,
      attributes: attributes.map(a => String(a)),
      brands: brands.map(b => String(b)),
      bestSeller,
      minPrice,
      maxPrice,
      inStockOnly,
      branchCode,
      sortBy,
      page,
      perPage: 24,
    });

    setData(result);
    setLoading(false);
  }, [searchParams]);

  const activeFilters: Array<{ key: string; value: string; label: string }> = [];
  searchParams.forEach((value, key) => {
    if (!["best_seller", "page", "per_page", "in_stock", "min_price", "max_price"].includes(key)) {
      activeFilters.push({ key, value, label: value });
    }
  });
  // Also check for price range filters
  if (searchParams.get("min_price") || searchParams.get("max_price")) {
    activeFilters.push({ 
      key: "price_range", 
      value: `${searchParams.get("min_price") || '0'}-${searchParams.get("max_price") || '999'}`, 
      label: `£${searchParams.get("min_price") || '0'}-£${searchParams.get("max_price") || '999'}` 
    });
  }

  const hasResults = data.products.length > 0;
  const totalPages = Math.ceil(data.total / (data.perPage || 24));
  
  // Determine display text based on authentication
  let branchName: string | null = null;
  if (user?.primary_branch_code) {
    const branch = getBranchByCode(user.primary_branch_code);
    branchName = branch ? `at ${branch.name}` : null;
  }
  const locationText = session?.user && branchName 
    ? branchName 
    : "across all branches";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Best Sellers</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Best Sellers</h1>
          <p className="text-gray-600">
            Showing {data.products.length} of {data.total} best-selling products {locationText}
          </p>
          <p className="text-gray-600 mt-2">
            Browse our most popular products trusted by businesses nationwide. Next-day delivery available.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <ActiveFiltersBar />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-gray-600">
                  {hasResults ? (
                    <>Showing {((data.page || 1) - 1) * (data.perPage || 24) + 1}-{Math.min((data.page || 1) * (data.perPage || 24), data.total)} of {data.total} products</>
                  ) : (
                    <>No products found</>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <SortDropdown />
                  </div>
                  <ViewToggle />
                </div>
              </div>
            </div>

            {hasResults ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                  {data.products.map((product: any, idx: number) => {
                    const showInjection = idx > 0 && idx % 24 === 0;
                    const injectionType = idx % 72 === 0 ? "educational" : idx % 48 === 0 ? "promotional" : "cross-category";
                    
                    return (
                      <div key={product.id || product.sku} className="contents">
                        {showInjection && (
                          <ContentInjection
                            type={injectionType}
                            index={Math.floor(idx / 24)}
                          />
                        )}
                        <ProductCard product={product} />
                      </div>
                    );
                  })}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Page {data.page || 1} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      {data.page && data.page > 1 && (
                        <Link
                          href={`?${(() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("page", String((data.page || 1) - 1));
                            return params.toString();
                          })()}`}
                        >
                          <Button variant="tertiary" size="sm">
                            ← Previous
                          </Button>
                        </Link>
                      )}
                      {data.page && data.page < totalPages && (
                        <Link
                          href={`?${(() => {
                            const params = new URLSearchParams(searchParams.toString());
                            params.set("page", String((data.page || 1) + 1));
                            return params.toString();
                          })()}`}
                        >
                          <Button variant="tertiary" size="sm">
                            Next →
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No best sellers found {locationText}
                </h3>
                <p className="text-gray-600 mb-6">
                  {activeFilters.length > 0
                    ? "We couldn't find any best-selling products matching your current filters."
                    : "No products have been marked as best sellers yet."}
                </p>
                {activeFilters.length > 0 ? (
                  <div className="mb-6">
                    <Link href="/best-sellers">
                      <Button variant="primary">Clear All Filters</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      Browse our full product range by category:
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      <Link href="/meat-fish-poultry/shop"><Button variant="tertiary">Meat, Fish & Poultry</Button></Link>
                      <Link href="/beer/shop"><Button variant="tertiary">Beer, Cider & RTDs</Button></Link>
                      <Link href="/greengrocery/shop"><Button variant="tertiary">Greengrocery</Button></Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <MobileFilterButton />
      </div>
    </div>
  );
}

export default function BestSellersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </div>
    }>
      <BestSellersContent />
    </Suspense>
  );
}
