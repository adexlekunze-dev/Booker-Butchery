"use client";

import { Truck, ShoppingCart, Package, CheckCircle2 } from "lucide-react";
import Link from "next/link";

type ConcreteServiceFeaturesProps = {
  category?: string;
  shopRoute: string;
};

export function ConcreteServiceFeatures({ category, shopRoute }: ConcreteServiceFeaturesProps) {
  const features = [
    {
      icon: Truck,
      title: "Free Delivery Over £250",
      description: "No delivery charges on orders over £250. Next-day delivery available when you order by 3pm.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: ShoppingCart,
      title: "Same-Day Click & Collect",
      description: "Order online and collect from your nearest branch the same day. No waiting, no delays.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Package,
      title: "No Minimum Order",
      description: "Order as little or as much as you need. No hidden fees, no commitment required.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Make Ordering Easy</h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Transparent pricing. Flexible delivery. Designed for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`${feature.bgColor} rounded-xl p-8 border-2 border-transparent hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1`}
              >
                <div className={`${feature.color} mb-4`}>
                  <Icon className="w-12 h-12" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Additional value points */}
        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">170+ Branches</h4>
                <p className="text-sm text-gray-600">Nationwide coverage for easy collection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Order by 3pm</h4>
                <p className="text-sm text-gray-600">For guaranteed next-day delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">24/7 Online Ordering</h4>
                <p className="text-sm text-gray-600">Shop whenever it suits your schedule</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Competitive Pricing</h4>
                <p className="text-sm text-gray-600">Wholesale prices for business customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href={shopRoute}
            className="inline-flex items-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Shopping Now
            <Package className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

