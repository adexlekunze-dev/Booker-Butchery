"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/mock-auth";

export function OrderDetailClient({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    
    // If not logged in, redirect to login
    if (!currentSession?.user) {
      router.push("/login");
      return;
    }

    setSession(currentSession);
    setLoading(false);

    // Listen for storage changes
    const handleStorageChange = () => {
      const newSession = getSession();
      setSession(newSession);
      
      if (!newSession?.user) {
        router.push("/login");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading order...</div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null; // Will redirect
  }

  // For prototype, show a placeholder message since orders are in localStorage and not persisted
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-6">
            Order details are not available in the prototype. In a full implementation, orders would be stored and retrieved from the database.
          </p>
          <a
            href="/account/orders"
            className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Orders
          </a>
        </div>
      </div>
    </div>
  );
}

