"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getActiveVouchers, getTotalVoucherValue } from "@/lib/data/mock-vouchers";
import { getSpendSaveProgress } from "@/lib/data/mock-spend-save";
import { Button } from "@/components/ui/Button";
import { Gift, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { getCurrentMonth, getChristmasDeadline, isDecember } from "@/lib/utils/dates";

export function DecemberAlertsSection() {
  const [session, setSession] = useState<any>(null);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [spendSave, setSpendSave] = useState<any>(null);
  const [totalVoucherValue, setTotalVoucherValue] = useState(0);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      const activeVouchers = getActiveVouchers(userId);
      const progress = getSpendSaveProgress(userId);
      const totalValue = getTotalVoucherValue(userId);

      setVouchers(activeVouchers);
      setSpendSave(progress);
      setTotalVoucherValue(totalValue);
    }
  }, []);

  if (!session?.user) {
    return null;
  }

  const currentMonth = getCurrentMonth();
  const christmasDeadline = isDecember() ? getChristmasDeadline() : null;

  const progressWidth = spendSave ? `${spendSave.progress_percent}%` : '0%';

  return (
    <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
            🎅 {currentMonth.toUpperCase()} ALERTS & OPPORTUNITIES
          </h2>
          <div className="h-1 w-full bg-gray-200 rounded-full">
            <div className="h-1 bg-primary rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Seasonal Planning - Dynamic based on month */}
        {isDecember() && christmasDeadline && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎄 FESTIVE SEASON PLANNING:</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
              <li>Christmas Day bookings: Order turkey & trimmings by {christmasDeadline.date}</li>
              <li>New Year's Eve: 85% of restaurants ordering champagne this week</li>
              <li>Winter menu favorites trending: Brussels sprouts +124%, cranberries +198%, festive desserts +167%</li>
            </ul>
          </div>
        )}

        {/* Active Vouchers */}
        {vouchers.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🎟️ YOUR ACTIVE VOUCHERS: £{totalVoucherValue.toFixed(2)} total
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {vouchers.map((voucher) => (
                <div key={voucher.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50">
                  <div className="font-semibold text-gray-900 text-xs sm:text-sm mb-2">{voucher.title}</div>
                  <div className="text-xs text-gray-600 mb-2">{voucher.description}</div>
                  <div className="text-base sm:text-lg font-bold text-primary mb-2">
                    {voucher.type === 'percent' ? `${voucher.value}% OFF` : `£${voucher.value.toFixed(2)}`}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    Expires: {new Date(voucher.expires_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                  {voucher.code && (
                    <div className="text-xs font-mono text-gray-600 mb-3 break-all">Code: {voucher.code}</div>
                  )}
                  <Button variant="primary" size="sm" className="w-full text-xs min-h-[44px] touch-manipulation">
                    {voucher.source === 'oil-recycling' ? 'Use Voucher' : 'Apply Now'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Spend & Save Progress */}
        {spendSave && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 SPEND & SAVE PROGRESS:</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-700">
                    Current Tier: <span className="font-semibold uppercase">{spendSave.current_tier}</span> ({spendSave.cashback_rate * 100}% cashback)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-primary h-4 rounded-full transition-all"
                    style={{ width: progressWidth }}
                  />
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  £{spendSave.current_spend.toFixed(0)} / £{spendSave.tier_threshold.toFixed(0)} ({spendSave.progress_percent}%)
                </div>
              </div>

              {spendSave.next_tier && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-900 mb-1">
                    🎯 Spend just £{spendSave.next_tier.amount_needed.toFixed(0)} more this month to reach <span className="font-semibold uppercase">{spendSave.next_tier.name}</span> ({spendSave.next_tier.cashback_rate * 100}% cashback)
                  </p>
                  <p className="text-xs text-gray-600">
                    {currentMonth} cashback so far: £{spendSave.month_cashback.toFixed(2)}
                  </p>
                  <p className="text-xs text-blue-700 mt-2">
                    💡 TIP: Your festive orders will easily push you to {spendSave.next_tier.name} tier!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

