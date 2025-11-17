"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getOrderPatterns } from "@/lib/data/mock-order-patterns";
import { getSpendSaveProgress } from "@/lib/data/mock-spend-save";
import { getActiveVouchers } from "@/lib/data/mock-vouchers";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
import { getBasketItemCount, getBasketTotal } from "@/lib/basket-localstorage";
import { getCurrentMonth, isFestiveSeason, formatShortMonth, getNextDeliveryDayName } from "@/lib/utils/dates";

export function CompleteOrderSection() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [orderPatterns, setOrderPatterns] = useState<any>(null);
  const [spendSave, setSpendSave] = useState<any>(null);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [basketCount, setBasketCount] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      const patterns = getOrderPatterns(userId);
      const progress = getSpendSaveProgress(userId);
      const activeVouchers = getActiveVouchers(userId);
      
      setOrderPatterns(patterns);
      setSpendSave(progress);
      setVouchers(activeVouchers);

      // Get basket info
      if (typeof window !== 'undefined') {
        setBasketCount(getBasketItemCount());
        setBasketTotal(getBasketTotal());
      }
    }
  }, []);

  if (!session?.user || !orderPatterns) {
    return null;
  }

  const usualOrderValue = orderPatterns.typical_tuesday_order?.value || 324.50;
  const usualOrderItems = orderPatterns.typical_tuesday_order?.items || 19;
  const festiveAdditionsValue = 223.40;
  const totalOrderValue = usualOrderValue + festiveAdditionsValue;
  
  const festiveVoucher = vouchers.find(v => v.code === 'FESTIVE20');
  const canApplyVoucher = totalOrderValue >= (festiveVoucher?.min_spend || 200);
  const voucherDiscount = canApplyVoucher ? (festiveVoucher?.value || 0) : 0;
  
  const finalTotal = totalOrderValue - voucherDiscount;
  const cashbackAmount = finalTotal * (spendSave?.cashback_rate || 0.03);
  const potentialSavings = voucherDiscount + cashbackAmount;

  return (
    <section className="bg-white border-b border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            💡 COMPLETE YOUR ORDER - SMART RECOMMENDATIONS
          </h2>
          <div className="h-1 w-full bg-gray-200 rounded-full">
            <div className="h-1 bg-primary rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Current Basket */}
        <div className="mb-8 bg-gray-50 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">
              🛒 Current Basket: {basketCount} items • £{basketTotal.toFixed(2)}
            </h3>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900">
              ⚠️ YOU USUALLY ORDER ON {getNextDeliveryDayName().toUpperCase()}:
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-700 mb-3 font-medium">BASED ON YOUR LAST 4 {getNextDeliveryDayName().toUpperCase()} ORDERS:</p>
              {/* Mobile: Stack layout, Desktop: Table layout */}
              <div className="hidden sm:block bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-900">
                  <div>CATEGORY</div>
                  <div>USUAL ITEMS</div>
                  <div>IN BASKET</div>
                  <div>ACTION</div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100">
                  <div className="text-sm">🥬 Fresh Produce</div>
                  <div className="text-sm">6 items</div>
                  <div className="text-sm">0 items</div>
                  <div>
                    <Button variant="primary" size="sm" className="text-xs min-h-[36px] touch-manipulation">+ Add All 6</Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100">
                  <div className="text-sm">🥩 Meat & Poultry</div>
                  <div className="text-sm">4 items</div>
                  <div className="text-sm">0 items</div>
                  <div>
                    <Button variant="primary" size="sm" className="text-xs min-h-[36px] touch-manipulation">+ Add All 4</Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100">
                  <div className="text-sm">🥛 Dairy & Eggs</div>
                  <div className="text-sm">4 items</div>
                  <div className="text-sm">0 items</div>
                  <div>
                    <Button variant="primary" size="sm" className="text-xs min-h-[36px] touch-manipulation">+ Add All 4</Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100">
                  <div className="text-sm">🍺 Beverages</div>
                  <div className="text-sm">3 items</div>
                  <div className="text-sm">0 items</div>
                  <div>
                    <Button variant="primary" size="sm" className="text-xs min-h-[36px] touch-manipulation">+ Add All 3</Button>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 p-4">
                  <div className="text-sm">🧼 Cleaning</div>
                  <div className="text-sm">2 items</div>
                  <div className="text-sm">0 items</div>
                  <div>
                    <Button variant="primary" size="sm" className="text-xs min-h-[36px] touch-manipulation">+ Add All 2</Button>
                  </div>
                </div>
              </div>
              
              {/* Mobile: Card layout */}
              <div className="sm:hidden space-y-3">
                {[
                  { icon: '🥬', name: 'Fresh Produce', usual: 6, inBasket: 0 },
                  { icon: '🥩', name: 'Meat & Poultry', usual: 4, inBasket: 0 },
                  { icon: '🥛', name: 'Dairy & Eggs', usual: 4, inBasket: 0 },
                  { icon: '🍺', name: 'Beverages', usual: 3, inBasket: 0 },
                  { icon: '🧼', name: 'Cleaning', usual: 2, inBasket: 0 },
                ].map((cat) => (
                  <div key={cat.name} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cat.icon}</span>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{cat.name}</div>
                          <div className="text-xs text-gray-600">{cat.usual} usual items • {cat.inBasket} in basket</div>
                        </div>
                      </div>
                      <Button variant="primary" size="sm" className="text-xs min-h-[44px] px-4 touch-manipulation">
                        + Add All {cat.usual}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="primary" size="md" className="w-full text-sm sm:text-base min-h-[48px] touch-manipulation">
              ⚡ Add Complete {getNextDeliveryDayName()} Order ({usualOrderItems} items • £{usualOrderValue.toFixed(2)})
            </Button>
          </div>
        </div>

        {/* Seasonal Recommendations */}
        {isFestiveSeason() && (
          <div className="mb-8 border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">🎄 RECOMMENDED FESTIVE ADDITIONS:</h3>
            <p className="text-sm text-gray-700 mb-4">
              Based on what other farm-to-table restaurants are ordering for {formatShortMonth(getCurrentMonth())}:
            </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
            {['Turkey Crown', 'Brussels Sprouts', 'Cranberry Sauce', 'Champagne Case'].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-3 sm:p-4 text-center">
                <div className="font-semibold text-xs sm:text-sm text-gray-900 mb-1 break-words">{item}</div>
                <div className="text-xs sm:text-sm text-gray-600 mb-2">£{['78.00', '8.90', '12.50', '124.00'][idx]}</div>
                <div className="text-xs text-gray-500 mb-3">
                  {['93%', '87%', '94%', '78%'][idx]} of similar restaurants ordered
                </div>
                <Button variant="primary" size="sm" className="w-full text-xs min-h-[44px] touch-manipulation">
                  + Add
                </Button>
              </div>
            ))}
          </div>

          <Button variant="primary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm min-h-[44px] touch-manipulation">
            + Add Festive Bundle (4 items • £{festiveAdditionsValue.toFixed(2)})
          </Button>
          </div>
        )}

        {/* Savings Opportunity */}
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">💰 SAVINGS OPPORTUNITY:</h3>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-gray-700">Your usual order:</span>
              <span className="font-semibold">£{usualOrderValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Add festive items:</span>
              <span className="font-semibold">+£{festiveAdditionsValue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-2">
              <span className="text-gray-900 font-semibold">TOTAL:</span>
              <span className="font-bold text-lg">£{totalOrderValue.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-2 text-sm mb-4">
            <div className={`flex items-center gap-2 ${canApplyVoucher ? 'text-green-700' : 'text-gray-500'}`}>
              <span>{canApplyVoucher ? '✅' : '⚪'}</span>
              <span>Qualifies for £20 festive voucher (orders £200+)</span>
            </div>
            <div className="flex items-center gap-2 text-green-700">
              <span>✅</span>
              <span>Would earn {spendSave?.cashback_rate * 100}% cashback ({spendSave?.current_tier} tier): £{cashbackAmount.toFixed(2)}</span>
            </div>
            {spendSave?.next_tier && totalOrderValue >= spendSave.next_tier.amount_needed && (
              <div className="flex items-center gap-2 text-green-700">
                <span>✅</span>
                <span>Reaches {spendSave.next_tier.name} tier this month ({spendSave.next_tier.cashback_rate * 100}% ongoing)</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="font-bold text-lg text-gray-900 mb-1">
              POTENTIAL SAVINGS TODAY: £{potentialSavings.toFixed(2)}
            </div>
            <Button variant="primary" size="md" className="w-full mt-3 text-sm sm:text-base min-h-[48px] touch-manipulation">
              💰 Build Complete Order with Savings
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

