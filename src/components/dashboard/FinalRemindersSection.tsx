"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/mock-auth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Gift, Calendar } from "lucide-react";
import { getCurrentMonth, getNextYear, getChristmasDeadline, isDecember } from "@/lib/utils/dates";

export function FinalRemindersSection() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
  }, []);

  if (!session?.user) {
    return null;
  }
  
  if (!isDecember()) {
    return null; // Only show in December
  }
  
  const currentMonth = getCurrentMonth();
  const nextYear = getNextYear();
  const christmasDeadline = getChristmasDeadline();
  
  // Calculate oil collection deadline (15 days before end of month, or Dec 15 if in December)
  const now = new Date();
  const currentYear = now.getFullYear();
  const oilDeadline = new Date(currentYear, 11, 15); // December 15
  const daysUntilOilDeadline = Math.max(0, Math.ceil((oilDeadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <section className="bg-gradient-to-r from-primary to-orange-600 text-white border-b border-gray-200 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-3xl font-bold mb-2">
            🎊 {currentMonth.toUpperCase()} FINAL REMINDERS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm">🎄 CHRISTMAS ORDERING DEADLINE</span>
            </div>
            <p className="text-xs sm:text-sm">{christmasDeadline.date}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm">🎊 NEW YEAR'S EVE STOCK</span>
            </div>
            <p className="text-xs sm:text-sm">Order champagne now (limited availability)</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm">🛢️ OIL COLLECTION</span>
            </div>
            <p className="text-xs sm:text-sm">Book before {christmasDeadline.date.includes('December 15') ? 'Dec 15' : oilDeadline.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} for £5 bonus voucher</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-semibold text-xs sm:text-sm">💰 GOLD TIER</span>
            </div>
            <p className="text-xs sm:text-sm">£313 away - reach it today!</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2">🎁 SPECIAL {currentMonth.toUpperCase()} OFFER:</h3>
          <p className="text-sm sm:text-base lg:text-lg mb-4">Spend £500+ today and get £50 voucher for January {nextYear}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link href="/basket" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 active:bg-gray-200 text-sm sm:text-base min-h-[48px] touch-manipulation">
              Start Your Festive Order Now
            </Button>
          </Link>
          <Link href="/offers" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto bg-white/20 text-white border-white hover:bg-white/30 active:bg-white/40 text-sm sm:text-base min-h-[48px] touch-manipulation">
              View All {currentMonth} Deals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

