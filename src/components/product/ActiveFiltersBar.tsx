"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { X } from "lucide-react";

const filterLabels: Record<string, Record<string, string>> = {
  meat_type: {
    beef: "Beef",
    pork: "Pork",
    lamb: "Lamb",
    poultry: "Chicken",
    turkey: "Turkey",
    fish: "Fish",
    "bacon-gammon": "Bacon & Gammon",
    sausages: "Sausages",
    game: "Game",
  },
  attributes: {
    british: "British",
    organic: "Organic",
    "free-range": "Free-range",
    halal: "Halal",
    premium: "Premium",
  },
  stock_level: {
    high: "High Stock",
    medium: "Medium Stock",
    low: "Low Stock",
    out: "Out of Stock",
  },
};

export function ActiveFiltersBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      // Remove specific value from multi-value filter
      const values = params.getAll(key);
      params.delete(key);
      values
        .filter((v) => v !== value)
        .forEach((v) => params.append(key, v));
    } else {
      // Remove entire filter
      params.delete(key);
    }
    
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams();
    // Keep category and branch if they exist
    if (searchParams.get("category")) {
      params.set("category", searchParams.get("category")!);
    }
    if (searchParams.get("branch_code")) {
      params.set("branch_code", searchParams.get("branch_code")!);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeFilters: { key: string; value: string; label: string }[] = [];
  
  searchParams.forEach((value, key) => {
    // Skip stock_level in forEach - handle it separately as multi-value
    if (key === "stock_level") return;
    
    if (!["category", "branch_code", "page", "per_page", "in_stock"].includes(key)) {
      const label = filterLabels[key]?.[value] || value;
      activeFilters.push({ key, value, label });
    }
  });
  
  // Handle stock_level as multi-value filter
  const stockLevels = searchParams.getAll("stock_level");
  stockLevels.forEach(level => {
    const label = filterLabels.stock_level?.[level] || level;
    activeFilters.push({ key: "stock_level", value: level, label });
  });

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-600">Active filters:</span>
      {activeFilters.map((filter, idx) => (
        <button
          key={`${filter.key}-${filter.value}-${idx}`}
          onClick={() => removeFilter(filter.key, filter.value)}
          className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <span>
            {filter.key === "meat_type" ? "Type" : filter.key === "attributes" ? "Attribute" : filter.key}: {filter.label}
          </span>
          <X className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      ))}
      <button
        onClick={clearAll}
        className="text-sm text-primary hover:text-primary font-medium ml-2"
      >
        Clear all
      </button>
    </div>
  );
}

