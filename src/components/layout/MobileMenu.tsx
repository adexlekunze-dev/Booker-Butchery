"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronRight, ChevronDown } from "lucide-react";
import { getSession, signOut } from "@/lib/mock-auth";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  session: any;
  onSignOut: () => void;
}

export function MobileMenu({ isOpen, onClose, session, onSignOut }: MobileMenuProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLinkClick = () => {
    onClose();
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Menu Drawer */}
      <div className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link 
            href="/" 
            onClick={handleLinkClick}
            className="text-lg font-bold text-primary hover:opacity-90 transition-opacity"
          >
            BOOKER DEMO
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors touch-manipulation"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-4">
            {/* Dashboard - Only show for authenticated users */}
            {session?.user && (
              <div className="border-b border-gray-200 pb-2 mb-2">
                <Link
                  href="/"
                  className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                  onClick={handleLinkClick}
                >
                  <span>Dashboard</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            )}
            
            {/* All Categories - Main Menu Item with Sub-menu */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <button
                onClick={() => toggleSection("categories")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
              >
                <span>All Categories</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSections.has("categories") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections.has("categories") && (
                <div className="bg-gray-50">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Range
                  </div>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("BEEF")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Beef (125)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("PORK")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Pork (61)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("LAMB")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Lamb (46)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("CHICKEN")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Chicken (49)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("POULTRY & GAME")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Poultry & Game (23)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("VEAL")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Veal (15)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("MUTTON")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Mutton (10)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("SAUSAGES")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Sausages (53)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("BURGERS")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Burgers (21)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("ADDED VALUE")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Added Value (23)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("EGGS & FATS")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Eggs & Fats (12)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?category=${encodeURIComponent("FISH")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Fish (6)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>

                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3">
                    Brands
                  </div>
                  <Link
                    href={`/butchery/shop?brand=${encodeURIComponent("Booker")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Booker (206)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?brand=${encodeURIComponent("Chef's Larder")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Chef's Larder (53)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?brand=${encodeURIComponent("Blackgate")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Blackgate (46)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?brand=${encodeURIComponent("Ihsaan")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Ihsaan (31)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?brand=${encodeURIComponent("Blakemans")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Blakemans (20)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    href={`/butchery/shop?brand=${encodeURIComponent("Chef's Essentials")}`}
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                    onClick={handleLinkClick}
                  >
                    <span>Chef's Essentials (16)</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Links - Main Menu Items */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <Link
                href="/recipes"
                className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                onClick={handleLinkClick}
              >
                <span>Recipes</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <Link
                href="/best-sellers"
                className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                onClick={handleLinkClick}
              >
                <span>Best Sellers</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
              <Link
                href="/offers"
                className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                onClick={handleLinkClick}
              >
                <span>Offers</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            </div>

            {/* Solutions - Main Menu Item with Sub-menu (Show for unauthenticated users) */}
            {!session?.user && (
              <div className="border-b border-gray-200 pb-2 mb-2">
                <button
                  onClick={() => toggleSection("solutions")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedSections.has("solutions") ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSections.has("solutions") && (
                  <div className="bg-gray-50">
                    {[
                      { name: "Executive Chef", description: "Premium cuts for fine dining", href: "/icp/executive-chef" },
                      { name: "Head Chef", description: "Consistent quality for casual dining", href: "/icp/head-chef" },
                      { name: "Procurement Manager", description: "Bulk ordering for hotels & catering", href: "/icp/procurement-manager" },
                      { name: "Butcher Shop Owner", description: "Wholesale for independent butchers", href: "/icp/butcher-shop-owner" },
                    ].map((solution) => (
                      <Link
                        key={solution.href}
                        href={solution.href}
                        className="block px-4 pl-8 py-3 text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        onClick={handleLinkClick}
                      >
                        <div className="font-medium text-sm">{solution.name}</div>
                        <div className="text-xs text-gray-600">{solution.description}</div>
                      </Link>
                    ))}
                    <Link
                      href="/icp"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-primary font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors mt-2"
                      onClick={handleLinkClick}
                    >
                      <span>Explore All Solutions</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Quick Reorder - Main Menu Item with Sub-menu (Show for authenticated users) */}
            {session?.user && (
              <div className="border-b border-gray-200 pb-2 mb-2">
                <button
                  onClick={() => toggleSection("quick-reorder")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                >
                  <span>Quick Reorder</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedSections.has("quick-reorder") ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSections.has("quick-reorder") && (
                  <div className="bg-gray-50">
                    <Link
                      href="/quick-order?tab=lists"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <span>Shopping Lists</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/quick-order?tab=previous"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <span>Copy Previous Order</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/quick-order?tab=recent"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <span>Recent Purchases</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/quick-order?tab=frequent"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <span>Frequently Ordered</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/quick-order?tab=scanner"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <span>Scan Products</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Knowledge Hub - Main Menu Item with Sub-menu (Show for all users) */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <button
                onClick={() => toggleSection("knowledge-hub")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
              >
                <span>Knowledge Hub</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSections.has("knowledge-hub") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections.has("knowledge-hub") && (
                <div className="bg-gray-50">
                  {/* Quality & Provenance */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <span>🏆</span> Quality & Provenance
                  </div>
                  {[
                    { name: "Overview", href: "/quality" },
                    { name: "Blackgate Dry-Aging", href: "/quality/blackgate-aging" },
                    { name: "Halal Certification", href: "/quality/halal-certification" },
                    { name: "British Beef", href: "/quality/british-beef" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))}

                  {/* Professional Resources */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3 flex items-center gap-1">
                    <span>📚</span> Professional Resources
                  </div>
                  {[
                    { name: "All Resources", href: "/resources" },
                    { name: "Cooking Temperatures", href: "/resources/cooking-temperatures" },
                    { name: "Aging Guide", href: "/resources/aging-guide" },
                    { name: "Butchery Specs", href: "/resources/butchery-specs" },
                    { name: "Interactive Beef Cuts", href: "/resources/beef-cuts" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  ))}

                  {/* Cut Guides */}
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mt-3 flex items-center gap-1">
                    <span>🔪</span> Cut Guides
                  </div>
                  {[
                    { name: "All Cut Guides", href: "/cut-guides" },
                    { name: "Beef Cuts", href: "/cut-guides/beef" },
                    { name: "Pork Cuts", href: "/cut-guides/pork" },
                    { name: "Lamb Cuts", href: "/cut-guides/lamb" },
                    { name: "Chicken Cuts", href: "/cut-guides/chicken" },
                    { name: "Sausage Guide", href: "/cut-guides/sausages" },
                  ].map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="block px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      {guide.name}
                    </Link>
                  ))}
                  <Link
                    href="/cut-guides"
                    className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-primary font-semibold hover:bg-gray-100 active:bg-gray-200 transition-colors mt-2"
                    onClick={handleLinkClick}
                  >
                    <span>Browse All Guides</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Services - Main Menu Item with Sub-menu (Available to all users) */}
            <div className="border-b border-gray-200 pb-2 mb-2">
              <button
                onClick={() => toggleSection("services")}
                className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${
                    expandedSections.has("services") ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSections.has("services") && (
                <div className="bg-gray-50">
                  {[
                    { name: "Hospitality Services", href: "/services/hospitality" },
                    { name: "Retail Business Services", href: "/services/retail" },
                    { name: "Click & Collect and Delivery", href: "/services/click-collect-delivery" },
                    { name: "Foodservice Clubs", href: "/services/foodservice-clubs" },
                    { name: "Central Billing & Marketplace", href: "/services/central-billing-marketplace" },
                    { name: "Oil Recycling", href: "/services/oil-recycling" },
                  ].map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="block px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      {service.name}
                    </Link>
                  ))}
                  {/* Browse All Services */}
                  <Link
                    href="/services"
                    className="block px-4 pl-8 py-2.5 text-sm font-semibold text-primary hover:bg-gray-100 active:bg-gray-200 transition-colors border-t border-gray-200 mt-2"
                    onClick={handleLinkClick}
                  >
                    Browse All Services →
                  </Link>
                </div>
              )}
            </div>

            {/* My Tools - Main Menu Item with Sub-menu (Show for authenticated users) */}
            {session?.user && (
              <div className="border-b border-gray-200 pb-2 mb-2">
                <button
                  onClick={() => toggleSection("my-tools")}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                >
                  <span>My Tools</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedSections.has("my-tools") ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSections.has("my-tools") && (
                  <div className="bg-gray-50">
                    <Link
                      href="/dashboard/menus"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center gap-2">
                        <span>🍽️</span>
                        <div>
                          <div className="font-medium">Menu Builder</div>
                          <div className="text-xs text-gray-600">Save menus & reorder</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/dashboard/loyalty"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center gap-2">
                        <span>⭐</span>
                        <div>
                          <div className="font-medium">Loyalty Rewards</div>
                          <div className="text-xs text-gray-600">Points & benefits</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link
                      href="/dashboard/standing-orders"
                      className="flex items-center justify-between px-4 pl-8 py-2.5 text-sm text-gray-900 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                      onClick={handleLinkClick}
                    >
                      <div className="flex items-center gap-2">
                        <span>🔄</span>
                        <div>
                          <div className="font-medium">Standing Orders</div>
                          <div className="text-xs text-gray-600">Recurring deliveries</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Account Section */}
            {session?.user && (
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  href="/account"
                  className="flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                  onClick={handleLinkClick}
                >
                  <span>My Account</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <button
                  onClick={() => {
                    onSignOut();
                    handleLinkClick();
                  }}
                  className="w-full text-left flex items-center justify-between px-4 py-3 text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium"
                >
                  <span>Sign Out</span>
                </button>
              </div>
            )}

            {/* Auth Links for Unauthenticated */}
            {!session?.user && (
              <div className="border-t border-gray-200 pt-4 mt-4 px-4 space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-3 bg-gray-100 text-gray-900 rounded-lg font-medium hover:bg-gray-200 active:bg-gray-300 transition-colors touch-manipulation"
                  onClick={handleLinkClick}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 active:bg-primary/80 transition-colors touch-manipulation"
                  onClick={handleLinkClick}
                >
                  Become a Member
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}


