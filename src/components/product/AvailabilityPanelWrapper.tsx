"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getProductBySku } from "@/lib/data/products";
import { getBranchByCode } from "@/lib/data/branches";
import { AvailabilityPanel } from "./AvailabilityPanel";
import Link from "next/link";

interface AvailabilityData {
  product: {
    id: string;
    sku: string;
    name: string;
    brand: string;
    price?: number;
  };
  // Non-authenticated
  national_availability?: {
    in_stock: boolean;
    stock_level: "available" | "low" | "out";
    branches_with_stock: number;
    total_branches: number;
  };
  // Authenticated
  primary_branch_availability?: {
    branch: {
      id: string;
      branch_code: string;
      name: string;
    };
    in_stock: boolean;
    stock_level: "high" | "medium" | "low" | "out";
    exact_count: number;
    available_for_delivery: boolean;
    available_for_click_collect: boolean;
    distance_miles?: number;
    next_delivery_slot?: string;
  };
  alternate_branches?: Array<{
    branch: {
      id: string;
      branch_code: string;
      name: string;
    };
    in_stock: boolean;
    stock_level: "high" | "medium" | "low" | "out";
    exact_count: number;
    available_for_click_collect: boolean;
    distance_miles: number;
  }>;
}

interface AvailabilityPanelWrapperProps {
  sku: string;
}

export function AvailabilityPanelWrapper({ sku }: AvailabilityPanelWrapperProps) {
  const [session, setSession] = useState<any>(null);
  const [availability, setAvailability] = useState<AvailabilityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    
    setLoading(true);
    setError(null);

    // For authenticated users, get product and branch data
    if (currentSession?.user && currentUser?.primary_branch_code) {
      try {
        const product = getProductBySku(sku, currentUser.primary_branch_code);
        if (!product) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        const branch = getBranchByCode(currentUser.primary_branch_code);
        const branchInventory = product.inventory[currentUser.primary_branch_code];
        
        if (branch && branchInventory) {
          setAvailability({
            product: {
              id: product.id,
              sku: product.sku,
              name: product.name,
              brand: product.brand,
              price: product.base_price,
            },
            primary_branch_availability: {
              branch: {
                id: branch.id,
                branch_code: branch.branch_code,
                name: branch.name,
              },
              in_stock: branchInventory.in_stock,
              stock_level: branchInventory.stock_level,
              exact_count: branchInventory.exact_count,
              available_for_delivery: branchInventory.available_for_delivery,
              available_for_click_collect: branchInventory.available_for_click_collect,
              distance_miles: 2.3, // Mock distance for prototype
              next_delivery_slot: branchInventory.in_stock ? undefined : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            },
          });
        }
      } catch (err) {
        console.error("Error loading availability:", err);
        setError("Unable to load availability");
      }
    }

    setLoading(false);

    // Listen for storage changes
    const handleStorageChange = () => {
      setSession(getSession());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [sku]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !availability) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="text-red-600">{error || "Unable to load availability"}</div>
      </div>
    );
  }

  // Non-authenticated users - show national availability
  if (!session?.user && availability.national_availability) {
    const national = availability.national_availability;
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4 sticky top-20">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Product Availability</h3>
          <div className={`rounded-lg p-4 ${
            national.in_stock 
              ? national.stock_level === "out" 
                ? "bg-red-50 border border-red-200" 
                : "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}>
            <div className={`font-semibold mb-1 ${
              national.in_stock ? "text-green-700" : "text-red-700"
            }`}>
              {national.in_stock ? "Available" : "Out of Stock"}
            </div>
            {national.in_stock && (
              <div className="text-sm text-gray-700">
                Available at {national.branches_with_stock} of {national.total_branches} branches nationwide
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Sign in to see stock at your local branch and place orders
          </p>
          <Link
            href="/login"
            className="block w-full text-center py-2 px-4 bg-primary text-white rounded hover:bg-orange-600 transition-colors font-medium"
          >
            Sign In to Check Your Branch
          </Link>
        </div>
      </div>
    );
  }

  // Authenticated users - show branch-specific availability
  if (session?.user && availability?.primary_branch_availability) {
    const primary = availability.primary_branch_availability;

    return (
      <AvailabilityPanel
        branchCode={primary.branch.branch_code}
        branchName={primary.branch.name}
        distance={primary.distance_miles}
        stockLevel={primary.stock_level}
        exactCount={primary.exact_count}
        inStock={primary.in_stock}
        availableForDelivery={primary.available_for_delivery}
        availableForClickCollect={primary.available_for_click_collect}
        nextDeliveryDate={primary.next_delivery_slot}
        showOtherBranches={availability.alternate_branches && availability.alternate_branches.length > 0}
      />
    );
  }

  // If authenticated but no availability data, don't show anything (component will be hidden in PDP)
  return null;
}

