"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Image from "next/image";
import productsData from '@/data/products.json';

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

// Get all unique brands from products
const getAllBrands = (): string[] => {
  const brands = new Set<string>();
  (productsData as any[]).forEach(product => {
    if (product.brand && product.active) {
      brands.add(product.brand);
    }
  });
  return Array.from(brands);
};

export function SearchBar({ onResultClick }: { onResultClick?: () => void } = {}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [productSuggestions, setProductSuggestions] = useState<any[]>([]);
  const [categorySuggestions, setCategorySuggestions] = useState<any[]>([]);
  const [brandSuggestions, setBrandSuggestions] = useState<any[]>([]);
  const [nonProductSuggestions, setNonProductSuggestions] = useState<any[]>([]);
  const router = useRouter();
  const timer = useRef<any>(null);

  useEffect(() => {
    if (!q || q.length < 1) {
      setProductSuggestions([]);
      setCategorySuggestions([]);
      setBrandSuggestions([]);
      setNonProductSuggestions([]);
      setOpen(false);
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const searchLower = q.toLowerCase();
      
      // Combine and prioritize all non-product suggestions together (categories + brands)
      const allCategories = getAllCategories();
      const allBrands = getAllBrands();
      
      const allNonProductSuggestions = [
        ...allCategories.map(cat => ({
          type: 'category' as const,
          name: cat,
          score: cat.toLowerCase().startsWith(searchLower) ? 2 : 
                 cat.toLowerCase().includes(searchLower) ? 1 : 0,
          route: `/butchery/shop?category=${encodeURIComponent(cat.toUpperCase())}`
        })),
        ...allBrands.map(brand => ({
          type: 'brand' as const,
          name: brand,
          score: brand.toLowerCase().startsWith(searchLower) ? 2 : 
                 brand.toLowerCase().includes(searchLower) ? 1 : 0,
          route: `/search?q=${encodeURIComponent(brand)}`
        }))
      ]
        .filter(item => item.score > 0)
        .sort((a, b) => {
          // First sort by score (match quality)
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          // If same score, prioritize categories over brands
          if (a.type !== b.type) {
            return a.type === 'category' ? -1 : 1;
          }
          // If same type and score, sort alphabetically
          return a.name.localeCompare(b.name);
        })
        .slice(0, 4); // Show top 4 non-product suggestions total
      
      // Store the prioritized combined list for display
      setNonProductSuggestions(allNonProductSuggestions);
      
      // Also split back into categories and brands for backward compatibility
      setCategorySuggestions(
        allNonProductSuggestions
          .filter(s => s.type === 'category')
          .map(s => ({
            type: 'category',
            name: s.name,
            route: s.route
          }))
      );
      
      setBrandSuggestions(
        allNonProductSuggestions
          .filter(s => s.type === 'brand')
          .map(s => ({
            type: 'brand',
            name: s.name,
            route: s.route
          }))
      );
      
      // Use client-side search function for products
      import("@/lib/data/products").then(({ searchProducts }) => {
        import("@/lib/mock-auth").then(({ getUser }) => {
          const user = getUser();
          const branchCode = user?.primary_branch_code;
          
          const results = searchProducts(q, branchCode);
          
          // Transform to include all product details
          const suggestions = results.map(p => ({
            type: 'product',
            sku: p.sku,
            name: p.name,
            pack_size: p.pack_size || null,
            image: p.images?.[0] || null,
            base_price: p.base_price || null,
            exact_count: p.availability?.exact_count || null,
            in_stock_at_branch: p.availability?.in_stock || false,
            stock_level: p.availability?.stock_level || null,
          }));
          
          setProductSuggestions(suggestions);
          setOpen(true);
        });
      });
    }, 300);
    return () => clearTimeout(timer.current);
  }, [q]);

  const hasAnySuggestions = productSuggestions.length > 0 || nonProductSuggestions.length > 0;
  const maxNonProductSuggestions = 4; // Show up to 4 non-product suggestions first
  const maxProductSuggestions = Math.max(0, 10 - Math.min(nonProductSuggestions.length, maxNonProductSuggestions)); // Remaining slots for products

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" strokeWidth={2} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${encodeURIComponent(q)}`);
              setOpen(false);
              onResultClick?.();
            }
          }}
          placeholder="Search products, brands, or categories..."
          className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2.5 text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
      {open && hasAnySuggestions && (
        <div className="absolute z-[100] mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden max-h-[500px] overflow-y-auto">
          <ul className="text-sm divide-y divide-gray-100">
            {/* Category and Brand Suggestions (non-products) - First, Prioritized by Match Quality */}
            {nonProductSuggestions.slice(0, maxNonProductSuggestions).map((s: any, idx: number) => (
              <li key={`${s.type}-${idx}-${s.name}`}>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => {
                    router.push(s.route);
                    setOpen(false);
                    setQ("");
                    onResultClick?.();
                  }}
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded">
                    <Search className="w-4 h-4 text-gray-600" strokeWidth={2} />
                  </div>
                  <span className="truncate text-gray-900 font-medium">{s.name}</span>
                </button>
              </li>
            ))}
            
            {/* Product Suggestions - After Non-Products */}
            {productSuggestions.slice(0, maxProductSuggestions).map((s: any) => (
              <li key={s.sku}>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  onClick={() => {
                    router.push(`/products/${s.sku}`);
                    setOpen(false);
                    setQ("");
                    onResultClick?.();
                  }}
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Search className="w-5 h-5 text-gray-400" strokeWidth={2} />
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 truncate">{s.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      {s.pack_size && (
                        <div className="text-xs text-gray-500">{s.pack_size}</div>
                      )}
                      {s.base_price && (
                        <div className="text-xs font-semibold text-primary">
                          £{s.base_price.toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Stock Count */}
                  <div className="flex-shrink-0 text-right">
                    {(() => {
                      // Use same logic as StockBadge component
                      const isOutOfStock = s.in_stock_at_branch === false || 
                        (s.in_stock_at_branch === null && (!s.stock_level || s.stock_level === "out"));
                      
                      if (isOutOfStock) {
                        return <div className="text-xs text-gray-500">Out of stock</div>;
                      }
                      
                      if (s.exact_count !== null && s.exact_count !== undefined) {
                        return (
                          <div className="text-xs font-medium text-gray-900">
                            {s.exact_count} in stock
                          </div>
                        );
                      }
                      
                      // Use stock_level to determine label (same as StockBadge)
                      const stockLevel = (s.stock_level === "out" ? "high" : s.stock_level) || "high";
                      const labels: Record<"high" | "medium" | "low", string> = {
                        high: "In stock - High availability",
                        medium: "In stock - Medium",
                        low: "Limited stock"
                      };
                      
                      return (
                        <div className="text-xs text-gray-600">
                          {labels[stockLevel as "high" | "medium" | "low"]}
                        </div>
                      );
                    })()}
                  </div>
                </button>
              </li>
            ))}
            
            {/* View all results */}
            <li className="border-t border-gray-200">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-primary font-medium transition-colors"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(q)}`);
                  setOpen(false);
                  setQ("");
                  onResultClick?.();
                }}
              >
                View all results for "{q}"
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}


