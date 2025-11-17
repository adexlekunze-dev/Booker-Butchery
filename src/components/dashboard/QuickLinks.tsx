"use client";

import { useEffect, useState } from "react";
import { getSession } from "@/lib/mock-auth";
import Link from "next/link";
import { Headphones, FileText, GraduationCap, ChefHat, Calendar, Settings, MessageSquare, Building2 } from "lucide-react";

export function QuickLinks() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
  }, []);

  if (!session?.user) {
    return null;
  }

  const quickLinks = [
    {
      icon: Headphones,
      title: "Contact Support",
      description: "Get help from our team",
      href: "/help",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: FileText,
      title: "Invoices & Statements",
      description: "View and download",
      href: "/account/invoices",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: GraduationCap,
      title: "Training & Resources",
      description: "Learn and grow",
      href: "/resources",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: ChefHat,
      title: "Recipe Library",
      description: "Inspiration for your menu",
      href: "/recipes",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      icon: Building2,
      title: "Business Services Hub",
      description: "Explore our services",
      href: "/services",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      icon: Calendar,
      title: "Delivery Schedule",
      description: "View upcoming deliveries",
      href: "/account/deliveries",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Update your preferences",
      href: "/account/settings",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-600",
    },
    {
      icon: MessageSquare,
      title: "Leave Feedback",
      description: "Share your thoughts",
      href: "/feedback",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <section className="bg-white border-b border-gray-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            🔗 Quick Links
          </h2>
          <p className="text-gray-600">Everything you need in one place</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className={`${link.bgColor} border border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all group text-center`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon className={`w-6 h-6 ${link.iconColor}`} strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                    {link.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {link.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

