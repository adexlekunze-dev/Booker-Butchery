/**
 * Loyalty Program System - Mock Data
 * Points-based rewards program with tiered benefits
 */

export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LoyaltyMember {
  user_id: string;
  member_since: string;
  current_tier: LoyaltyTier;
  points_balance: number;
  points_lifetime: number;
  points_this_year: number;
  tier_progress: {
    current_tier_min: number;
    next_tier: LoyaltyTier | null;
    next_tier_min: number | null;
    points_to_next_tier: number | null;
    percentage_to_next: number;
  };
  rewards_redeemed: number;
  rewards_redeemed_value: number;
}

export interface PointsTransaction {
  id: string;
  date: string;
  type: 'earned' | 'redeemed' | 'bonus' | 'expired' | 'adjustment';
  points: number; // positive for earned, negative for redeemed/expired
  description: string;
  order_id?: string;
  reward_id?: string;
  balance_after: number;
}

export interface TierBenefit {
  tier: LoyaltyTier;
  tier_name: string;
  min_points_annual: number;
  color: string;
  icon_bg: string;
  benefits: string[];
  points_multiplier: number; // e.g., 1.5x for gold
  exclusive_access: boolean;
  priority_support: boolean;
  free_delivery_threshold?: number; // £ threshold for free delivery
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  points_cost: number;
  value_gbp: number;
  category: 'discount' | 'free_product' | 'free_delivery' | 'exclusive_access' | 'experience';
  tier_requirement?: LoyaltyTier;
  expiry_days?: number; // Days until voucher expires after redemption
  stock_limited: boolean;
  stock_remaining?: number;
  image_url?: string;
  terms?: string;
}

/**
 * Loyalty tier configuration
 */
export const LOYALTY_TIERS: TierBenefit[] = [
  {
    tier: 'bronze',
    tier_name: 'Bronze Member',
    min_points_annual: 0,
    color: 'text-orange-700',
    icon_bg: 'bg-orange-100',
    benefits: [
      'Earn 1 point per £1 spent',
      'Birthday bonus points',
      'Exclusive member newsletter',
    ],
    points_multiplier: 1,
    exclusive_access: false,
    priority_support: false,
    free_delivery_threshold: 150,
  },
  {
    tier: 'silver',
    tier_name: 'Silver Member',
    min_points_annual: 1000,
    color: 'text-gray-700',
    icon_bg: 'bg-gray-200',
    benefits: [
      'Earn 1.25 points per £1 spent',
      '2x points on first order each month',
      'Early access to seasonal products',
      'Free delivery over £100',
      'Quarterly bonus points',
    ],
    points_multiplier: 1.25,
    exclusive_access: true,
    priority_support: false,
    free_delivery_threshold: 100,
  },
  {
    tier: 'gold',
    tier_name: 'Gold Member',
    min_points_annual: 2500,
    color: 'text-yellow-600',
    icon_bg: 'bg-yellow-100',
    benefits: [
      'Earn 1.5 points per £1 spent',
      '3x points on first order each month',
      'Priority customer support',
      'Free delivery over £75',
      'Exclusive Gold-only rewards',
      'Invite to exclusive tasting events',
      'Personalized account manager',
    ],
    points_multiplier: 1.5,
    exclusive_access: true,
    priority_support: true,
    free_delivery_threshold: 75,
  },
  {
    tier: 'platinum',
    tier_name: 'Platinum Member',
    min_points_annual: 5000,
    color: 'text-purple-700',
    icon_bg: 'bg-purple-100',
    benefits: [
      'Earn 2 points per £1 spent',
      '5x points on first order each month',
      'Dedicated account manager',
      'Free delivery on all orders',
      'Exclusive Platinum-only rewards',
      'VIP access to new products',
      'Private chef consultations',
      'Invitations to exclusive industry events',
      'Customized product offerings',
    ],
    points_multiplier: 2,
    exclusive_access: true,
    priority_support: true,
    free_delivery_threshold: 0,
  },
];

/**
 * Available rewards catalog
 */
const REWARDS_CATALOG: Reward[] = [
  {
    id: 'reward-001',
    name: '£10 Off Next Order',
    description: 'Get £10 off your next order of £50 or more',
    points_cost: 500,
    value_gbp: 10,
    category: 'discount',
    expiry_days: 30,
    stock_limited: false,
    terms: 'Valid on orders over £50. Cannot be combined with other offers.',
  },
  {
    id: 'reward-002',
    name: '£25 Off Next Order',
    description: 'Get £25 off your next order of £150 or more',
    points_cost: 1200,
    value_gbp: 25,
    category: 'discount',
    expiry_days: 30,
    stock_limited: false,
    terms: 'Valid on orders over £150. Cannot be combined with other offers.',
  },
  {
    id: 'reward-003',
    name: 'Free Delivery for 3 Months',
    description: 'Enjoy free delivery on all orders for 3 months',
    points_cost: 800,
    value_gbp: 45,
    category: 'free_delivery',
    expiry_days: 90,
    stock_limited: false,
  },
  {
    id: 'reward-004',
    name: 'Blackgate Premium Steak Selection',
    description: 'Free 1kg selection of Blackgate 28-day aged premium steaks',
    points_cost: 2000,
    value_gbp: 65,
    category: 'free_product',
    tier_requirement: 'silver',
    expiry_days: 60,
    stock_limited: true,
    stock_remaining: 15,
    terms: 'Add to any order. Selection includes ribeye and sirloin steaks.',
  },
  {
    id: 'reward-005',
    name: 'Chef Masterclass Invitation',
    description: 'Exclusive invitation to a professional butchery masterclass',
    points_cost: 3500,
    value_gbp: 150,
    category: 'experience',
    tier_requirement: 'gold',
    stock_limited: true,
    stock_remaining: 8,
    terms: 'London-based event. Limited availability. Must be redeemed 2 weeks in advance.',
  },
  {
    id: 'reward-006',
    name: '£50 Off Premium Order',
    description: 'Get £50 off your next order of £300 or more',
    points_cost: 2500,
    value_gbp: 50,
    category: 'discount',
    tier_requirement: 'gold',
    expiry_days: 60,
    stock_limited: false,
    terms: 'Valid on orders over £300. Cannot be combined with other offers.',
  },
  {
    id: 'reward-007',
    name: 'VIP Tasting Event Access',
    description: 'Exclusive access to quarterly VIP product tasting events',
    points_cost: 5000,
    value_gbp: 200,
    category: 'exclusive_access',
    tier_requirement: 'platinum',
    stock_limited: true,
    stock_remaining: 5,
    terms: 'Includes guest pass. Events held in London. Transport not included.',
  },
  {
    id: 'reward-008',
    name: 'Free Monthly Delivery',
    description: 'Free delivery on all orders for 1 month',
    points_cost: 300,
    value_gbp: 15,
    category: 'free_delivery',
    expiry_days: 30,
    stock_limited: false,
  },
];

/**
 * Mock loyalty data for users
 */
const MOCK_LOYALTY_MEMBERS: Record<string, LoyaltyMember> = {
  'user-test-001': {
    user_id: 'user-test-001',
    member_since: '2023-03-15',
    current_tier: 'gold',
    points_balance: 3250,
    points_lifetime: 8450,
    points_this_year: 3800,
    tier_progress: {
      current_tier_min: 2500,
      next_tier: 'platinum',
      next_tier_min: 5000,
      points_to_next_tier: 1200,
      percentage_to_next: 68, // (3800 / 5000) * 100
    },
    rewards_redeemed: 12,
    rewards_redeemed_value: 385,
  },
};

/**
 * Mock points transaction history
 */
const MOCK_POINTS_TRANSACTIONS: Record<string, PointsTransaction[]> = {
  'user-test-001': [
    {
      id: 'txn-001',
      date: '2025-11-15',
      type: 'earned',
      points: 412,
      description: 'Order BOK20251115001 (£412.00)',
      order_id: 'order-123',
      balance_after: 3250,
    },
    {
      id: 'txn-002',
      date: '2025-11-10',
      type: 'bonus',
      points: 300,
      description: '3x points bonus - First order of the month',
      order_id: 'order-120',
      balance_after: 2838,
    },
    {
      id: 'txn-003',
      date: '2025-11-08',
      type: 'earned',
      points: 238,
      description: 'Order BOK20251108001 (£238.00)',
      order_id: 'order-118',
      balance_after: 2538,
    },
    {
      id: 'txn-004',
      date: '2025-11-01',
      type: 'redeemed',
      points: -1200,
      description: 'Redeemed: £25 Off Next Order',
      reward_id: 'reward-002',
      balance_after: 2300,
    },
    {
      id: 'txn-005',
      date: '2025-10-28',
      type: 'earned',
      points: 385,
      description: 'Order BOK20251028001 (£385.00)',
      order_id: 'order-115',
      balance_after: 3500,
    },
    {
      id: 'txn-006',
      date: '2025-10-15',
      type: 'bonus',
      points: 250,
      description: 'Quarterly bonus - Gold tier reward',
      balance_after: 3115,
    },
  ],
};

/**
 * Get loyalty member profile
 */
export function getLoyaltyMember(userId: string): LoyaltyMember | null {
  return MOCK_LOYALTY_MEMBERS[userId] || null;
}

/**
 * Get tier configuration
 */
export function getTierConfig(tier: LoyaltyTier): TierBenefit | null {
  return LOYALTY_TIERS.find(t => t.tier === tier) || null;
}

/**
 * Get all tier configurations
 */
export function getAllTiers(): TierBenefit[] {
  return LOYALTY_TIERS;
}

/**
 * Get points transaction history
 */
export function getPointsHistory(userId: string, limit?: number): PointsTransaction[] {
  const transactions = MOCK_POINTS_TRANSACTIONS[userId] || [];
  return limit ? transactions.slice(0, limit) : transactions;
}

/**
 * Get available rewards
 */
export function getAvailableRewards(userTier?: LoyaltyTier): Reward[] {
  if (!userTier) return REWARDS_CATALOG;

  const tierOrder: LoyaltyTier[] = ['bronze', 'silver', 'gold', 'platinum'];
  const userTierIndex = tierOrder.indexOf(userTier);

  return REWARDS_CATALOG.filter(reward => {
    if (!reward.tier_requirement) return true;
    const rewardTierIndex = tierOrder.indexOf(reward.tier_requirement);
    return userTierIndex >= rewardTierIndex;
  });
}

/**
 * Get rewards by category
 */
export function getRewardsByCategory(category: Reward['category'], userTier?: LoyaltyTier): Reward[] {
  const available = getAvailableRewards(userTier);
  return available.filter(reward => reward.category === category);
}

/**
 * Calculate points for spend
 */
export function calculatePointsForSpend(spendAmount: number, tier: LoyaltyTier): number {
  const tierConfig = getTierConfig(tier);
  if (!tierConfig) return spendAmount; // Default 1:1

  return Math.floor(spendAmount * tierConfig.points_multiplier);
}

/**
 * Get next tier information
 */
export function getNextTierInfo(currentPoints: number): {
  current_tier: LoyaltyTier;
  next_tier: LoyaltyTier | null;
  points_to_next: number | null;
} {
  const sortedTiers = [...LOYALTY_TIERS].sort((a, b) => a.min_points_annual - b.min_points_annual);

  let currentTier: LoyaltyTier = 'bronze';
  let nextTier: LoyaltyTier | null = null;
  let pointsToNext: number | null = null;

  for (let i = 0; i < sortedTiers.length; i++) {
    if (currentPoints >= sortedTiers[i].min_points_annual) {
      currentTier = sortedTiers[i].tier;

      if (i < sortedTiers.length - 1) {
        nextTier = sortedTiers[i + 1].tier;
        pointsToNext = sortedTiers[i + 1].min_points_annual - currentPoints;
      }
    }
  }

  return { current_tier: currentTier, next_tier: nextTier, points_to_next: pointsToNext };
}

/**
 * Redeem reward (mock function)
 */
export function redeemReward(userId: string, rewardId: string): {
  success: boolean;
  message: string;
  new_balance?: number;
} {
  const member = getLoyaltyMember(userId);
  const reward = REWARDS_CATALOG.find(r => r.id === rewardId);

  if (!member) {
    return { success: false, message: 'User not found in loyalty program' };
  }

  if (!reward) {
    return { success: false, message: 'Reward not found' };
  }

  if (member.points_balance < reward.points_cost) {
    return { success: false, message: 'Insufficient points' };
  }

  if (reward.tier_requirement) {
    const tierOrder: LoyaltyTier[] = ['bronze', 'silver', 'gold', 'platinum'];
    const userTierIndex = tierOrder.indexOf(member.current_tier);
    const requiredTierIndex = tierOrder.indexOf(reward.tier_requirement);

    if (userTierIndex < requiredTierIndex) {
      return { success: false, message: `Requires ${reward.tier_requirement} tier or higher` };
    }
  }

  if (reward.stock_limited && reward.stock_remaining !== undefined && reward.stock_remaining <= 0) {
    return { success: false, message: 'Reward out of stock' };
  }

  // In real implementation, this would update the database
  const newBalance = member.points_balance - reward.points_cost;
  console.log(`Redeemed ${reward.name} for ${userId}. New balance: ${newBalance}`);

  return {
    success: true,
    message: `Successfully redeemed ${reward.name}`,
    new_balance: newBalance,
  };
}
