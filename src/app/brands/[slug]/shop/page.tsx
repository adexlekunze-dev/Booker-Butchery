"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { getProducts } from "@/lib/data/products";
import { getSession, getUser } from "@/lib/mock-auth";
import { getBranchByCode } from "@/lib/data/branches";
import { getBrandBySlug } from "@/data/brands";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { ActiveFiltersBar } from "@/components/product/ActiveFiltersBar";
import { NoResultsState } from "@/components/product/NoResultsState";
import { SortDropdown } from "@/components/product/SortDropdown";
import { MobileFilterDrawer } from "@/components/product/MobileFilterDrawer";
import { MobileFilterButton } from "@/components/product/MobileFilterButton";
import { ContentInjection } from "@/components/product/ContentInjection";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowLeft, Grid, List } from "lucide-react";
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

function BrandShopPageContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  
  const [data, setData] = useState<{ products: any[]; total: number; page: number; perPage: number }>({ products: [], total: 0, page: 1, perPage: 24 });
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    // Get brand info
    const brandData = getBrandBySlug(slug);
    setBrand(brandData);

    if (!brandData) {
      setLoading(false);
      return;
    }

    // Load session and user
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    // Parse search params
    const category = searchParams.get("category") || undefined; // Optional category filter
    const subcategory = searchParams.get("subcategory") || undefined;
    const attributes = searchParams.getAll("attributes");
    const bestSeller = searchParams.get("best_seller") === "true";
    const onOffer = searchParams.get("on_offer") === "true";
    const inStockOnly = searchParams.get("in_stock") === "true";
    const sortBy = searchParams.get("sort") || "name_az";
    const page = parseInt(searchParams.get("page") || "1");
    const minPrice = searchParams.get("min_price") ? parseFloat(searchParams.get("min_price")!) : undefined;
    const maxPrice = searchParams.get("max_price") ? parseFloat(searchParams.get("max_price")!) : undefined;
    const branchCode = currentUser?.primary_branch_code;

    // Fetch products filtered by brand
    const result = getProducts({
      category,
      subcategory,
      brands: [brandData.name], // Filter by brand name
      attributes: attributes.map(a => String(a)),
      bestSeller,
      on_offer: onOffer,
      minPrice,
      maxPrice,
      inStockOnly,
      branchCode,
      sortBy,
      page,
      perPage: 40,
    });

    setData(result);
    setLoading(false);
  }, [slug, searchParams]);

  const activeFilters: Array<{ key: string; value: string; label: string }> = [];
  searchParams.forEach((value, key) => {
    if (!["category", "branch_code", "page", "per_page", "in_stock", "min_price", "max_price", "brand"].includes(key)) {
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
  const totalPages = Math.ceil(data.total / (data.perPage || 40));
  
  // Build pagination params
  const buildParams = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (!["page"].includes(key)) {
        params[key] = value;
      }
    });
    return params;
  };
  
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

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-900 mb-2">Brand not found</div>
          <Link href="/brands" className="text-primary hover:underline">
            Browse all brands
          </Link>
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
            <Link href="/brands" className="hover:text-primary">Brands</Link>
            <span className="mx-2">/</span>
            <Link href={`/brands/${slug}`} className="hover:text-primary">{brand.name}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">Shop All</span>
          </nav>
          <Link href={`/brands/${slug}`} className="inline-flex items-center gap-2 text-primary hover:text-primary mb-4 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to {brand.name}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand.name} Products</h1>
          <p className="text-gray-600">
            Showing {data.products.length} of {data.total} products {locationText}
          </p>
          <p className="text-gray-600 mt-2">
            Browse our complete range of {brand.name} products at wholesale prices. Order by 3pm for next-day delivery from your branch.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Hidden on mobile, shown on desktop */}
          <aside className="hidden lg:block">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters & Sort Bar */}
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

            {/* Products or No Results */}
            {hasResults ? (
              <>
                {/* Render products with content injections every 24 */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 items-stretch">
                  {data.products.map((product: any, idx: number) => {
                    const showInjection = idx > 0 && idx % 24 === 0;
                    const injectionTypes: Array<"promotional" | "educational" | "cross-sell" | "recipe"> = [
                      "promotional",
                      "educational",
                      "cross-sell",
                      "recipe"
                    ];
                    const injectionType = injectionTypes[Math.floor(idx / 24) % injectionTypes.length];
                    
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
                  <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Page {data.page || 1} of {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      {data.page && data.page > 1 && (
                        <Link
                          href={`?${new URLSearchParams({
                            ...buildParams(),
                            page: String((data.page || 1) - 1),
                          })}`}
                        >
                          <Button variant="tertiary" size="sm">
                            ← Previous
                          </Button>
                        </Link>
                      )}
                      {data.page && data.page < totalPages && (
                        <Link
                          href={`?${new URLSearchParams({
                            ...buildParams(),
                            page: String((data.page || 1) + 1),
                          })}`}
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
              <NoResultsState
                activeFilters={activeFilters}
                categoryName={brand.name}
                branchName={branchName || undefined}
                isAuthenticated={!!(session?.user)}
              />
            )}
          </div>
        </div>

        {/* Mobile Filter Button */}
        <MobileFilterButton />
      </div>
    </div>
  );
}

export default function BrandShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </div>
    }>
      <BrandShopPageContent />
    </Suspense>
  );
}
