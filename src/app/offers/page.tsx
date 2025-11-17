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
import { Grid, List, ArrowLeft } from "lucide-react";
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

function OffersContent() {
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

    // Auto-add on_offer=true to URL if not present
    if (searchParams.get("on_offer") !== "true") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("on_offer", "true");
      router.replace(`/offers?${params.toString()}`);
      return;
    }

    const category = searchParams.get("category") || undefined;
    const attributes = searchParams.getAll("attributes");
    const brands = searchParams.getAll("brand");
    const onOffer = searchParams.get("on_offer") === "true"; // Read from URL
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
      on_offer: onOffer,
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
    if (!["on_offer", "page", "per_page", "in_stock", "min_price", "max_price"].includes(key)) {
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
          <div className="text-lg text-gray-600">Loading offers...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Special Offers</h1>
              <p className="text-gray-600 mt-2">
                {hasResults 
                  ? `Showing ${data.products.length} of ${data.total} special offers ${locationText}`
                  : `Browse our complete range of special offers at wholesale prices. Order by 3pm for next-day delivery from your branch.`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <MobileFilterButton />
                <ActiveFiltersBar />
              </div>
              <div className="flex items-center gap-4">
                <SortDropdown />
                <ViewToggle />
              </div>
            </div>

            {/* Products or No Results */}
            {hasResults ? (
              <>
                {/* Render products with content injections every 24 */}
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        const newParams = new URLSearchParams(window.location.search);
                        const currentPage = parseInt(newParams.get("page") || "1");
                        if (currentPage > 1) {
                          newParams.set("page", (currentPage - 1).toString());
                          router.push(`/offers?${newParams.toString()}`);
                        }
                      }}
                      disabled={parseInt(searchParams.get("page") || "1") === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-gray-600">
                      Page {parseInt(searchParams.get("page") || "1")} of {totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        const newParams = new URLSearchParams(searchParams.toString());
                        const currentPage = parseInt(searchParams.get("page") || "1");
                        if (currentPage < totalPages) {
                          newParams.set("page", (currentPage + 1).toString());
                          router.push(`/offers?${newParams.toString()}`);
                        }
                      }}
                      disabled={parseInt(searchParams.get("page") || "1") >= totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <NoResultsState
                activeFilters={activeFilters}
                categoryName="Special Offers"
                branchName={branchName || undefined}
                isAuthenticated={!!session?.user}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OffersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading offers...</div>
        </div>
      </div>
    }>
      <OffersContent />
    </Suspense>
  );
}

