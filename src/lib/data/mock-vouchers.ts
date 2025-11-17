export interface Voucher {
  id: string;
  code: string;
  title: string;
  description: string;
  type: 'percent' | 'amount' | 'reward';
  value: number;
  min_spend?: number;
  expires_at: string;
  category?: string;
  status: 'active' | 'used' | 'expired';
  source?: string; // e.g., "oil-recycling", "tesco-cashback", "festive"
}

export const MOCK_VOUCHERS: Voucher[] = [
  {
    id: 'voucher-001',
    code: 'FESTIVE20',
    title: '£20 OFF Orders £200+',
    description: 'Festive Special',
    type: 'amount',
    value: 20,
    min_spend: 200,
    expires_at: '2024-12-20',
    status: 'active',
    source: 'festive',
  },
  {
    id: 'voucher-002',
    code: 'OIL-RECYCLE-001',
    title: '🛢️ OIL RECYCLING REWARD',
    description: 'From Nov 28 collection',
    type: 'amount',
    value: 18.50,
    expires_at: '2025-01-31',
    status: 'active',
    source: 'oil-recycling',
  },
  {
    id: 'voucher-003',
    code: 'TESCO-CASHBACK-001',
    title: '🛒 TESCO CASHBACK',
    description: 'From Tesco shopping',
    type: 'amount',
    value: 83.20,
    expires_at: '2025-02-28',
    status: 'active',
    source: 'tesco-cashback',
  },
  {
    id: 'voucher-004',
    code: 'PREMIUM-POULTRY-25',
    title: '25% OFF Premium Poultry',
    description: 'Dec only',
    type: 'percent',
    value: 25,
    expires_at: '2024-12-31',
    status: 'active',
    category: 'Meat, Fish & Poultry',
  },
];

export function getActiveVouchers(userId: string): Voucher[] {
  const now = new Date();
  return MOCK_VOUCHERS.filter(v => {
    if (v.status !== 'active') return false;
    const expires = new Date(v.expires_at);
    return expires > now;
  });
}

export function getTotalVoucherValue(userId: string): number {
  return getActiveVouchers(userId).reduce((sum, v) => sum + v.value, 0);
}


