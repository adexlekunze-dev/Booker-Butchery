"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ProductsRedirectContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Handle old-style filter parameter
    const filter = searchParams.get("filter");
    
    if (filter) {
      // Handle special case: filter=halal should go to halal=true
      if (filter.toLowerCase() === "halal") {
        const params = new URLSearchParams();
        params.set("halal", "true");
        
        // Preserve any other query parameters (if any)
        searchParams.forEach((value, key) => {
          if (key !== "filter") {
            params.append(key, value);
          }
        });
        
        router.replace(`/butchery/shop?${params.toString()}`);
        return;
      }
      
      // Convert filter=blackgate to brand=Blackgate
      // Handle both lowercase and already-capitalized brand names
      let brandName = filter;
      
      // If all lowercase, capitalize first letter
      if (filter === filter.toLowerCase()) {
        brandName = filter.charAt(0).toUpperCase() + filter.slice(1);
      }
      
      // Build new URL with brand parameter
      const params = new URLSearchParams();
      params.set("brand", brandName);
      
      // Preserve any other query parameters (if any)
      searchParams.forEach((value, key) => {
        if (key !== "filter") {
          params.append(key, value);
        }
      });
      
      router.replace(`/butchery/shop?${params.toString()}`);
      return;
    }

    // If no filter, redirect to main shop page
    // Preserve any other query parameters
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "filter") {
        params.append(key, value);
      }
    });
    
    const queryString = params.toString();
    router.replace(queryString ? `/butchery/shop?${queryString}` : "/butchery/shop");
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-lg text-gray-600">Redirecting...</div>
      </div>
    </div>
  );
}

export default function ProductsRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    }>
      <ProductsRedirectContent />
    </Suspense>
  );
}

