"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/mock-auth";
import { getBasket, getBasketTotal } from "@/lib/basket-localstorage";

export default function ReviewStep() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState<any>(null);
  const [basket, setBasket] = useState<any[]>([]);

  // Check session/basket only after mount (client-side only)
  useEffect(() => {
    const currentSession = getSession();
    const currentBasket = getBasket();
    setSession(currentSession);
    setBasket(currentBasket || []);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!basket || basket.length === 0) {
      setError("Your basket is empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const total = getBasketTotal();
      // Save order to localStorage (for prototype)
      const order = {
        id: `order-${Date.now()}`,
        order_number: `ORD-${Date.now()}`,
        user_email: session.user.email,
        user_name: session.user.name,
        items: basket,
        totals: {
          subtotal: total,
          total: total,
        },
        status: "confirmed",
        order_date: new Date().toISOString(),
        payment_method: "account",
      };

      // Save to localStorage
      const orders = localStorage.getItem('orders');
      const ordersList = orders ? JSON.parse(orders) : [];
      ordersList.push(order);
      localStorage.setItem('orders', JSON.stringify(ordersList));

      // Clear basket
      localStorage.removeItem('basket');

      // Redirect to order confirmation
      router.push(`/account/orders/${order.id}`);
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
      setLoading(false);
    }
  };

  // Show loading during initial render to prevent hydration mismatch
  if (session === null) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Please Sign In</h1>
        <p className="text-gray-600 mb-6">You need to be signed in to checkout.</p>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (!basket || basket.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Basket is Empty</h1>
        <p className="text-gray-600 mb-6">Add items to your basket before checkout.</p>
        <button
          onClick={() => router.push("/meat-fish-poultry/shop")}
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const total = getBasketTotal();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Checkout – Review & Confirm</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          {basket.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} x {item.quantity}</span>
              <span>£{(item.unit_price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="payment_method" value="account" />
        <p className="text-sm text-gray-700 mb-4">
          Your order will be split by delivery and collection where required. This is a simulated payment.
        </p>
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
}
