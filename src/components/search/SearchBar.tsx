"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export function SearchBar() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();
  const timer = useRef<any>(null);

  useEffect(() => {
    if (!q || q.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // Use client-side search function
      import("@/lib/data/products").then(({ searchProducts }) => {
        import("@/lib/mock-auth").then(({ getUser }) => {
          const user = getUser();
          const branchCode = user?.primary_branch_code;
          
          const results = searchProducts(q, branchCode);
          
          // Transform to match expected format
          const suggestions = results.map(p => ({
            sku: p.sku,
            name: p.name,
            in_stock_at_branch: p.availability?.in_stock || false,
          }));
          
          setSuggestions(suggestions);
          setOpen(true);
        });
      });
    }, 300);
    return () => clearTimeout(timer.current);
  }, [q]);

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
            }
          }}
          placeholder="Search products, brands, or categories..."
          className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2.5 text-base min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute z-dropdown mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <ul className="text-sm divide-y divide-gray-100">
            {suggestions.slice(0, 5).map((s: any) => (
              <li key={s.sku}>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center justify-between transition-colors"
                  onClick={() => {
                    router.push(`/products/${s.sku}`);
                    setOpen(false);
                    setQ("");
                  }}
                >
                  <span className="truncate text-gray-900">{s.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${s.in_stock_at_branch ? "text-gray-900 bg-gray-100" : "text-gray-600 bg-gray-100"}`}>
                    {s.in_stock_at_branch ? "In stock" : "Check stock"}
                  </span>
                </button>
              </li>
            ))}
            <li className="border-t border-gray-200">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-50 text-primary font-medium transition-colors"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(q)}`);
                  setOpen(false);
                  setQ("");
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


