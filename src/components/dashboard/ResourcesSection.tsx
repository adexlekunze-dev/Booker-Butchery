"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/mock-auth";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, GraduationCap, ChefHat, Download } from "lucide-react";
import { getCurrentMonth, getCurrentYear, getNextYear, getChristmasDeadline, isFestiveSeason, formatShortMonth } from "@/lib/utils/dates";

export function ResourcesSection() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
  }, []);

  if (!session?.user) {
    return null;
  }

  const currentMonth = getCurrentMonth();
  const currentYear = getCurrentYear();
  const nextYear = getNextYear();
  const christmasDeadline = isFestiveSeason() ? getChristmasDeadline() : null;
  
  // Calculate next month for planning tips
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonthName = nextMonth.toLocaleDateString('en-GB', { month: 'long' });

  return (
    <section className="bg-gray-50 border-b border-gray-200 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-gray-900 mb-2">
            📚 {currentMonth.toUpperCase()} RESOURCES FOR YOUR RESTAURANT
          </h2>
          <div className="h-1 w-full bg-gray-200 rounded-full">
            <div className="h-1 bg-primary rounded-full" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Featured Resources */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Featured Guide */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Festive restaurant table"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                <span className="text-xs font-semibold text-gray-600 uppercase">Featured Guide</span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                "Maximizing Profit During Festive Season: A Complete Guide"
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">12 min read</p>
              <p className="text-xs sm:text-sm text-gray-700 mb-2">⭐ Recommended for you</p>
              <ul className="text-xs text-gray-600 space-y-1 mb-3 sm:mb-4">
                <li>• Pricing strategies</li>
                <li>• Staff scheduling</li>
                <li>• Stock management</li>
                <li>• Marketing tips</li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="primary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm min-h-[44px] touch-manipulation">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Download PDF →
                </Button>
                <Button variant="secondary" size="sm" className="w-full sm:w-auto text-xs sm:text-sm min-h-[44px] touch-manipulation">Read Online</Button>
              </div>
            </div>
          </div>

          {/* Webinar */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Chef prep"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-gray-600 uppercase">Webinar</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                "Festive Menu Engineering for Maximum Revenue"
              </h3>
              <p className="text-sm text-gray-600 mb-1">Upcoming webinar • Date TBA</p>
              <p className="text-sm text-gray-600 mb-4">90 minutes</p>
              <p className="text-sm text-gray-700 mb-2">156 restaurants registered</p>
              <p className="text-xs text-gray-600 mb-4">Certificate provided</p>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" className="flex-1">Register Free →</Button>
                <Button variant="secondary" size="sm">Add to Calendar</Button>
              </div>
            </div>
          </div>

          {/* Recipe */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-video relative bg-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Dish"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-gray-600 uppercase">Recipe</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                "Winter Root Vegetable Wellington"
              </h3>
              <p className="text-sm text-gray-700 mb-1">Elegant veggie centerpiece</p>
              <p className="text-xs text-gray-600 mb-2">Uses 6 items you order regularly</p>
              <div className="flex justify-between text-sm mb-4">
                <div>
                  <div className="text-gray-600">Cost per portion:</div>
                  <div className="font-semibold">£3.85</div>
                </div>
                <div>
                  <div className="text-gray-600">Suggested price:</div>
                  <div className="font-semibold">£18.95</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" className="flex-1">View Recipe →</Button>
                <Button variant="secondary" size="sm">Order Items</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">💡 QUICK {currentMonth.toUpperCase()} TIPS</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-4">
            {isFestiveSeason() && christmasDeadline && (
              <li>Order Christmas items by {christmasDeadline.date} for guaranteed delivery</li>
            )}
            {currentMonth === 'December' && (
              <li>Stock extra cleaning supplies - inspections increase in {formatShortMonth(currentMonth)}</li>
            )}
            {isFestiveSeason() && (
              <li>Pre-order New Year's Eve champagne (limited stock)</li>
            )}
            <li>Plan {nextMonthName} menu now - customers love healthy options post-holidays</li>
            {isFestiveSeason() && (
              <li>Check refrigeration capacity for larger festive orders</li>
            )}
            <li>Review your ordering patterns to optimize next month's budget</li>
          </ul>
        </div>

        <div className="flex gap-4">
          <Link href="/resources-guides">
            <Button variant="secondary" size="sm">
              Explore All Resources →
            </Button>
          </Link>
          <Button variant="secondary" size="sm">
            Download {currentMonth} Planning Checklist
          </Button>
        </div>
      </div>
    </section>
  );
}

