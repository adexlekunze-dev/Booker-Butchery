import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ContactActionCards } from "@/components/contact/ContactActionCards";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Registered Office Information */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Registered Office</h1>
            
            <div className="space-y-6 text-gray-700">
              <div>
                <p className="font-semibold text-gray-900 mb-1">General Enquiries</p>
                <p className="text-lg">0800 123 4567</p>
              </div>
              
              <div>
                <p className="font-semibold text-gray-900 mb-1">VAT Number</p>
                <p>GB 123 456 789</p>
              </div>
              
              <div>
                <p className="font-semibold text-gray-900 mb-1">Registered in London</p>
                <p>12345678</p>
              </div>
              
              <div>
                <p className="font-semibold text-gray-900 mb-1">Postal Address</p>
                <div className="space-y-1">
                  <p>Demo Wholesale Ltd</p>
                  <p>123 Business Park Avenue</p>
                  <p>London</p>
                  <p>Greater London</p>
                  <p>SW1A 1AA</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/">
                <Button variant="primary" size="lg" block>
                  Continue Browsing
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Support Sections */}
          <ContactActionCards />
        </div>
      </div>
    </div>
  );
}

