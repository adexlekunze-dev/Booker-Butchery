"use client";

import { useEffect, useState } from "react";
import { StockBadge } from "@/components/product/StockBadge";
import { StockUrgency } from "@/components/product/StockUrgency";
import { Button } from "@/components/ui/Button";
import { Package, Tag, Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/mock-auth";

type Product = {
  id: string;
  name: string;
  brand: string;
  images: string[];
  base_price: number;
  unit: string;
  pack_size?: string | null;
  on_offer?: boolean;
  availability?: any;
  sku?: string;
  rating?: number;
  review_count?: number;
  save_percent?: number;
  best_seller?: boolean;
};

export function ProductCard({ product }: { product: Product }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = getSession();
    setIsAuthenticated(!!session?.user);

    // Listen for storage changes
    const handleStorageChange = () => {
      const newSession = getSession();
      setIsAuthenticated(!!newSession?.user);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const productLink = `/products/${product.sku ?? product.id}`;
  const rating = product.rating ?? 4.8;
  const reviewCount = product.review_count ?? 156;
  const savePercent = product.save_percent;
  
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-150 border border-gray-200 overflow-hidden flex flex-col">
      <Link href={productLink} className="block relative">
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Package className="w-12 h-12" strokeWidth={1.5} />
            </div>
          )}
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {product.best_seller && (
              <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                Best Seller
              </div>
            )}
            {savePercent && (
              <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                Save {savePercent}%
              </div>
            )}
          </div>
          {/* Favorite Icon */}
          <button
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100 transition-colors border border-gray-200"
            aria-label="Add to favorites"
          >
            <Heart className="w-4 h-4 text-gray-600" strokeWidth={2} fill="none" />
          </button>
          {product.on_offer && (
            <div className="absolute bottom-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide flex items-center gap-1">
              <Tag className="w-3 h-3" strokeWidth={2} />
              ON OFFER
            </div>
          )}
        </div>
      </Link>
      <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5 flex-1">
        {/* Brand */}
        <div className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
          {product.brand}
        </div>
        {/* Product Name */}
        <Link 
          href={productLink} 
          className="block font-bold text-sm sm:text-base text-gray-900 hover:text-primary transition-colors line-clamp-2 leading-tight"
        >
          {product.name}
        </Link>
        {/* Weight/Quantity */}
        {(product.pack_size || product.unit) && (
          <div className="text-xs text-gray-500">
            {product.pack_size ? product.pack_size : `${product.unit ? `per ${product.unit}` : ""}`}
          </div>
        )}
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? "text-primary fill-primary"
                    : i < rating
                    ? "text-primary fill-primary opacity-50"
                    : "text-gray-300 fill-none"
                }`}
                strokeWidth={2}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-700">{rating}</span>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>
        {/* Stock Badge */}
        <StockBadge availability={product.availability} />

        {/* Stock Urgency Messaging */}
        <StockUrgency product={product} variant="inline" />

        {/* Price - Show to everyone */}
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg sm:text-2xl font-bold text-gray-900">
              £{product.base_price.toFixed(2)}
            </span>
            {product.unit && (
              <span className="text-xs sm:text-sm text-gray-500">per {product.unit}</span>
            )}
          </div>
          {isAuthenticated ? (
            <Button 
              variant="primary" 
              size="sm" 
              block
              className="text-xs font-bold"
              icon={<ShoppingCart className="w-3.5 h-3.5" strokeWidth={2} />}
              onClick={(e) => {
                e.preventDefault();
                // Add to basket logic here
              }}
            >
              Add to Basket
            </Button>
          ) : (
            <Link href="/register">
              <Button 
                variant="primary" 
                size="sm" 
                block
                className="text-xs font-bold"
              >
                Become a Member
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}


