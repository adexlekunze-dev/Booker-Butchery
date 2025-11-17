export interface ServiceEnrollment {
  service_id: string;
  service_name: string;
  status: 'active' | 'pending' | 'inactive';
  monthly_saving?: number;
  next_action?: string;
  enrollment_date: string;
  details?: Record<string, any>;
  voucher_amount?: number;
  voucher_available?: boolean;
}

export function getServiceEnrollments(userId: string): ServiceEnrollment[] {
  // Mock data - in real implementation, query user's service enrollments
  return [
    {
      service_id: 'energy-switching',
      service_name: '⚡ ENERGY SWITCHING',
      status: 'active',
      monthly_saving: 165,
      enrollment_date: '2024-06-01',
      details: {
        contract_renewal: 'Sep 2025',
        winter_bill_higher: true,
      },
    },
    {
      service_id: 'oil-recycling',
      service_name: '🛢️ OIL RECYCLING',
      status: 'active',
      enrollment_date: '2024-06-15',
      details: {
        due_collection: 'NOW',
        estimated_liters: 85,
        bonus_available: true,
        bonus_deadline: '2024-12-15',
        bonus_amount: 5,
      },
      voucher_amount: 18.50,
      voucher_available: true,
    },
    {
      service_id: 'tesco-cashback',
      service_name: '🛒 TESCO CASHBACK',
      status: 'active',
      enrollment_date: '2024-01-01',
      details: {
        december_earned: 83.20,
        year_total: 1486.50,
      },
      voucher_amount: 83.20,
      voucher_available: true,
    },
  ];
}

export function getActiveServiceCount(userId: string): number {
  return getServiceEnrollments(userId).filter(s => s.status === 'active').length;
}

export function getTotalMonthlySavings(userId: string): number {
  return getServiceEnrollments(userId)
    .filter(s => s.status === 'active' && s.monthly_saving)
    .reduce((sum, s) => sum + (s.monthly_saving || 0), 0);
}


