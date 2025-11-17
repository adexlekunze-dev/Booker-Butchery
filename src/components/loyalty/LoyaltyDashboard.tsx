"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import {
  getLoyaltyMember,
  getAllTiers,
  getAvailableRewards,
  getPointsHistory,
  getTierConfig,
} from "@/lib/data/mock-loyalty";
import type { LoyaltyMember, TierBenefit, Reward, PointsTransaction } from "@/lib/data/mock-loyalty";
import { Button } from "@/components/ui/Button";
import {
  Award,
  TrendingUp,
  Gift,
  History,
  Star,
  Crown,
  Sparkles,
  ChevronRight,
  Check,
  Lock,
  Calendar,
  ArrowUp,
  ArrowDown,
  Zap,
} from "lucide-react";

export function LoyaltyDashboard() {
  const [session, setSession] = useState<any>(null);
  const [member, setMember] = useState<LoyaltyMember | null>(null);
  const [tiers, setTiers] = useState<TierBenefit[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [pointsHistory, setPointsHistory] = useState<PointsTransaction[]>([]);
  const [activeTab, setActiveTab] = useState<'rewards' | 'history' | 'tiers'>('rewards');

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';

      // Load loyalty member data
      const loyaltyMember = getLoyaltyMember(userId);
      setMember(loyaltyMember);

      // Load all tiers
      const allTiers = getAllTiers();
      setTiers(allTiers);

      // Load available rewards
      const availableRewards = getAvailableRewards(loyaltyMember?.current_tier);
      setRewards(availableRewards);

      // Load points history
      const history = getPointsHistory(userId, 10);
      setPointsHistory(history);
    }
  }, []);

  if (!session?.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600">Please log in to access your loyalty rewards.</p>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg p-8 text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Join Our Loyalty Program</h2>
          <p className="text-gray-600 mb-6">
            Earn points on every purchase and unlock exclusive rewards
          </p>
          <Button variant="primary" size="lg">
            Join Now - It's Free!
          </Button>
        </div>
      </div>
    );
  }

  const currentTierConfig = getTierConfig(member.current_tier);

  // Get tier icon
  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'bronze': return Award;
      case 'silver': return Star;
      case 'gold': return Crown;
      case 'platinum': return Sparkles;
      default: return Award;
    }
  };

  const TierIcon = getTierIcon(member.current_tier);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Loyalty Rewards</h1>
          </div>
          <p className="text-gray-600">
            Your loyalty benefits, rewards, and exclusive perks
          </p>
        </div>

        {/* Tier Status Card */}
        <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl p-6 md:p-8 text-white mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 ${currentTierConfig?.icon_bg || 'bg-white/20'} rounded-full flex items-center justify-center`}>
                <TierIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-sm font-medium opacity-90 mb-1">Your Status</div>
                <h2 className="text-3xl font-bold mb-1">{currentTierConfig?.tier_name}</h2>
                <div className="text-sm opacity-90">
                  Member since {new Date(member.member_since).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="text-center md:text-right">
                <div className="text-sm font-medium opacity-90 mb-1">Points Balance</div>
                <div className="text-4xl font-bold">{member.points_balance.toLocaleString()}</div>
                <div className="text-sm opacity-90">pts</div>
              </div>

              <div className="text-center md:text-right">
                <div className="text-sm font-medium opacity-90 mb-1">Lifetime Points</div>
                <div className="text-2xl font-bold">{member.points_lifetime.toLocaleString()}</div>
                <div className="text-sm opacity-90">pts earned</div>
              </div>
            </div>
          </div>

          {/* Progress to Next Tier */}
          {member.tier_progress.next_tier && (
            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">
                  Progress to {member.tier_progress.next_tier?.toUpperCase()} tier
                </div>
                <div className="text-sm font-bold">
                  {member.tier_progress.points_to_next_tier?.toLocaleString()} points to go
                </div>
              </div>
              <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${member.tier_progress.percentage_to_next}%` }}
                />
              </div>
              <div className="text-xs mt-2 opacity-90">
                {member.tier_progress.percentage_to_next}% complete
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Points Multiplier</div>
                <div className="text-2xl font-bold text-gray-900">
                  {currentTierConfig?.points_multiplier}x
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Rewards Redeemed</div>
                <div className="text-2xl font-bold text-gray-900">
                  {member.rewards_redeemed}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">This Year</div>
                <div className="text-2xl font-bold text-gray-900">
                  {member.points_this_year.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Value Saved</div>
                <div className="text-2xl font-bold text-gray-900">
                  £{member.rewards_redeemed_value}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            {[
              { id: 'rewards', label: 'Available Rewards', icon: Gift },
              { id: 'history', label: 'Points History', icon: History },
              { id: 'tiers', label: 'Tier Benefits', icon: Crown },
            ].map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'rewards' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Rewards You Can Redeem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewards.map((reward) => {
                const canAfford = member.points_balance >= reward.points_cost;
                const meetsReq = !reward.tier_requirement || true; // Already filtered

                const getCategoryBadge = (category: string) => {
                  const badges: Record<string, { label: string; color: string }> = {
                    discount: { label: 'Discount', color: 'bg-blue-100 text-blue-700' },
                    free_product: { label: 'Free Product', color: 'bg-green-100 text-green-700' },
                    free_delivery: { label: 'Free Delivery', color: 'bg-purple-100 text-purple-700' },
                    exclusive_access: { label: 'Exclusive', color: 'bg-pink-100 text-pink-700' },
                    experience: { label: 'Experience', color: 'bg-yellow-100 text-yellow-700' },
                  };
                  return badges[category] || { label: category, color: 'bg-gray-100 text-gray-700' };
                };

                const badge = getCategoryBadge(reward.category);

                return (
                  <div
                    key={reward.id}
                    className={`bg-white rounded-lg border-2 p-5 shadow-sm hover:shadow-md transition-all ${
                      canAfford ? 'border-gray-200' : 'border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${badge.color}`}>
                        {badge.label}
                      </span>
                      {reward.tier_requirement && (
                        <span className="text-xs font-medium px-2 py-1 rounded bg-purple-100 text-purple-700">
                          {reward.tier_requirement.toUpperCase()}+
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2">{reward.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{reward.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          {reward.points_cost.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Worth</div>
                        <div className="text-lg font-bold text-gray-900">
                          £{reward.value_gbp.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {reward.stock_limited && reward.stock_remaining !== undefined && (
                      <div className="mb-3 text-xs text-orange-600 font-medium">
                        Only {reward.stock_remaining} left!
                      </div>
                    )}

                    {reward.expiry_days && (
                      <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Valid for {reward.expiry_days} days after redemption</span>
                      </div>
                    )}

                    <Button
                      variant={canAfford ? "primary" : "secondary"}
                      size="sm"
                      className="w-full"
                      onClick={() => console.log('Redeem reward:', reward.id)}
                      disabled={!canAfford}
                    >
                      {canAfford ? 'Redeem Now' : `Need ${(reward.points_cost - member.points_balance).toLocaleString()} more points`}
                    </Button>

                    {reward.terms && (
                      <div className="mt-3 text-xs text-gray-500 border-t border-gray-200 pt-3">
                        <strong>Terms:</strong> {reward.terms}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Points Activity
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {pointsHistory.map((transaction) => {
                  const isPositive = transaction.points > 0;

                  return (
                    <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {isPositive ? (
                              <ArrowUp className="w-4 h-4 text-green-600" />
                            ) : (
                              <ArrowDown className="w-4 h-4 text-red-600" />
                            )}
                            <span className="font-medium text-gray-900">
                              {transaction.description}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(transaction.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-xl font-bold ${
                              isPositive ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {isPositive ? '+' : ''}{transaction.points.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            Balance: {transaction.balance_after.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tiers' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Membership Tiers & Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tiers.map((tier) => {
                const TierIconComponent = getTierIcon(tier.tier);
                const isCurrentTier = tier.tier === member.current_tier;

                return (
                  <div
                    key={tier.tier}
                    className={`bg-white rounded-lg border-2 p-6 ${
                      isCurrentTier
                        ? 'border-primary shadow-lg'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-14 h-14 ${tier.icon_bg} rounded-full flex items-center justify-center`}>
                        <TierIconComponent className={`w-7 h-7 ${tier.color}`} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{tier.tier_name}</h3>
                        <div className="text-sm text-gray-600">
                          {tier.min_points_annual === 0
                            ? 'Starting tier'
                            : `${tier.min_points_annual.toLocaleString()}+ points/year`
                          }
                        </div>
                      </div>
                      {isCurrentTier && (
                        <div className="ml-auto">
                          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                            Current
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{tier.points_multiplier}x points multiplier</span>
                      </div>
                      {tier.free_delivery_threshold !== undefined && (
                        <div className="flex items-center gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>
                            Free delivery {tier.free_delivery_threshold === 0
                              ? 'on all orders'
                              : `over £${tier.free_delivery_threshold}`
                            }
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="text-sm font-semibold text-gray-900 mb-2">Additional Benefits:</div>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
