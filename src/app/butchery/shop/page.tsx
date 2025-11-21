"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getProducts } from "@/lib/data/products";
import { getSession, getUser } from "@/lib/mock-auth";
import { getBranchByCode } from "@/lib/data/branches";
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

// Generate structured data for breadcrumbs
function generateBreadcrumbSchema(category?: string) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: typeof window !== 'undefined' ? window.location.origin : "https://booker.co.uk",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Butchery",
      item: typeof window !== 'undefined' ? `${window.location.origin}/butchery` : "https://booker.co.uk/butchery",
    },
  ];

  if (category) {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: category,
      item: typeof window !== 'undefined' ? window.location.href : `https://booker.co.uk/butchery/shop?category=${category}`,
    });
  } else {
    items.push({
      "@type": "ListItem",
      position: 3,
      name: "Shop All",
      item: typeof window !== 'undefined' ? window.location.href : "https://booker.co.uk/butchery/shop",
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

// Generate structured data for product listing
function generateProductListSchema(products: any[], category?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 20).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.descriptions?.short || product.name,
        sku: product.sku,
        brand: {
          "@type": "Brand",
          name: product.brand,
        },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "GBP",
          availability: product.availability?.in_stock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
        image: product.images?.[0] || "",
      },
    })),
    numberOfItems: products.length,
  };
}

function ButcheryListingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<{ products: any[]; total: number; page: number; perPage: number }>({ products: [], total: 0, page: 1, perPage: 24 });
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load session and user
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    // Fix incorrect brand=Halal filter (Halal is an attribute, not a brand)
    const brandParam = searchParams.get("brand");
    if (brandParam && brandParam.toLowerCase() === "halal") {
      // Redirect to correct halal filter
      const params = new URLSearchParams(searchParams.toString());
      params.delete("brand");
      params.set("halal", "true");
      router.replace(`/butchery/shop?${params.toString()}`);
      return;
    }

    // Parse search params - normalize category to uppercase for consistency
    // Handle categories with & character (e.g., "POULTRY & GAME", "EGGS & FATS")
    let rawCategory = searchParams.get("category") || undefined;
    const originalCategory = rawCategory;
    
    // If category was split by & (wrong encoding), try to reconstruct it
    // When URL is ?category=POULTRY%20&%20GAME, browser parses as category=POULTRY & GAME=
    // Check if there's a "GAME" or "FATS" parameter that might be part of the category
    if (rawCategory) {
      const gameParam = searchParams.get("GAME");
      const fatsParam = searchParams.get("FATS");
      
      // If category ends with space and GAME exists as empty param, reconstruct POULTRY & GAME
      if ((rawCategory.trim().toUpperCase() === "POULTRY" || rawCategory.toUpperCase().endsWith("POULTRY ")) && (gameParam === "" || gameParam === null)) {
        rawCategory = "POULTRY & GAME";
      }
      // If category ends with space and FATS exists as empty param, reconstruct EGGS & FATS
      else if ((rawCategory.trim().toUpperCase() === "EGGS" || rawCategory.toUpperCase().endsWith("EGGS ")) && (fatsParam === "" || fatsParam === null)) {
        rawCategory = "EGGS & FATS";
      }
      // Normalize simple categories to uppercase (e.g., "beef" -> "BEEF")
      // Compound categories like "POULTRY & GAME" and "EGGS & FATS" should stay as-is
      else if (!rawCategory.includes("&")) {
        const normalized = rawCategory.toUpperCase();
        
        // If normalized category differs from URL param, redirect to uppercase version for consistency
        if (normalized !== originalCategory) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("category", normalized);
          router.replace(`/butchery/shop?${params.toString()}`);
          return;
        }
        
        rawCategory = normalized;
      }
    }
    
    const selectedCategory = rawCategory;
    // Decode subcategory from URL (searchParams.get already decodes, but ensure it's trimmed)
    const subcategoryParam = searchParams.get("subcategory");
    const subcategory = subcategoryParam ? decodeURIComponent(subcategoryParam).trim() : undefined;
    const qualityTier = searchParams.get("quality_tier") || undefined;
    const halal = searchParams.get("halal") === "true" || undefined;
    const origin = searchParams.get("origin") || undefined;
    const agingMethod = searchParams.get("aging_method") || undefined;
    const agingDays = searchParams.get("aging_days") ? parseInt(searchParams.get("aging_days")!) : undefined;
    const storageType = searchParams.get("storage_type") || undefined;
    const attributes = searchParams.getAll("attributes");
    const brands = searchParams.getAll("brand");
    const bestSeller = searchParams.get("best_seller") === "true";
    const onOffer = searchParams.get("on_offer") === "true";
    const inStockOnly = searchParams.get("in_stock") === "true";
    const stockLevel = searchParams.get("stock_level") || undefined;
    const sortBy = searchParams.get("sort") || "name_az";
    const page = parseInt(searchParams.get("page") || "1");
    const minPrice = searchParams.get("min_price") ? parseFloat(searchParams.get("min_price")!) : undefined;
    const maxPrice = searchParams.get("max_price") ? parseFloat(searchParams.get("max_price")!) : undefined;
    const branchCode = currentUser?.primary_branch_code;

    // Fetch products using client-side data functions
    const result = getProducts({
      category: selectedCategory,
      subcategory,
      quality_tier: qualityTier,
      halal,
      origin,
      aging_method: agingMethod,
      aging_days: agingDays,
      storage_type: storageType,
      attributes: attributes.map(a => String(a)),
      brands: brands.map(b => String(b)),
      bestSeller,
      on_offer: onOffer,
      minPrice,
      maxPrice,
      inStockOnly,
      stock_level: stockLevel,
      branchCode,
      sortBy,
      page,
      perPage: 24,
    });

    setData(result);
    setLoading(false);

    // Update document title and meta description dynamically
    if (typeof window !== 'undefined') {
      const category = selectedCategory || 'Premium Butchery';
      document.title = `${category} Products | Wholesale Meat Supplier UK | Booker`;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute(
        'content',
        `Browse ${result.total} ${category.toLowerCase()} products. Premium wholesale meat from British farms. Red Tractor certified. Next-day delivery. Order by 3pm from Booker wholesale butchery.`
      );
    }
  }, [searchParams]);

  const activeFilters: Array<{ key: string; value: string; label: string }> = [];
  searchParams.forEach((value, key) => {
    if (!["category", "branch_code", "page", "per_page", "in_stock", "min_price", "max_price"].includes(key)) {
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

  // Generate schemas
  const category = searchParams.get("category") || undefined;
  const breadcrumbSchema = generateBreadcrumbSchema(category);
  const productListSchema = hasResults ? generateProductListSchema(data.products, category) : null;

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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {productListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
        />
      )}

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/butchery" className="hover:text-primary">Butchery</Link>
            <span className="mx-2">/</span>
            {category ? (
              <>
                <Link href="/butchery/shop" className="hover:text-primary">Shop All</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{category}</span>
              </>
            ) : (
              <span className="text-gray-900">Shop All</span>
            )}
          </nav>
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-primary mb-4 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? `${category} Products` : "Premium Butchery Products"}
          </h1>
          <p className="text-gray-600">
            Showing {data.products.length} of {data.total} products {locationText}
          </p>
          <p className="text-gray-600 mt-2">
            Browse our complete range of premium butchery products at wholesale prices. Order by 3pm for next-day delivery from Manchester Central.
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
                categoryName="Butchery"
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

export default function ButcheryListing() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading products...</div>
        </div>
      </div>
    }>
      <ButcheryListingContent />
    </Suspense>
  );
}
