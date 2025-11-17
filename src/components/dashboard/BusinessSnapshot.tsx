"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getSpendSaveProgress } from "@/lib/data/mock-spend-save";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { TrendingUp, TrendingDown, Award, CreditCard } from "lucide-react";
import { getCurrentMonth } from "@/lib/utils/dates";

export function BusinessSnapshot() {
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
  const thisMonthSpend = spendSave.month_spend || 3687;
  const previousMonthSpend = 3456; // Mock data
  const percentChange = ((thisMonthSpend - previousMonthSpend) / previousMonthSpend * 100).toFixed(1);
  const isPositiveChange = parseFloat(percentChange) > 0;
  const totalSavings = 110.61; // Mock total savings
  const vouchersAvailable = 121.70; // Mock vouchers

  return (
    <section className="bg-gray-50 border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              💼 Business Snapshot
            </h2>
            <p className="text-gray-600">{currentMonth} performance at a glance</p>
          </div>
          <Link href="/account/financial">
            <Button variant="secondary" size="sm">
              Full Report
            </Button>
          </Link>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* This Month Spend */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">This Month</div>
              {isPositiveChange ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              £{thisMonthSpend.toLocaleString()}
            </div>
            <div className={`text-sm font-medium ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
              {isPositiveChange ? '+' : ''}{percentChange}% vs last month
            </div>
          </div>

          {/* Total Savings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">Total Savings</div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              £{totalSavings.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">
              This month
            </div>
          </div>

          {/* Vouchers Available */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">Vouchers</div>
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-1">
              £{vouchersAvailable.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">
              Available to use
            </div>
          </div>

          {/* Loyalty Tier */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-sm transition-all">
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600">Loyalty Tier</div>
              <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {spendSave.current_tier}
            </div>
            <div className="text-sm text-gray-600">
              {spendSave.progress_percent}% to {spendSave.next_tier?.name || 'Gold'}
            </div>
            {/* Progress bar */}
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all"
                style={{ width: `${spendSave.progress_percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Insight */}
        {spendSave.next_tier && spendSave.next_tier.amount_needed <= 500 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-900">
              💡 <span className="font-semibold">You're close!</span> Spend just £{spendSave.next_tier.amount_needed.toFixed(2)} more to reach {spendSave.next_tier.name} tier and unlock {(spendSave.next_tier.cashback_rate * 100).toFixed(1)}% cashback!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

