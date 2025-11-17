"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { Clock, Package, CreditCard, Award, ChevronDown } from "lucide-react";
import { getSpendSaveProgress } from "@/lib/data/mock-spend-save";

export function WelcomeBar() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [activeOrders, setActiveOrders] = useState(0);
  const [accountCredit, setAccountCredit] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(850);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [slotDropdownOpen, setSlotDropdownOpen] = useState(false);
  
  // Available delivery slots
  const deliverySlots = [
    "8am-10am",
    "10am-12pm",
    "12pm-2pm",
    "2pm-4pm"
  ];
  
  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);
    
    if (currentUser) {
      // Mock data for orders and credit (for prototype)
      setActiveOrders(0); // No orders in localStorage basket system
      setAccountCredit(0); // Simplified for prototype
      
      // Get loyalty points from spend/save progress
      const userId = currentSession?.user?.id || 'user-test-001';
      const spendSave = getSpendSaveProgress(userId);
      if (spendSave) {
        // Mock loyalty points calculation (could be based on tier progress)
        setLoyaltyPoints(850);
      }
      
      // Load saved delivery slot preference
      const savedSlot = localStorage.getItem('preferredDeliverySlot');
      if (savedSlot) {
        setSelectedSlot(savedSlot);
      } else {
        // Default to first slot
        setSelectedSlot(deliverySlots[0]);
      }
    }
  }, []);

  // Get next delivery day
  const getNextDeliveryDay = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 15) {
      // Before 3pm - can get next day delivery
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    } else {
      // After 3pm - delivery is day after tomorrow
      const dayAfter = new Date(now);
      dayAfter.setDate(dayAfter.getDate() + 2);
      return dayAfter;
    }
  };

  const formatDeliveryDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deliveryDate = new Date(date);
    deliveryDate.setHours(0, 0, 0, 0);
    
    if (deliveryDate.getTime() === today.getTime()) {
      return "Today";
    }
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (deliveryDate.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[deliveryDate.getDay()];
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
    localStorage.setItem('preferredDeliverySlot', slot);
    setSlotDropdownOpen(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (!session?.user) {
    return null;
  }

  const userName = user?.full_name || session.user.name || "User";
  const businessName = user?.business_name || "The Red Lion Restaurant";
  const nextDeliveryDay = getNextDeliveryDay();
  const deliveryDayLabel = formatDeliveryDate(nextDeliveryDay);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Row */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left: Greeting */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              {getGreeting()}, {userName}
            </h1>
            <p className="text-gray-600 text-sm">{businessName}</p>
          </div>

          {/* Center: Key Metrics */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6">
            {/* Active Orders */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 min-w-[140px] border border-gray-200">
              <Package className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-600">Active Orders</div>
                <div className="text-lg font-bold text-gray-900">{activeOrders}</div>
              </div>
            </div>

            {/* Account Credit */}
            {accountCredit > 0 && (
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 min-w-[140px] border border-gray-200">
                <CreditCard className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-gray-600">Credit</div>
                  <div className="text-lg font-bold text-gray-900">£{accountCredit.toFixed(2)}</div>
                </div>
              </div>
            )}

            {/* Loyalty Points */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 min-w-[140px] border border-gray-200">
              <Award className="w-4 h-4 text-primary flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-600">Points</div>
                <div className="text-lg font-bold text-gray-900">{loyaltyPoints}</div>
              </div>
            </div>
          </div>

          {/* Right: Delivery Slot Selector */}
          <div className="relative flex-shrink-0">
            <div className="text-xs text-gray-600 mb-1">Next delivery:</div>
            <div className="relative">
              <button
                onClick={() => setSlotDropdownOpen(!slotDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors min-w-[180px] text-left"
              >
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="flex-1 text-sm font-medium text-gray-900">
                  {deliveryDayLabel} {selectedSlot}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${slotDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown menu */}
              {slotDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setSlotDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[200px] overflow-hidden">
                    <div className="py-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-200">
                        {deliveryDayLabel}
                      </div>
                      {deliverySlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleSlotSelect(slot)}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary hover:text-white transition-colors ${
                            selectedSlot === slot
                              ? 'bg-primary text-white font-medium'
                              : 'text-gray-900'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

