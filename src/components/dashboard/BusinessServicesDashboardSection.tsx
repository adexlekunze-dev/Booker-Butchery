"use client";

import { useEffect, useState } from "react";
import { getSession, getUser } from "@/lib/mock-auth";
import { getServiceEnrollments, getTotalMonthlySavings } from "@/lib/data/mock-service-enrollments";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Zap, Recycle, ShoppingBag, Users, CreditCard } from "lucide-react";
import { getCurrentMonth, getNextYear, isNovemberOrDecember, isDecember } from "@/lib/utils/dates";

export function BusinessServicesDashboardSection() {
  const [session, setSession] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    if (currentSession?.user) {
      const userId = currentSession.user.id || 'user-test-001';
      const enrollments = getServiceEnrollments(userId);
      const savings = getTotalMonthlySavings(userId);
      
      setServices(enrollments);
      setTotalSavings(savings);
    }
  }, []);

  if (!session?.user) {
    return null;
  }

  const currentMonth = getCurrentMonth();
  const nextYear = getNextYear();

  const activeServices = services.filter(s => s.status === 'active');

  const getServiceIcon = (serviceId: string) => {
    const icons: Record<string, any> = {
      'energy-switching': Zap,
      'oil-recycling': Recycle,
      'tesco-cashback': ShoppingBag,
      'foodservice-clubs': Users,
      'central-billing-marketplace': CreditCard,
    };
    return icons[serviceId] || Zap;
  };

  const getServiceRoute = (serviceId: string) => {
    const routes: Record<string, string> = {
      'energy-switching': '/services/hospitality',
      'oil-recycling': '/services/oil-recycling',
      'tesco-cashback': '/services/retail-business',
      'foodservice-clubs': '/services/foodservice-clubs',
      'central-billing-marketplace': '/services/central-billing-marketplace',
    };
    return routes[serviceId] || '/services';
  };

  return (
    <section className="bg-white border-b border-gray-200 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 mb-2">
            💼 YOUR BUSINESS SERVICES - {currentMonth.toUpperCase()} UPDATE
          </h2>
          <div className="h-1 w-full bg-gray-200 rounded-full">
            <div className="h-1 bg-primary rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Active Services */}
        {activeServices.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {activeServices.map((service) => {
              const Icon = getServiceIcon(service.service_id);
              return (
                <div key={service.service_id} className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">{service.service_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">✅ Active</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm mb-4 border-t border-gray-200 pt-3">
                    {service.monthly_saving && (
                      <div>
                        <div className="text-gray-600">Monthly Saving:</div>
                        <div className="font-semibold text-gray-900">£{service.monthly_saving.toFixed(2)}</div>
                      </div>
                    )}
                    {service.details?.due_collection && (
                      <div>
                        <div className="text-gray-600">Due for Collection:</div>
                        <div className="font-semibold text-orange-600">{service.details.due_collection}</div>
                        {service.details.estimated_liters && (
                          <div className="text-xs text-gray-500">(~{service.details.estimated_liters}L)</div>
                        )}
                      </div>
                    )}
                    {service.voucher_amount && (
                      <div>
                        <div className="text-gray-600">Voucher:</div>
                        <div className="font-semibold text-primary">£{service.voucher_amount.toFixed(2)}</div>
                      </div>
                    )}
                  </div>

                  <Link href={getServiceRoute(service.service_id)}>
                    <Button variant="primary" size="sm" className="w-full">
                      {service.details?.due_collection === 'NOW' ? '📅 Book Now' : 'View Details'}
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Recommended Services */}
        <div className="space-y-6">
          {/* Foodservice Clubs */}
          <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-semibold text-gray-900">🍽️ FOODSERVICE CLUBS - JOIN BEFORE YEAR END</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              Lock in {nextYear} prices now! {isNovemberOrDecember() && `Based on your ${currentMonth} spend pattern, you could`} save an average of £74/month on items you regularly order{isNovemberOrDecember() ? ' throughout the festive season and' : ''} into {nextYear}.
            </p>
            <div className="space-y-2 text-sm text-gray-700 mb-4">
              <p>Savings on your regular items:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Organic chicken: Save £3.50 per order</li>
                <li>Premium meats: Save £8.20 per order</li>
                <li>Dairy products: Save £4.80 per order</li>
                <li>Quality oils: Save £2.90 per order</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="font-semibold text-gray-900 mb-1">💰 Potential {nextYear} Savings: £888/year</div>
              {isDecember() && (
                <div className="text-sm text-gray-600">🎁 Join in {currentMonth}: Get first month free</div>
              )}
            </div>
            <div className="flex gap-3">
              <Link href="/services/foodservice-clubs">
                <Button variant="primary" size="sm">Join Now</Button>
              </Link>
              <Button variant="secondary" size="sm">Calculate My Exact Savings</Button>
              <Button variant="secondary" size="sm">Learn More</Button>
            </div>
          </div>

          {/* Custom Packaging */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 CUSTOM BRANDED PACKAGING - NEW YEAR REBRAND?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Start {nextYear} fresh with custom-branded packaging for The Red Lion Restaurant. {isNovemberOrDecember() && 'Perfect timing for New Year marketing push.'}
            </p>
            {isDecember() && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="text-sm font-semibold text-gray-900">{currentMonth} Special: 15% off first order + free design</div>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="primary" size="sm">Get Free Quote</Button>
              <Button variant="secondary" size="sm">View Samples</Button>
              <Button variant="secondary" size="sm">Maybe in {nextYear}</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/services">
            <Button variant="secondary" size="md">
              View All Services →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

