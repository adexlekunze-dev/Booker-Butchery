export interface SpendSaveProgress {
  current_tier: 'bronze' | 'silver' | 'gold';
  current_spend: number;
  tier_threshold: number;
  progress_percent: number;
  cashback_rate: number;
  month_cashback: number;
  year_total_cashback: number;
  month_spend: number;
  projected_month_spend: number;
  next_tier?: {
    name: 'silver' | 'gold';
    threshold: number;
    cashback_rate: number;
    amount_needed: number;
  };
}

export function getSpendSaveProgress(userId: string): SpendSaveProgress {
  // Mock data - in real implementation, calculate from orders
  const currentSpend = 3687;
  const tierThreshold = 4000;
  const progress = (currentSpend / tierThreshold) * 100;
  const amountNeeded = tierThreshold - currentSpend;

  return {
    current_tier: 'silver',
    current_spend: currentSpend,
    tier_threshold: tierThreshold,
    progress_percent: Math.round(progress),
    cashback_rate: 0.03, // 3% for silver
    month_cashback: 110.61,
    year_total_cashback: 1486.50,
    month_spend: currentSpend,
    projected_month_spend: 11200,
    next_tier: {
      name: 'gold',
      threshold: tierThreshold,
      cashback_rate: 0.05, // 5% for gold
      amount_needed: amountNeeded,
    },
  };
}

export function calculatePotentialCashback(orderValue: number, tier: 'bronze' | 'silver' | 'gold'): number {
  const rates = {
    bronze: 0.01,
    silver: 0.03,
    gold: 0.05,
  };
  return orderValue * rates[tier];
}


