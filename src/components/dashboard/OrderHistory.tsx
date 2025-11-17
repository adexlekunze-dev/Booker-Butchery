"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/mock-auth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Package, Copy, FileText } from "lucide-react";

export function OrderHistory() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
  }, []);

  if (!session?.user) {
    return null;
  }

  // Mock recent orders
  const recentOrders = [
    { id: 'ORD-2024-001', date: '26 Nov', amount: 412.00, status: 'Delivered', items: 18 },
    { id: 'ORD-2024-002', date: '19 Nov', amount: 398.00, status: 'Delivered', items: 17 },
    { id: 'ORD-2024-003', date: '12 Nov', amount: 405.00, status: 'Delivered', items: 19 },
    { id: 'ORD-2024-004', date: '5 Nov', amount: 387.50, status: 'Delivered', items: 16 },
    { id: 'ORD-2024-005', date: '29 Oct', amount: 421.80, status: 'Delivered', items: 20 },
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              📦 Order History
            </h2>
            <p className="text-gray-600">Quick reorder from recent purchases</p>
          </div>
          <Link href="/account/orders">
            <Button variant="secondary" size="sm">
              View All
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Order Info */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{order.date}</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.items} items • £{order.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{order.id}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:flex-shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Copy className="w-4 h-4" />}
                    onClick={() => {
                      console.log(`Reorder ${order.id}`);
                    }}
                  >
                    Reorder
                  </Button>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={<FileText className="w-4 h-4" />}
                    >
                      Invoice
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

