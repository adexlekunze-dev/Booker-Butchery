"use client";

import { useEffect, useState } from "react";
import { getUser } from "@/lib/mock-auth";
import { getProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Sparkles, Calendar } from "lucide-react";

export function SeasonalProductsSection() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    const branchCode = user?.primary_branch_code;
    
    // Get seasonal products
    const result = getProducts({
      branchCode,
      seasonal: true,
      perPage: 8,
    });

    setProducts(result.products);
    setLoading(false);
  }, []);

  if (loading || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Seasonal Products</h2>
              <p className="text-gray-600 mt-1">Fresh seasonal items available now</p>
            </div>
          </div>
          <Link href="/meat-fish-poultry/shop?seasonal=true">
            <Button variant="secondary" size="sm">
              View All Seasonal
            </Button>
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
