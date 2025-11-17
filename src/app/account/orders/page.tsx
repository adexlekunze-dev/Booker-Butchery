"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/mock-auth";

export default function OrdersPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    
    // If not logged in, redirect to login
    if (!currentSession?.user) {
      router.push("/login");
      return;
    }

    setSession(currentSession);
    
    // For prototype, orders are stored in localStorage if any exist
    // In a real implementation, this would fetch from an API
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
    
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
          <div className="text-lg text-gray-600">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Order History</h1>
        {!orders?.length ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-600 mb-4">No orders yet.</p>
            <p className="text-sm text-gray-500">
              In the prototype, orders are stored locally. In a full implementation, orders would be persisted in the database.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-4 border-b font-semibold text-gray-900">Order #</th>
                  <th className="p-4 border-b font-semibold text-gray-900">Date</th>
                  <th className="p-4 border-b font-semibold text-gray-900">Status</th>
                  <th className="p-4 border-b font-semibold text-gray-900">Total</th>
                  <th className="p-4 border-b font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: any) => (
                  <tr key={o.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-gray-900">{o.order_number}</td>
                    <td className="p-4 text-gray-600">{new Date(o.order_date).toLocaleString()}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {o.status || 'Completed'}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-gray-900">£{Number(o.totals?.total ?? 0).toFixed(2)}</td>
                    <td className="p-4">
                      <a className="text-primary hover:underline" href={`/account/orders/${o.id}`}>
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
