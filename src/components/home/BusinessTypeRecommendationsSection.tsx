"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getProducts } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Store, Users } from "lucide-react";

export function BusinessTypeRecommendationsSection() {
  const [session, setSession] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);

    if (!currentSession?.user) {
      setLoading(false);
      return;
    }

    const branchCode = currentUser?.primary_branch_code;
    const userBusinessType = currentUser?.business_type;

    if (userBusinessType) {
      setBusinessType(userBusinessType);
      
      // Get best sellers for the business type (simplified for prototype)
      const result = getProducts({
        branchCode,
        bestSeller: true,
        perPage: 8,
      });

      setProducts(result.products);
    }

    setLoading(false);
  }, []);

  if (loading || !session?.user || !businessType || products.length === 0) {
    return null;
  }

  const businessTypeLabels: Record<string, string> = {
    restaurant: "Restaurants",
    pub: "Pubs & Bars",
    cafe: "Cafes",
    hotel: "Hotels",
  };

  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Store className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Recommended for {businessTypeLabels[businessType] || businessType}
              </h2>
              <p className="text-gray-600 mt-1">Curated products for your business type</p>
            </div>
          </div>
          <Link href="/best-sellers">
            <Button variant="secondary" size="sm">
              View All Recommendations
            </Button>
          </Link>
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
