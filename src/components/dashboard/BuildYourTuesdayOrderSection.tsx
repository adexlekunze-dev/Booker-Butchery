"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getPreviousOrdersByDay, getLastOrder } from "@/lib/data/mock-order-patterns";
import { getShoppingLists } from "@/lib/data/mock-shopping-lists";
import { Button } from "@/components/ui/Button";
import { Copy, List, RotateCcw, Calendar } from "lucide-react";
import Link from "next/link";

export function BuildYourTuesdayOrderSection() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [previousOrders, setPreviousOrders] = useState<any[]>([]);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [shoppingLists, setShoppingLists] = useState<any[]>([]);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      
      // Calculate next delivery day respecting 3pm cutoff
      const now = new Date();
      const hour = now.getHours();
      let deliveryDate: Date;
      
      if (hour < 15) {
        // Before 3pm - can get next day delivery
        deliveryDate = new Date(now);
        deliveryDate.setDate(now.getDate() + 1);
      } else {
        // After 3pm - delivery is day after tomorrow
        deliveryDate = new Date(now);
        deliveryDate.setDate(now.getDate() + 2);
      }
      
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const nextDeliveryDayName = days[deliveryDate.getDay()];
      
      // Get orders for the next delivery day
      const orders = getPreviousOrdersByDay(userId, nextDeliveryDayName, 2);
      const last = getLastOrder(userId, nextDeliveryDayName);
      const lists = getShoppingLists(userId);

      setPreviousOrders(orders);
      setLastOrder(last);
      setShoppingLists(lists.slice(0, 1)); // Get first list for "WEEKLY ORDER"
    }
  }, []);

  if (!session?.user) {
    return null;
  }

  const handleCopyOrder = (orderId: string) => {
    // TODO: Implement copy order to basket functionality
    console.log('Copy order:', orderId);
  };

  const handleCopyPreviousOrder = (orderId: string) => {
    // TODO: Implement copy previous order to basket
    console.log('Copy previous order:', orderId);
  };

  const getDayName = (dateString: string) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  // Calculate next delivery day respecting 3pm cutoff
  const getNextDeliveryDay = () => {
    const now = new Date();
    const hour = now.getHours();
    
    let deliveryDate: Date;
    if (hour < 15) {
      // Before 3pm - can get next day delivery
      deliveryDate = new Date(now);
      deliveryDate.setDate(now.getDate() + 1);
    } else {
      // After 3pm - delivery is day after tomorrow
      deliveryDate = new Date(now);
      deliveryDate.setDate(now.getDate() + 2);
    }
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return {
      dayName: days[deliveryDate.getDay()],
      month: months[deliveryDate.getMonth()],
      day: deliveryDate.getDate(),
      year: deliveryDate.getFullYear(),
      fullDate: `${days[deliveryDate.getDay()]}, ${months[deliveryDate.getMonth()]} ${deliveryDate.getDate()}, ${deliveryDate.getFullYear()}`
    };
  };

  const nextDelivery = getNextDeliveryDay();

  return (
    <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            ⚡ BUILD YOUR {nextDelivery.dayName.toUpperCase()} ORDER:
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Copy Complete Last Tuesday Order */}
          {lastOrder && (
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900">COPY COMPLETE LAST {nextDelivery.dayName.toUpperCase()} ORDER</h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-4">
                <div className="border-t border-gray-200 pt-2">
                  <div className="font-semibold text-gray-900">£{lastOrder.total_value.toFixed(2)} • {lastOrder.items_count} items</div>
                  <div className="text-xs">{lastOrder.categories.join(', ')}</div>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCopyOrder(lastOrder.id)}
                className="w-full text-xs sm:text-sm min-h-[44px] touch-manipulation"
              >
                Copy to Basket
              </Button>
            </div>
          )}

          {/* Copy Previous Order */}
          {previousOrders.length > 1 && (
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900">COPY {previousOrders[1].order_number.substring(7, 12).toUpperCase()} ORDER</h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-4">
                <div className="border-t border-gray-200 pt-2">
                  <div className="font-semibold text-gray-900">£{previousOrders[1].total_value.toFixed(2)} • {previousOrders[1].items_count} items</div>
                  <div className="text-xs">{previousOrders[1].categories.join(', ')}</div>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleCopyPreviousOrder(previousOrders[1].id)}
                className="w-full text-xs sm:text-sm min-h-[44px] touch-manipulation"
              >
                Copy to Basket
              </Button>
            </div>
          )}

          {/* Shopping List */}
          {shoppingLists.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <List className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900">"{shoppingLists[0].name}" LIST</h3>
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-4">
                <div className="border-t border-gray-200 pt-2">
                  <div className="font-semibold text-gray-900">{shoppingLists[0].item_count} items</div>
                  <div className="text-xs">Multi-category</div>
                </div>
              </div>
              <Link href="/quick-order?tab=lists">
                <Button variant="primary" size="sm" className="w-full text-xs sm:text-sm min-h-[44px] touch-manipulation">
                  Open List
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

