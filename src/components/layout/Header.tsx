"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
import { getSession, signOut, type MockSession } from "@/lib/mock-auth";
import { SearchBar } from "@/components/search/SearchBar";
import { MobileSearchButton } from "@/components/search/MobileSearchButton";
import { BranchIndicator } from "@/components/branch/BranchIndicator";
import { QuickReorderDropdown } from "@/components/navigation/QuickReorderDropdown";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const router = useRouter();
  const [session, setSession] = useState<MockSession | null>(null);
  const [basketCount, setBasketCount] = useState(0);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [knowledgeHubDropdownOpen, setKnowledgeHubDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [myToolsDropdownOpen, setMyToolsDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Load session on mount
    setSession(getSession());
    
    // Load basket count
    const updateBasketCount = () => {
      import("@/lib/basket-localstorage")
        .then(({ getBasketItemCount }) => {
          setBasketCount(getBasketItemCount());
        })
        .catch((error) => {
          console.error('Failed to load basket:', error);
          setBasketCount(0);
        });
    };
    updateBasketCount();
    
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      setSession(getSession());
      updateBasketCount();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also check on focus in case user logged in/out in same tab
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
    signOut();
    setSession(null);
    router.replace("/"); // Use replace to avoid prefetch errors
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar - Hidden on mobile */}
      <div className="hidden sm:block bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-6">
              {session?.user ? (
                <Link href="/branches" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Next-day delivery | Premium Butchery Wholesale | Manchester Central
                </Link>
              ) : (
                <div className="text-gray-600">
                  Next-day delivery | Premium Butchery Wholesale
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Link href="/help" className="text-gray-600 hover:text-gray-900 transition-colors">
                Help & Support
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-700 hover:text-primary transition-colors touch-manipulation"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">BOOKER</h1>
          </Link>

          {/* Search bar - Hidden on mobile, show on tablet+ */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <SearchBar />
          </div>

          {/* Mobile Search Button */}
          <div className="md:hidden">
            <MobileSearchButton />
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-6">
            {/* Branch selector - Hidden on mobile */}
            <div className="hidden sm:block">
              <BranchIndicator />
            </div>

            {/* Cart - Only show for authenticated users */}
            {session?.user && (
              <Link
                href="/basket"
                className="relative p-2 text-gray-700 hover:text-primary transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {basketCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {basketCount}
                  </span>
                )}
              </Link>
            )}

            {/* Become a Member - Only show when not authenticated, hidden on mobile */}
            {!session?.user && (
              <Link
                href="/register"
                className="hidden sm:block px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 active:bg-primary/80 transition-colors font-medium text-sm sm:text-base touch-manipulation"
              >
                Become a Member
              </Link>
            )}

            {/* Account - Show user icon only on mobile, full on desktop */}
            {session?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-primary transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 sm:p-0 p-2 -mr-2 sm:mr-0 justify-center sm:justify-start"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="hidden sm:inline text-sm font-medium">{session.user.name || session.user.email || "Account"}</span>
                  <ChevronDown
                    className={`hidden sm:block w-4 h-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* User Menu Dropdown */}
                {userMenuOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    
                    {/* Dropdown content */}
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[180px] overflow-hidden">
                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-gray-900 hover:bg-primary hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/account"
                          className="block px-4 py-2 text-gray-900 hover:bg-primary hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="block px-4 py-2 text-gray-900 hover:bg-primary hover:text-white transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          My Orders
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-primary hover:text-white transition-colors border-t border-gray-200"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1 sm:gap-2 text-gray-700 hover:text-primary transition-colors touch-manipulation min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-2 -mr-2 sm:mr-0 sm:p-0 justify-center sm:justify-start"
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline text-sm font-medium">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Navigation - Hidden on mobile, show on desktop */}
      <nav className="hidden lg:block bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-8 py-3">
              {/* Dashboard - Only show for authenticated users */}
              {session?.user && (
                <Link
                  href="/"
                  className="text-white hover:opacity-80 transition-colors font-medium"
                >
                  Dashboard
                </Link>
              )}
              
              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:opacity-80 transition-colors font-medium"
                  aria-expanded={categoriesDropdownOpen}
                  aria-haspopup="true"
                >
                  Categories
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${categoriesDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {categoriesDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setCategoriesDropdownOpen(false)}
                    />
                    
                    {/* Dropdown content */}
                    <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[500px] overflow-hidden">
                      <div className="py-4">
                        <div className="grid grid-cols-2 gap-6 px-4">
                          {/* Column 1: Range */}
                          <div>
                            <h5 className="font-bold text-sm text-gray-900 mb-3 uppercase tracking-wide">
                              Range
                            </h5>
                            <ul className="space-y-1">
                              <li>
                                <Link
                                  href="/butchery/shop?category=BEEF"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Beef (125)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?category=PORK"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Pork (61)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?category=LAMB"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Lamb (46)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?category=CHICKEN"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Chicken (49)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?category=SAUSAGES"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Sausages (53)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?category=BURGERS"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Burgers (21)
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* Column 2: Brands */}
                          <div>
                            <h5 className="font-bold text-sm text-gray-900 mb-3 uppercase tracking-wide">
                              Brands
                            </h5>
                            <ul className="space-y-1">
                              <li>
                                <Link
                                  href="/butchery/shop?brand=Booker"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Booker (206)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?brand=Chef's Larder"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Chef's Larder (53)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?brand=Blackgate"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Blackgate (46)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?brand=Ihsaan"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Ihsaan (31)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?brand=Blakemans"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Blakemans (20)
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/butchery/shop?brand=Chef's Essentials"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setCategoriesDropdownOpen(false)}
                                >
                                  Chef's Essentials (16)
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Browse All CTA */}
                        <div className="mt-4 pt-3 px-4 border-t border-gray-200">
                          <Link
                            href="/butchery/shop"
                            className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                            onClick={() => setCategoriesDropdownOpen(false)}
                          >
                            Browse All Products
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Other navigation links */}
              <Link
                href="/recipes"
                className="text-white hover:opacity-80 transition-colors"
              >
                Recipes
              </Link>
              <Link
                href="/best-sellers"
                className="text-white hover:opacity-80 transition-colors"
              >
                Best Sellers
              </Link>
              <Link
                href="/offers"
                className="text-white hover:opacity-80 transition-colors"
              >
                Offers
              </Link>

              {/* Show Solutions dropdown only for unauthenticated users */}
              {!session?.user && (
                <>
                  {/* Solutions Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                      className="flex items-center gap-1 text-white hover:opacity-80 transition-colors font-medium"
                      aria-expanded={solutionsDropdownOpen}
                      aria-haspopup="true"
                    >
                      Solutions
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${solutionsDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Solutions Dropdown Menu */}
                    {solutionsDropdownOpen && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setSolutionsDropdownOpen(false)}
                        />

                        {/* Dropdown content */}
                        <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[280px] overflow-hidden">
                          <div className="py-2">
                            <Link
                              href="/icp/executive-chef"
                              className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                              onClick={() => setSolutionsDropdownOpen(false)}
                            >
                              <div className="font-semibold group-hover:text-white">Executive Chef</div>
                              <div className="text-xs text-gray-600 group-hover:text-white/90">Premium cuts for fine dining</div>
                            </Link>

                            <Link
                              href="/icp/head-chef"
                              className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                              onClick={() => setSolutionsDropdownOpen(false)}
                            >
                              <div className="font-semibold group-hover:text-white">Head Chef</div>
                              <div className="text-xs text-gray-600 group-hover:text-white/90">Consistent quality for casual dining</div>
                            </Link>

                            <Link
                              href="/icp/procurement-manager"
                              className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                              onClick={() => setSolutionsDropdownOpen(false)}
                            >
                              <div className="font-semibold group-hover:text-white">Procurement Manager</div>
                              <div className="text-xs text-gray-600 group-hover:text-white/90">Bulk ordering for hotels & catering</div>
                            </Link>

                            <Link
                              href="/icp/butcher-shop-owner"
                              className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                              onClick={() => setSolutionsDropdownOpen(false)}
                            >
                              <div className="font-semibold group-hover:text-white">Butcher Shop Owner</div>
                              <div className="text-xs text-gray-600 group-hover:text-white/90">Wholesale for independent butchers</div>
                            </Link>

                            {/* Browse All Solutions CTA */}
                            <div className="mt-2 pt-2 px-4 border-t border-gray-200">
                              <Link
                                href="/icp"
                                className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                                onClick={() => setSolutionsDropdownOpen(false)}
                              >
                                Explore All Solutions
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}

              {/* Show Quick Reorder for authenticated users */}
              {session?.user && (
                <QuickReorderDropdown />
              )}

              {/* Knowledge Hub Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setKnowledgeHubDropdownOpen(!knowledgeHubDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:opacity-80 transition-colors font-medium"
                  aria-expanded={knowledgeHubDropdownOpen}
                  aria-haspopup="true"
                >
                  Knowledge Hub
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${knowledgeHubDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Knowledge Hub Mega Menu */}
                {knowledgeHubDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setKnowledgeHubDropdownOpen(false)}
                    />

                    {/* Dropdown content - Mega Menu */}
                    <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[680px] overflow-hidden">
                      <div className="py-4">
                        <div className="grid grid-cols-3 gap-6 px-4">
                          {/* Column 1: Quality & Provenance */}
                          <div>
                            <h5 className="font-bold text-sm text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                              <span className="text-primary">🏆</span>
                              Quality & Provenance
                            </h5>
                            <ul className="space-y-1">
                              <li>
                                <Link
                                  href="/quality"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Overview</div>
                                  <div className="text-xs opacity-75">Our quality standards</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/quality/blackgate-aging"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Blackgate Dry-Aging</div>
                                  <div className="text-xs opacity-75">28-day aged beef</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/quality/halal-certification"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Halal Certification</div>
                                  <div className="text-xs opacity-75">HMC certified range</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/quality/british-beef"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">British Beef</div>
                                  <div className="text-xs opacity-75">Farm-assured quality</div>
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* Column 2: Professional Resources */}
                          <div>
                            <h5 className="font-bold text-sm text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                              <span className="text-primary">📚</span>
                              Professional Resources
                            </h5>
                            <ul className="space-y-1">
                              <li>
                                <Link
                                  href="/resources"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">All Resources</div>
                                  <div className="text-xs opacity-75">Complete library</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/resources/cooking-temperatures"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Cooking Temperatures</div>
                                  <div className="text-xs opacity-75">Safety guidelines</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/resources/aging-guide"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Aging Guide</div>
                                  <div className="text-xs opacity-75">Dry vs wet aging</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/resources/butchery-specs"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Butchery Specifications</div>
                                  <div className="text-xs opacity-75">UNECE standards</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/resources/beef-cuts"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Interactive Beef Cuts</div>
                                  <div className="text-xs opacity-75">Visual diagram</div>
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* Column 3: Cut Guides */}
                          <div>
                            <h5 className="font-bold text-sm text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                              <span className="text-primary">🔪</span>
                              Cut Guides
                            </h5>
                            <ul className="space-y-1">
                              <li>
                                <Link
                                  href="/cut-guides"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">All Cut Guides</div>
                                  <div className="text-xs opacity-75">Browse all</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/cut-guides/beef"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Beef Cuts</div>
                                  <div className="text-xs opacity-75">Primal & retail cuts</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/cut-guides/pork"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Pork Cuts</div>
                                  <div className="text-xs opacity-75">From shoulder to ham</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/cut-guides/lamb"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Lamb Cuts</div>
                                  <div className="text-xs opacity-75">Traditional & modern</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/cut-guides/chicken"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Chicken Cuts</div>
                                  <div className="text-xs opacity-75">Whole to portions</div>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/cut-guides/sausages"
                                  className="block px-2 py-2 text-sm text-gray-900 hover:bg-primary hover:text-white transition-colors rounded"
                                  onClick={() => setKnowledgeHubDropdownOpen(false)}
                                >
                                  <div className="font-semibold">Sausage Guide</div>
                                  <div className="text-xs opacity-75">Types & recipes</div>
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        {/* Bottom CTA Banner */}
                        <div className="mt-4 pt-4 px-4 border-t border-gray-200 bg-gradient-to-r from-orange-50 to-amber-50 mx-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-gray-900 text-sm">Need expert advice?</div>
                              <div className="text-xs text-gray-600">Our butchery team is here to help</div>
                            </div>
                            <Link
                              href="/contact"
                              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm whitespace-nowrap"
                              onClick={() => setKnowledgeHubDropdownOpen(false)}
                            >
                              Contact Us
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Services Dropdown - Available to all users */}
              <div className="relative">
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  className="flex items-center gap-1 text-white hover:opacity-80 transition-colors font-medium"
                  aria-expanded={servicesDropdownOpen}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Services Dropdown Menu */}
                {servicesDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setServicesDropdownOpen(false)}
                    />

                    {/* Dropdown content */}
                    <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[300px] overflow-hidden">
                      <div className="py-2">
                        <Link
                          href="/services/hospitality"
                          className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className="font-semibold group-hover:text-white">Hospitality Services</div>
                          <div className="text-xs text-gray-600 group-hover:text-white/90">For restaurants, hotels, pubs & catering</div>
                        </Link>

                        <Link
                          href="/services/retail"
                          className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className="font-semibold group-hover:text-white">Retail Business Services</div>
                          <div className="text-xs text-gray-600 group-hover:text-white/90">For convenience stores & retailers</div>
                        </Link>

                        <Link
                          href="/services/click-collect-delivery"
                          className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className="font-semibold group-hover:text-white">Click & Collect and Delivery</div>
                          <div className="text-xs text-gray-600 group-hover:text-white/90">Flexible fulfillment options</div>
                        </Link>

                        <Link
                          href="/services/foodservice-clubs"
                          className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className="font-semibold group-hover:text-white">Foodservice Clubs</div>
                          <div className="text-xs text-gray-600 group-hover:text-white/90">Exclusive member benefits & discounts</div>
                        </Link>

                        <Link
                          href="/services/central-billing-marketplace"
                          className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className="font-semibold group-hover:text-white">Central Billing & Marketplace</div>
                          <div className="text-xs text-gray-600 group-hover:text-white/90">Streamlined multi-site procurement</div>
                        </Link>

                        <Link
                          href="/services/oil-recycling"
                          className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div className="font-semibold group-hover:text-white">Oil Recycling</div>
                          <div className="text-xs text-gray-600 group-hover:text-white/90">Sustainable waste management</div>
                        </Link>

                        {/* Browse All Services CTA */}
                        <div className="mt-2 pt-2 px-4 border-t border-gray-200">
                          <Link
                            href="/services"
                            className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            Browse All Services
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* My Tools Dropdown - Only show for authenticated users */}
              {session?.user && (
                <div className="relative">
                  <button
                    onClick={() => setMyToolsDropdownOpen(!myToolsDropdownOpen)}
                    className="flex items-center gap-1 text-white hover:opacity-80 transition-colors font-medium"
                    aria-expanded={myToolsDropdownOpen}
                    aria-haspopup="true"
                  >
                    My Tools
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${myToolsDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* My Tools Dropdown Menu */}
                  {myToolsDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setMyToolsDropdownOpen(false)}
                      />
                      
                      {/* Dropdown content */}
                      <div className="absolute left-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-20 min-w-[240px] overflow-hidden">
                        <div className="py-2">
                          <Link
                            href="/dashboard/menus"
                            className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                            onClick={() => setMyToolsDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">🍽️</span>
                              <div>
                                <div className="font-semibold group-hover:text-white">Menu Builder</div>
                                <div className="text-xs text-gray-600 group-hover:text-white/90">Save menus & reorder</div>
                              </div>
                            </div>
                          </Link>

                          <Link
                            href="/dashboard/loyalty"
                            className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                            onClick={() => setMyToolsDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">⭐</span>
                              <div>
                                <div className="font-semibold group-hover:text-white">Loyalty Rewards</div>
                                <div className="text-xs text-gray-600 group-hover:text-white/90">Points & benefits</div>
                              </div>
                            </div>
                          </Link>

                          <Link
                            href="/dashboard/standing-orders"
                            className="block px-4 py-2.5 hover:bg-primary transition-colors text-gray-900 group"
                            onClick={() => setMyToolsDropdownOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">🔄</span>
                              <div>
                                <div className="font-semibold group-hover:text-white">Standing Orders</div>
                                <div className="text-xs text-gray-600 group-hover:text-white/90">Recurring deliveries</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        session={session}
        onSignOut={handleSignOut}
      />
    </header>
  );
}
