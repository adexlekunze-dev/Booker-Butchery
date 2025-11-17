"use client";

import { useEffect } from "react";
import { addView } from "@/lib/recently-viewed";

type ProductViewTrackerProps = {
  product: {
    id: string;
    sku: string;
    name: string;
    category: string;
    base_price: number;
    images: string[] | null;
  };
};

export function ProductViewTracker({ product }: ProductViewTrackerProps) {
  useEffect(() => {
    if (product && product.id) {
      addView({
        id: product.id,
        sku: product.sku,
        name: product.name,
        category: product.category,
        base_price: product.base_price,
        images: Array.isArray(product.images) ? product.images : [],
      });
    }
  }, [product]);

  return null;
}

