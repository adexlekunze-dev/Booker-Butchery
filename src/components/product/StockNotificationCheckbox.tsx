"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { getSession } from "@/lib/mock-auth";

interface StockNotificationCheckboxProps {
  productId: string;
  sku: string;
  inStock?: boolean | null;
}

export function StockNotificationCheckbox({ productId, sku, inStock }: StockNotificationCheckboxProps) {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    // Check subscription status from localStorage
    if (typeof window !== 'undefined') {
      const notifications = localStorage.getItem('stockNotifications');
      if (notifications) {
        try {
          const notificationsList = JSON.parse(notifications);
          setSubscribed(notificationsList.includes(sku));
        } catch (e) {
          // Invalid JSON, ignore
        }
      }
      setChecking(false);
    }
  }, [sku]);

  const handleToggle = () => {
    if (loading || !session?.user) return;

    setLoading(true);
    try {
      // Save to localStorage
      if (typeof window !== 'undefined') {
        const notifications = localStorage.getItem('stockNotifications');
        let notificationsList: string[] = [];
        
        if (notifications) {
          try {
            notificationsList = JSON.parse(notifications);
          } catch (e) {
            // Invalid JSON, start fresh
          }
        }

        if (subscribed) {
          // Unsubscribe - remove from list
          notificationsList = notificationsList.filter((s) => s !== sku);
          setSubscribed(false);
        } else {
          // Subscribe - add to list
          if (!notificationsList.includes(sku)) {
            notificationsList.push(sku);
          }
          setSubscribed(true);
        }

        localStorage.setItem('stockNotifications', JSON.stringify(notificationsList));
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
      alert("Failed to update notification preference");
    } finally {
      setLoading(false);
    }
  };

  // Don't show if product is in stock or user not authenticated
  if (inStock || !session?.user) {
    return null;
  }

  if (checking) {
    return null;
  }

  return (
    <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={subscribed}
          onChange={handleToggle}
          disabled={loading}
          className="w-5 h-5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 disabled:opacity-50"
        />
        <span className="text-sm font-medium text-gray-900">
          Notify me when in stock
        </span>
        {subscribed && (
          <span className="text-xs text-green-600 flex items-center gap-1">
            <Check className="w-3 h-3" />
            Subscribed
          </span>
        )}
      </label>
      <p className="text-xs text-gray-600 mt-2 ml-8">
        We'll send an email to your account when this product becomes available at your branch.
      </p>
    </div>
  );
}
