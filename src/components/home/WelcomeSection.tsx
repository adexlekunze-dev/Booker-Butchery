"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Clock, Package, CreditCard, ChevronDown } from "lucide-react";

export function WelcomeSection() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [activeOrders, setActiveOrders] = useState(0);
  const [accountCredit, setAccountCredit] = useState(0);
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
      
      // Load saved delivery slot preference
      const savedSlot = localStorage.getItem('preferredDeliverySlot');
      if (savedSlot) {
        setSelectedSlot(savedSlot);
      } else {
        // Default to first slot
        setSelectedSlot(deliverySlots[0]);
      }
    }
    
    // Listen for storage changes
    const handleStorageChange = () => {
      const newSession = getSession();
      const newUser = getUser();
      setSession(newSession);
      setUser(newUser);
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
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
  
  if (!session?.user) {
    return (
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Welcome to Booker Wholesale
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Quality products delivered to your business. Real-time stock visibility across 170+ branches.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/login">
                <Button variant="primary" size="md">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary" size="md">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const userName = user?.full_name || session.user.name || "User";

  // Get current date and time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getFormattedDate = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    
    return `${dayName}, ${month} ${day}, ${year}`;
  };

  const getSunEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "☀️";
    if (hour < 18) return "🌤️";
    return "🌙";
  };

  const nextDeliveryDay = getNextDeliveryDay();
  const deliveryDayLabel = formatDeliveryDate(nextDeliveryDay);

  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl">
          {/* Header row: Greeting on left, Delivery slot selector on right */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-gray-900">
                {getGreeting()}, {userName}! {getSunEmoji()}
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                {getFormattedDate()}
              </p>
            </div>
            
            {/* Delivery Slot Selector - Right aligned */}
            <div className="relative sm:flex-shrink-0">
              <div className="flex flex-col sm:items-end gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Next delivery slot:
                </label>
                <div className="relative">
                  <button
                    onClick={() => setSlotDropdownOpen(!slotDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-primary transition-colors min-w-[180px] text-left sm:text-right"
                  >
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="flex-1 text-sm font-medium text-gray-900">
                      {deliveryDayLabel} {selectedSlot}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${slotDropdownOpen ? 'rotate-180' : ''}`} />
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {activeOrders > 0 && (
              <div className="flex items-center gap-2 text-gray-700">
                <Package className="w-5 h-5 text-primary" strokeWidth={2} />
                <span className="font-medium">Active orders:</span>
                <span>{activeOrders} (arriving soon)</span>
              </div>
            )}
            {accountCredit > 0 && (
              <div className="flex items-center gap-2 text-gray-700">
                <CreditCard className="w-5 h-5 text-primary" strokeWidth={2} />
                <span className="font-medium">Account credit available:</span>
                <span>£{accountCredit.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            {activeOrders > 0 && (
              <Link href="/account/orders">
                <Button variant="secondary" size="sm">
                  Track Orders
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
