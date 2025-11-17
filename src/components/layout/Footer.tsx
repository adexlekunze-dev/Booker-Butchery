import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white text-black border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Name */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary">BOOKER</h2>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Booker/Products/Product Ranges */}
          <div>
            <h4 className="font-bold text-base mb-4 text-black">Booker</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-black">
                  About Booker
                </Link>
              </li>
            </ul>

            <h4 className="font-bold text-base mb-4 text-black">Products</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/beer" className="hover:text-primary transition-colors text-black">
                  Alcohol
                </Link>
              </li>
              <li>
                <Link href="/meat-fish-poultry" className="hover:text-primary transition-colors text-black">
                  Butchery
                </Link>
              </li>
              <li>
                <Link href="/greengrocery" className="hover:text-primary transition-colors text-black">
                  Fresh Produce
                </Link>
              </li>
            </ul>

            <h4 className="font-bold text-base mb-4 text-black">Product Ranges</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/brands/jacks" className="hover:text-primary transition-colors text-black">
                  Jack's
                </Link>
              </li>
              <li>
                <Link href="/brands/euroshopper" className="hover:text-primary transition-colors text-black">
                  Euroshopper
                </Link>
              </li>
              <li>
                <Link href="/brands/caterpro" className="hover:text-primary transition-colors text-black">
                  CaterPro
                </Link>
              </li>
              <li>
                <Link href="/brands/chefs-essentials" className="hover:text-primary transition-colors text-black">
                  Chef's Essentials
                </Link>
              </li>
              <li>
                <Link href="/brands/chefs-menu" className="hover:text-primary transition-colors text-black">
                  Chef's Menu
                </Link>
              </li>
              <li>
                <Link href="/brands/chefs-premium" className="hover:text-primary transition-colors text-black">
                  Chef's Premium
                </Link>
              </li>
              <li>
                <Link href="/brands/blackgate" className="hover:text-primary transition-colors text-black">
                  Blackgate
                </Link>
              </li>
              <li>
                <Link href="/brands/clean-pro-plus" className="hover:text-primary transition-colors text-black">
                  Clean Pro+
                </Link>
              </li>
              <li>
                <Link href="/brands/farm-fresh" className="hover:text-primary transition-colors text-black">
                  Farm Fresh
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Catering Sectors & Retail Sectors */}
          <div>
            <h4 className="font-bold text-base mb-4 text-black">Catering Sectors</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/sectors/pubs-bars" className="hover:text-primary transition-colors text-black">
                  Pubs & Bars
                </Link>
              </li>
              <li>
                <Link href="/sectors/restaurants" className="hover:text-primary transition-colors text-black">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link href="/sectors/hotels" className="hover:text-primary transition-colors text-black">
                  Hotels
                </Link>
              </li>
              <li>
                <Link href="/sectors/events" className="hover:text-primary transition-colors text-black">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/sectors/coffee-shops-cafes" className="hover:text-primary transition-colors text-black">
                  Coffee Shops & Cafes
                </Link>
              </li>
              <li>
                <Link href="/sectors/takeaways" className="hover:text-primary transition-colors text-black">
                  Takeaways
                </Link>
              </li>
              <li>
                <Link href="/sectors/care-education" className="hover:text-primary transition-colors text-black">
                  Care & Education
                </Link>
              </li>
            </ul>

            <h4 className="font-bold text-base mb-4 text-black">Retail Sectors</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sectors/convenience-retailing" className="hover:text-primary transition-colors text-black">
                  Convenience Retailing
                </Link>
              </li>
              <li>
                <Link href="/sectors/budgens" className="hover:text-primary transition-colors text-black">
                  Budgens
                </Link>
              </li>
              <li>
                <Link href="/sectors/londis" className="hover:text-primary transition-colors text-black">
                  Londis
                </Link>
              </li>
              <li>
                <Link href="/sectors/premier" className="hover:text-primary transition-colors text-black">
                  Premier
                </Link>
              </li>
              <li>
                <Link href="/sectors/family-shopper" className="hover:text-primary transition-colors text-black">
                  Family Shopper
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-bold text-base mb-4 text-black">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/hospitality" className="hover:text-primary transition-colors text-black">
                  Hospitality Services
                </Link>
              </li>
              <li>
                <Link href="/services/retail" className="hover:text-primary transition-colors text-black">
                  Services for Retail Business
                </Link>
              </li>
              <li>
                <Link href="/services/click-collect-delivery" className="hover:text-primary transition-colors text-black">
                  Click & Collect and Delivery
                </Link>
              </li>
              <li>
                <Link href="/services/foodservice-clubs" className="hover:text-primary transition-colors text-black">
                  Foodservice Clubs
                </Link>
              </li>
              <li>
                <Link href="/services/central-billing-marketplace" className="hover:text-primary transition-colors text-black">
                  Central Billing and Marketplace
                </Link>
              </li>
              <li>
                <Link href="/services/oil-recycling" className="hover:text-primary transition-colors text-black">
                  Used Cooking Oil Recycling
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Company */}
          <div>
            <h4 className="font-bold text-base mb-4 text-black">Legal</h4>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-black">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-black">
                  Products Terms and Condition
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-black">
                  Privacy & Cookies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-black">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-black">
                  Modern Slavery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors text-black">
                  Investor Relations
                </Link>
              </li>
            </ul>

            <h4 className="font-bold text-base mb-4 text-black">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/branches" className="hover:text-primary transition-colors text-black">
                  Find a Branch
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-black hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" strokeWidth={2} />
              </Link>
              <Link
                href="#"
                className="text-black hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" strokeWidth={2} />
              </Link>
              <Link
                href="#"
                className="text-black hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-black">
              © Booker 2025 - CD1
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
