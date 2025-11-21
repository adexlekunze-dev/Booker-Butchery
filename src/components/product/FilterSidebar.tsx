"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getFilterOptions } from "@/lib/data/filters";
import { getUser } from "@/lib/mock-auth";

type FilterSection = {
  title: string;
  key: string;
  options: { label: string; value: string; count?: number }[];
  multiple?: boolean;
  type?: "checkbox" | "radio";
};

export function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "category": true,
    "subcategory": true,
    "quality_tier": true,
    "halal": true,
    "origin": true,
    "aging_method": true,
    "aging_days": true,
    "storage_type": true,
    "attributes": true,
    "brand": true,
    "price_range": true,
    "stock_level": true,
  });

  const [showMore, setShowMore] = useState<Record<string, boolean>>({});
  const [filterOptions, setFilterOptions] = useState<{
    brands: { label: string; value: string; count: number }[];
    attributes: { label: string; value: string; count: number }[];
    categories?: { label: string; value: string; count: number }[];
    subcategories?: { label: string; value: string; count: number }[];
    qualityTiers?: { label: string; value: string; count: number }[];
    halalOptions?: { label: string; value: string; count: number }[];
    origins?: { label: string; value: string; count: number }[];
    agingMethods?: { label: string; value: string; count: number }[];
    agingDays?: { label: string; value: number; count: number }[];
    storageTypes?: { label: string; value: string; count: number }[];
    bestSellerCount?: number;
    onOfferCount?: number;
    priceRanges?: Array<{ label: string; value: string; min?: number; max?: number; count: number }>;
    stockLevels?: { label: string; value: string; count: number }[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilter = (key: string, value: string, multiple = true) => {
    const params = new URLSearchParams(searchParams.toString());

    // Handle price range specially
    if (key === "price_range") {
      params.delete("min_price");
      params.delete("max_price");

      const priceRangeMap: Record<string, { min?: number; max?: number }> = {
        "under-10": { min: 0, max: 10 },
        "10-20": { min: 10, max: 20 },
        "20-30": { min: 20, max: 30 },
        "30-50": { min: 30, max: 50 },
        "over-50": { min: 50 },
      };

      const range = priceRangeMap[value];
      if (range) {
        if (range.min !== undefined) params.set("min_price", range.min.toString());
        if (range.max !== undefined) params.set("max_price", range.max.toString());
      }
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
      return;
    }

    const currentValues = params.getAll(key);

    if (multiple) {
      if (currentValues.includes(value)) {
        params.delete(key, value);
      } else {
        params.append(key, value);
      }
    } else {
      if (params.get(key) === value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    const params = new URLSearchParams();
    // Keep category if it exists in URL
    if (searchParams.get("category")) {
      params.set("category", searchParams.get("category")!);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const getActiveFilters = () => {
    const active: { key: string; value: string }[] = [];
    searchParams.forEach((value, key) => {
      if (!["category", "page", "per_page", "in_stock", "min_price", "max_price"].includes(key)) {
        active.push({ key, value });
      }
    });
    // Include price range
    if (searchParams.get("min_price") || searchParams.get("max_price")) {
      active.push({
        key: "price_range",
        value: `${searchParams.get("min_price") || '0'}-${searchParams.get("max_price") || '999'}`
      });
    }
    return active;
  };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  // Fetch filter options based on current filters
  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);

      try {
        const user = getUser();
        const branchCode = user?.primary_branch_code;

        // Parse current filters from URL
        const currentFilters: any = {
          category: searchParams.get("category") || undefined,
          subcategory: searchParams.get("subcategory") || undefined,
          quality_tier: searchParams.get("quality_tier") || undefined,
          halal: searchParams.get("halal") === "true" ? true : searchParams.get("halal") === "false" ? false : undefined,
          origin: searchParams.get("origin") || undefined,
          aging_method: searchParams.get("aging_method") || undefined,
          aging_days: searchParams.get("aging_days") ? parseInt(searchParams.get("aging_days")!) : undefined,
          storage_type: searchParams.get("storage_type") || undefined,
          attributes: searchParams.getAll("attributes"),
          brands: searchParams.getAll("brand"),
          on_offer: searchParams.get("on_offer") === "true" ? true : undefined,
          bestSeller: searchParams.get("best_seller") === "true" ? true : undefined,
          minPrice: searchParams.get("min_price") ? parseFloat(searchParams.get("min_price")!) : undefined,
          maxPrice: searchParams.get("max_price") ? parseFloat(searchParams.get("max_price")!) : undefined,
          stock_level: searchParams.get("stock_level") || undefined,
        };

        // Clean up undefined values
        Object.keys(currentFilters).forEach(key => {
          if (currentFilters[key] === undefined || (Array.isArray(currentFilters[key]) && currentFilters[key].length === 0)) {
            delete currentFilters[key];
          }
        });

        // For butchery, pass null as category to get all butchery products
        // The category filter will be shown dynamically from the data
        const options = getFilterOptions(null, branchCode, currentFilters);

        setFilterOptions({
          brands: options.brands,
          attributes: options.attributes,
          categories: options.categories || [],
          subcategories: options.subcategories || [],
          qualityTiers: options.quality_tiers || [],
          halalOptions: options.halal_options || [],
          origins: options.origins || [],
          agingMethods: options.aging_methods || [],
          agingDays: options.aging_days || [],
          storageTypes: options.storage_types || [],
          bestSellerCount: options.best_seller.count,
          onOfferCount: options.on_offer.count,
          priceRanges: options.price_ranges || [],
          stockLevels: options.stock_levels || [],
        });

        setLoading(false);
      } catch (error) {
        console.error("[FilterSidebar] Error fetching filters:", error);
        setLoading(false);
      }
    };

    fetchFilters();
  }, [pathname, searchParams]);

  // Build filter sections dynamically from product data
  const filterSections: FilterSection[] = [];

  if (filterOptions) {
    // Range filter (Beef, Pork, Lamb, etc.)
    if (filterOptions.categories && filterOptions.categories.length > 0) {
      filterSections.push({
        title: "Range",
        key: "category",
        options: filterOptions.categories,
        type: "checkbox",
        multiple: false,
      });
    }

    // Subcategory filter (Cut Type - Steaks, Roasts, Mince & Diced, etc.)
    if (filterOptions.subcategories && filterOptions.subcategories.length > 0) {
      filterSections.push({
        title: "Cut Type",
        key: "subcategory",
        options: filterOptions.subcategories,
        type: "checkbox",
        multiple: false,
      });
    }

    // Quality Tier filter (Premium, Standard, Value)
    if (filterOptions.qualityTiers && filterOptions.qualityTiers.length > 0) {
      filterSections.push({
        title: "Quality Tier",
        key: "quality_tier",
        options: filterOptions.qualityTiers,
        type: "radio",
        multiple: false,
      });
    }

    // Halal Certification filter
    if (filterOptions.halalOptions && filterOptions.halalOptions.length > 0) {
      filterSections.push({
        title: "Certification",
        key: "halal",
        options: filterOptions.halalOptions,
        type: "radio",
        multiple: false,
      });
    }

    // Origin filter (UK, Ireland, New Zealand, etc.)
    if (filterOptions.origins && filterOptions.origins.length > 0) {
      filterSections.push({
        title: "Origin",
        key: "origin",
        options: filterOptions.origins,
        type: "checkbox",
        multiple: false,
      });
    }

    // Aging Method filter (Dry Aged, Matured)
    if (filterOptions.agingMethods && filterOptions.agingMethods.length > 0) {
      filterSections.push({
        title: "Aging Method",
        key: "aging_method",
        options: filterOptions.agingMethods,
        type: "radio",
        multiple: false,
      });
    }

    // Aging Days filter (32 days, 28 days, 21 days, 14 days)
    if (filterOptions.agingDays && filterOptions.agingDays.length > 0) {
      filterSections.push({
        title: "Aging Days",
        key: "aging_days",
        options: filterOptions.agingDays.map(a => ({
          label: a.label,
          value: String(a.value),
          count: a.count,
        })),
        type: "radio",
        multiple: false,
      });
    }

    // Storage Type filter (Chill, Frozen, Ambient)
    if (filterOptions.storageTypes && filterOptions.storageTypes.length > 0) {
      filterSections.push({
        title: "Storage Type",
        key: "storage_type",
        options: filterOptions.storageTypes,
        type: "radio",
        multiple: false,
      });
    }

    // Attributes filter (from product attributes array)
    if (filterOptions.attributes && filterOptions.attributes.length > 0) {
      const attributesWithCounts = filterOptions.attributes.filter(attr => attr.count > 0);
      if (attributesWithCounts.length > 0) {
        filterSections.push({
          title: "Attributes",
          key: "attributes",
          options: attributesWithCounts,
          type: "checkbox",
          multiple: true,
        });
      }
    }

    // Brand filter
    if (filterOptions.brands && filterOptions.brands.length > 0) {
      filterSections.push({
        title: "Brand",
        key: "brand",
        options: filterOptions.brands,
        type: "checkbox",
        multiple: true,
      });
    }

    // Price Range
    if (filterOptions.priceRanges && filterOptions.priceRanges.length > 0) {
      const priceRangesWithCounts = filterOptions.priceRanges.filter(r => r.count > 0);
      if (priceRangesWithCounts.length > 0) {
        filterSections.push({
          title: "Price Range",
          key: "price_range",
          options: priceRangesWithCounts.map(r => ({
            label: r.label,
            value: r.value,
            count: r.count,
          })),
          type: "radio",
          multiple: false,
        });
      }
    }

    // Stock Level filter
    if (filterOptions.stockLevels && filterOptions.stockLevels.length > 0) {
      filterSections.push({
        title: "Stock Level",
        key: "stock_level",
        options: filterOptions.stockLevels,
        type: "checkbox",
        multiple: true,
      });
    }
  }

  const isChecked = (key: string, value: string, multiple: boolean) => {
    // Handle price range specially
    if (key === "price_range") {
      const minPrice = searchParams.get("min_price");
      const maxPrice = searchParams.get("max_price");
      const priceRangeMap: Record<string, { min?: number; max?: number }> = {
        "under-10": { min: 0, max: 10 },
        "10-20": { min: 10, max: 20 },
        "20-30": { min: 20, max: 30 },
        "30-50": { min: 30, max: 50 },
        "over-50": { min: 50 },
      };
      const range = priceRangeMap[value];
      if (range) {
        const minMatch = (range.min === undefined || (minPrice && Number(minPrice) === range.min));
        const maxMatch = (range.max === undefined || (maxPrice && Number(maxPrice) === range.max));
        return minMatch && maxMatch;
      }
      return false;
    }

    if (multiple) {
      return searchParams.getAll(key).includes(value);
    }
    return searchParams.get(key) === value;
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">FILTERS</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading filters...
          </div>
        ) : (
          <>
            {/* Quick Filters - Best Sellers and Offers */}
            {filterOptions && (filterOptions.bestSellerCount || filterOptions.onOfferCount) && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="space-y-2">
                  {/* Best Sellers */}
                  {filterOptions.bestSellerCount && filterOptions.bestSellerCount > 0 && (
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={searchParams.get("best_seller") === "true"}
                        onChange={() => toggleFilter("best_seller", "true", false)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                        Best Sellers
                      </span>
                      <span className="text-xs text-gray-500">({filterOptions.bestSellerCount})</span>
                    </label>
                  )}

                  {/* On Offer */}
                  {filterOptions.onOfferCount && filterOptions.onOfferCount > 0 && (
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={searchParams.get("on_offer") === "true"}
                        onChange={() => toggleFilter("on_offer", "true", false)}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                        On Offer
                      </span>
                      <span className="text-xs text-gray-500">({filterOptions.onOfferCount})</span>
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Accordion Filters */}
            {filterSections.length === 0 ? (
              <div className="py-8 text-center text-sm text-gray-500">
                No filters available
              </div>
            ) : (
              filterSections.map((section) => {
            const isOpen = openSections[section.key] ?? false;
            const showMoreForSection = showMore[section.key] ?? false;
            const visibleOptions = showMoreForSection
              ? section.options
              : section.options.slice(0, 5);

            return (
              <div key={section.key} className="border-b border-gray-100 last:border-0 pb-4 mb-4 last:mb-0">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between text-left mb-3 font-medium text-gray-900"
                >
                  <span>{section.title}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {isOpen && (
                  <div className="space-y-2">
                    {visibleOptions.map((option) => {
                      const checked = isChecked(
                        section.key,
                        option.value,
                        section.multiple ?? true
                      );

                      return (
                        <label
                          key={option.value}
                          className="flex items-center gap-2 cursor-pointer group"
                        >
                          <input
                            type={section.type === "radio" ? "radio" : "checkbox"}
                            checked={!!checked}
                            onChange={() =>
                              toggleFilter(
                                section.key,
                                option.value,
                                section.multiple ?? true
                              )
                            }
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            name={section.key}
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 flex-1">
                            {option.label}
                          </span>
                          {option.count !== undefined && (
                            <span className="text-xs text-gray-500">({option.count})</span>
                          )}
                        </label>
                      );
                    })}
                    {section.options.length > 5 && (
                      <button
                        onClick={() =>
                          setShowMore((prev) => ({
                            ...prev,
                            [section.key]: !prev[section.key],
                          }))
                        }
                        className="text-sm text-primary hover:text-primary font-medium mt-2"
                      >
                        {showMoreForSection ? "Show less" : `Show ${section.options.length - 5} more`}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
            )}
          </>
        )}
      </div>
    </aside>
  );
}
