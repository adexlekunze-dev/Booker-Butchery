"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getSpendSaveProgress } from "@/lib/data/mock-spend-save";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { TrendingUp, FileText, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { getCurrentMonth, getCurrentYear, getPreviousMonth, getMonthBeforePrevious, getNextYear, getChristmasDeadline, isFestiveSeason, formatShortMonth } from "@/lib/utils/dates";

export function BusinessSnapshotSection() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [spendSave, setSpendSave] = useState<any>(null);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      const progress = getSpendSaveProgress(userId);
      setSpendSave(progress);
    }
  }, []);

  if (!session?.user || !spendSave) {
    return null;
  }

  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();
  const previousMonth = getPreviousMonth();
  const monthBeforePrevious = getMonthBeforePrevious();
  const nextYear = getNextYear();
  
  const thisMonthSpend = spendSave.month_spend || 3687;
  const thisMonthOrders = 3; // Mock data
  const projectedMonthSpend = spendSave.projected_month_spend || 11200;
  const previousMonthSpend = 3456; // Mock data - would come from actual data
  const previousMonthOrders = 9; // Mock data
  const percentChange = ((thisMonthSpend - previousMonthSpend) / previousMonthSpend * 100).toFixed(1);
  
  // Calculate invoice due date (8th of current month, or next month if past 8th)
  const now = new Date();
  const currentDay = now.getDate();
  const invoiceDueDate = currentDay > 8 
    ? new Date(currentYear, now.getMonth() + 1, 8)
    : new Date(currentYear, now.getMonth(), 8);
  const invoiceDueText = invoiceDueDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  
  // Calculate Christmas deadline if in festive season
  const christmasDeadline = isFestiveSeason() ? getChristmasDeadline() : null;

  return (
    <section className="bg-white border-b border-gray-200 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900">
            📊 YOUR {getCurrentMonth().toUpperCase()} BUSINESS SNAPSHOT
          </h2>
          <Link href="/account/financial" className="w-full sm:w-auto">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm min-h-[44px] touch-manipulation">View Full Report →</Button>
          </Link>
        </div>
        <div className="h-1 w-full bg-gray-200 rounded-full mb-8">
          <div className="h-1 bg-primary rounded-full" style={{ width: '100%' }} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {/* This Month */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 bg-gray-50">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">THIS MONTH ({currentMonth.substring(0, 3)} 1-3)</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">£{thisMonthSpend.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-gray-600 mb-2">{thisMonthOrders} orders</div>
            <div className="text-sm text-green-600 font-semibold">
              On track for £{projectedMonthSpend.toLocaleString()}+ this month!
            </div>
          </div>

          {/* Previous Month */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 bg-gray-50">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">{previousMonth.name.toUpperCase()} {previousMonth.year}</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">£{previousMonthSpend.toLocaleString()}</div>
            <div className="text-xs sm:text-sm text-gray-600 mb-2">{previousMonthOrders} orders</div>
            <div className="text-xs sm:text-sm text-green-600 font-semibold">
              +{percentChange}% vs {monthBeforePrevious.name} {monthBeforePrevious.year}
            </div>
          </div>

          {/* Spend & Save */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 bg-gray-50">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">SPEND & SAVE</div>
            <div className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-1 uppercase">{spendSave.current_tier} Tier</div>
            <div className="text-xs sm:text-sm text-gray-600 mb-2">{spendSave.progress_percent}% to {spendSave.next_tier?.name || 'Gold'}</div>
            <div className="text-xs sm:text-sm text-blue-600 font-semibold">
              £{spendSave.month_cashback.toFixed(2)} saved this month
            </div>
            {spendSave.next_tier && (
              <div className="text-xs text-gray-500 mt-1">
                💡 Next order reaches {spendSave.next_tier.name}!
              </div>
            )}
          </div>

          {/* Invoices */}
          <div className="border border-gray-200 rounded-lg p-3 sm:p-4 lg:p-6 bg-gray-50">
            <div className="text-xs sm:text-sm text-gray-600 mb-1">INVOICES</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">1</div>
            <div className="text-xs sm:text-sm text-gray-600 mb-2">pending</div>
            <div className="text-xs sm:text-sm text-orange-600 font-semibold">Due: {invoiceDueText}</div>
            <Link href="/account/financial?tab=invoices" className="block mt-2">
              <Button variant="secondary" size="sm" className="w-full text-xs sm:text-sm min-h-[44px] touch-manipulation">View →</Button>
            </Link>
          </div>
        </div>

        {/* Performance & Goals - 2 Column Layout */}
        <div className="border border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column - Performance */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">📈 {currentMonth.toUpperCase()} PERFORMANCE:</h3>
              <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-700 ml-2 sm:ml-4">
                <li>Average order value up 18% vs {previousMonth.name} {isFestiveSeason() ? '(festive impact)' : ''}</li>
                <li>Order frequency on track for 10 orders this month</li>
                <li>Projected {currentMonth} spend: £{projectedMonthSpend.toLocaleString()} (highest ever!)</li>
              </ul>
            </div>

            {/* Right Column - Goals */}
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4">🎯 {currentMonth.toUpperCase()} GOALS:</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs sm:text-sm">
                  {spendSave.next_tier && spendSave.next_tier.amount_needed <= 500 ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span className="text-gray-700">
                    Reach {spendSave.next_tier?.name || 'Gold'} tier (£{spendSave.next_tier?.amount_needed || 313} more)
                    {spendSave.next_tier && spendSave.next_tier.amount_needed <= 500 && ' - ✅ Will hit with today\'s order'}
                  </span>
                </div>
                {christmasDeadline && christmasDeadline.daysRemaining > 0 && (
                  <div className="flex items-start gap-2 text-xs sm:text-sm">
                    <AlertCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Order festive supplies by {christmasDeadline.date} - {christmasDeadline.daysRemaining} days remaining</span>
                  </div>
                )}
                <div className="flex items-start gap-2 text-xs sm:text-sm">
                  <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500">Join Foodservice Club for {nextYear} savings</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Insight */}
        {isFestiveSeason() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-900">
              💡 <span className="font-semibold">INSIGHT:</span> Your festive orders are 32% higher than other restaurants your size - you're capturing strong Christmas demand! 🎄
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button variant="secondary" size="sm">Download {currentMonth} Report</Button>
          <Link href="/account/financial">
            <Button variant="secondary" size="sm">View Detailed Analytics</Button>
          </Link>
          <Button variant="secondary" size="sm">Set {nextYear} Goals</Button>
        </div>
      </div>
    </section>
  );
}

