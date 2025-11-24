import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function ContactActionCards() {
  return (
    <div className="space-y-6">
      {/* Card 1: Website Support */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Support</h2>
        <p className="text-gray-700 mb-6">
          If you are experiencing any difficulty using our website, or need assistance with setting up or accessing your account you can call our Website Support Desk on <strong>0800 555 1234</strong>. Lines are open from Monday - Sunday 7am to 7pm.
        </p>
        <Link href="/contact/website-support">
          <Button variant="primary" size="lg" block>
            Contact Website Support
          </Button>
        </Link>
      </div>

      {/* Card 2: Send us a message */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Send us a message</h2>
        <p className="text-gray-700 mb-6">
          If we can help or if you think we could be doing something better we always want to hear from you. You can send us an e-mail by clicking in the link below.
        </p>
        <Link href="/contact/customer-feedback">
          <Button variant="primary" size="lg" block>
            Customer Feedback
          </Button>
        </Link>
      </div>

      {/* Card 3: Export Enquiries */}
      <div className="bg-gray-100 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Export Enquiries</h2>
        <p className="text-gray-700 mb-6">
          If you are interested in buying stock to export outside of the UK, please call +44 (0)20 1234 5678, or click the link below to send us an email
        </p>
        <Link href="/contact/export-enquiries">
          <Button variant="primary" size="lg" block>
            Export Enquiries
          </Button>
        </Link>
      </div>
    </div>
  );
}

