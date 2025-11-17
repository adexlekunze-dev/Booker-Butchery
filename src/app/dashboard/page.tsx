"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/mock-auth";
import { WelcomeBar } from "@/components/dashboard/WelcomeBar";
import { QuickReorderHub } from "@/components/dashboard/QuickReorderHub";
import { OrderCompletion } from "@/components/dashboard/OrderCompletion";
import { OrderHistory } from "@/components/dashboard/OrderHistory";
import { BusinessSnapshot } from "@/components/dashboard/BusinessSnapshot";
import { QuickLinks } from "@/components/dashboard/QuickLinks";
import { SeasonalPromos } from "@/components/dashboard/SeasonalPromos";

// Commented out - not in current use
// import { BuildYourTuesdayOrderSection } from "@/components/dashboard/BuildYourTuesdayOrderSection";
// import { BuyAgainSection } from "@/components/home/BuyAgainSection";
// import { CompleteOrderSection } from "@/components/dashboard/CompleteOrderSection";
// import { QuickReorderHubSection } from "@/components/dashboard/QuickReorderHubSection";
// import { BusinessSnapshotSection } from "@/components/dashboard/BusinessSnapshotSection";
// import { DecemberAlertsSection } from "@/components/dashboard/DecemberAlertsSection";
// import { DecemberSeasonPicksSection } from "@/components/dashboard/DecemberSeasonPicksSection";
// import { BusinessServicesDashboardSection } from "@/components/dashboard/BusinessServicesDashboardSection";
// import { FinalRemindersSection } from "@/components/dashboard/FinalRemindersSection";
// import { SmartReminderSection } from "@/components/dashboard/SmartReminderSection";
// import { ResourcesSection } from "@/components/dashboard/ResourcesSection";

export default function DashboardPage() {
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

    // Listen for storage changes (logout detection)
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
          <div className="text-lg text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Bar - Top header with delivery slot and quick stats */}
      <WelcomeBar />

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Quick Reorder Hub - Fast reordering from lists and history */}
          <QuickReorderHub />

          {/* Order Completion - Complete and optimize current basket */}
          <OrderCompletion />

          {/* Order History - Recent orders with reorder capability */}
          <OrderHistory />

          {/* Business Snapshot - Analytics and performance metrics */}
          <BusinessSnapshot />

          {/* Quick Links - Fast access to important pages */}
          <QuickLinks />

          {/* Seasonal Promotions - Current offers and deals */}
          <SeasonalPromos />

          {/* Commented out - not in current use */}
          {/* <BuildYourTuesdayOrderSection /> */}
          {/* <BuyAgainSection /> */}
          {/* <CompleteOrderSection /> */}
          {/* <QuickReorderHubSection /> */}
          {/* <BusinessSnapshotSection /> */}
          {/* <DecemberAlertsSection /> */}
          {/* <DecemberSeasonPicksSection /> */}
          {/* <BusinessServicesDashboardSection /> */}
          {/* <FinalRemindersSection /> */}
          {/* <SmartReminderSection /> */}
          {/* <ResourcesSection /> */}
        </div>
      </div>
    </div>
  );
}
