"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, getUser } from "@/lib/mock-auth";
import { getBranchByCode } from "@/lib/data/branches";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HelpCircle } from "lucide-react";

// Helper function to generate customer number from user ID
function generateCustomerNumber(userId: string): string {
  // Extract numbers from user ID or use a hash-like approach
  const numbers = userId.replace(/\D/g, '');
  if (numbers.length >= 9) {
    return numbers.slice(0, 9);
  }
  // Fallback: generate a 9-digit number from user ID
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString().padStart(9, '0').slice(0, 9);
}

// Toggle Switch Component
function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-gray-300'
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// Account Card Component (reusable wrapper)
function AccountCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function AccountPage() {
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [branchName, setBranchName] = useState<string>("");
  const [customerNumber, setCustomerNumber] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [claimsNotificationsEnabled, setClaimsNotificationsEnabled] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    
    // If not logged in, redirect to login
    if (!currentSession?.user) {
      router.push("/login");
      return;
    }

    setSession(currentSession);
    setUser(currentUser);
    
    // Get branch name
    if (currentUser?.primary_branch_code) {
      const branch = getBranchByCode(currentUser.primary_branch_code);
      if (branch) {
        setBranchName(branch.name);
      }
    }

    // Generate customer number
    if (currentUser?.id) {
      setCustomerNumber(generateCustomerNumber(currentUser.id));
    }

    setLoading(false);

    // Listen for storage changes
    const handleStorageChange = () => {
      const newSession = getSession();
      const newUser = getUser();
      setSession(newSession);
      setUser(newUser);
      
      if (!newSession?.user) {
        router.push("/login");
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading account...</div>
        </div>
      </div>
    );
  }

  if (!session?.user || !user) {
    return null; // Will redirect
  }

  const userName = user.full_name || session.user.name || "User";
  const userEmail = user.email || session.user.email || "";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* My Business Details */}
            <AccountCard title="My Business Details">
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Local Booker Branch: </span>
                  <span className="font-medium text-gray-900">{branchName || "Not set"}</span>
                </div>
                <div>
                  <span className="text-gray-600">Customer Number: </span>
                  <span className="font-medium text-gray-900">{customerNumber || "Not available"}</span>
                </div>
              </div>
            </AccountCard>

            {/* My Login Details */}
            <AccountCard title="My Login Details">
              <p className="text-sm text-gray-600 mb-4">
                Your login details identify you to Booker.co.uk. When registering, you specify a password that allows you to login securely. You will be prompted for this password when you place orders on the website.
              </p>
              <div className="space-y-3 mb-4">
                <div>
                  <span className="text-gray-600">Your Name: </span>
                  <span className="font-medium text-gray-900">{userName}</span>
                </div>
                <div>
                  <span className="text-gray-600">E-mail: </span>
                  <span className="font-medium text-gray-900">{userEmail}</span>
                </div>
                <div>
                  <span className="text-gray-600">Password: </span>
                  <span className="font-medium text-gray-900">**********</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Link href="/account/settings">
                  <Button variant="primary" size="sm">
                    Change My Login Details
                  </Button>
                </Link>
              </div>
            </AccountCard>

            {/* My Linked Accounts */}
            <AccountCard title="My Linked Accounts">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <p className="text-sm text-gray-600 flex-1">
                    Do you have multiple store accounts and would like to switch from one account to another without logging in again?
                  </p>
                  <button className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  Please click 'Link My Account' to create the request.
                </p>
                <div className="flex justify-end">
                  <Link href="/account/link-account">
                    <Button variant="primary" size="sm">
                      Link My Account
                    </Button>
                  </Link>
                </div>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Approved Accounts</h3>
                  <p className="text-sm text-gray-600">
                    No accounts can currently log in as you without knowing your password.
                  </p>
                </div>
              </div>
            </AccountCard>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* My Previous Invoices and Statements */}
            <AccountCard title="My Previous Invoices and Statements">
              <p className="text-sm text-gray-600 mb-4">
                View your previous invoices for products you have bought in-branch or online.
              </p>
              <div className="flex justify-center">
                <Link href="/account/invoices">
                  <Button variant="primary" size="sm">
                    My Invoices
                  </Button>
                </Link>
              </div>
            </AccountCard>

            {/* My Card Payment Details */}
            <AccountCard title="My Card Payment Details">
              <p className="text-sm text-gray-600 mb-4">
                Manage your Credit/Debit cards.
              </p>
              <div className="flex justify-end">
                <Link href="/account/payment-methods">
                  <Button variant="primary" size="sm">
                    Manage Card Details
                  </Button>
                </Link>
              </div>
            </AccountCard>

            {/* My Digital Vouchers */}
            <AccountCard title="My Digital Vouchers">
              <p className="text-sm text-gray-600 mb-4">
                View all the available vouchers that have been added to your account that you can redeem on booker.co.uk.
              </p>
              <div className="flex justify-end">
                <Link href="/account/vouchers">
                  <Button variant="primary" size="sm">
                    View my vouchers
                  </Button>
                </Link>
              </div>
            </AccountCard>

            {/* My Current Spend and Save Status */}
            <AccountCard title="My Current Spend and Save Status">
              <p className="text-sm text-gray-600 mb-4">
                View your latest spend and save update.
              </p>
              <div className="flex justify-end">
                <Link href="/account/financial?tab=spend-save">
                  <Button variant="primary" size="sm">
                    View My Spend & Save
                  </Button>
                </Link>
              </div>
            </AccountCard>

            {/* Tobacco Track & Trace */}
            <AccountCard title="Tobacco Track & Trace">
              <p className="text-sm text-gray-600 mb-4">
                Manage your Economic Operator and Facility identification codes.
              </p>
              <div className="flex justify-end">
                <Link href="/account/tobacco-trace">
                  <Button variant="primary" size="sm">
                    Manage Identification
                  </Button>
                </Link>
              </div>
            </AccountCard>

            {/* Contact Preferences */}
            <AccountCard title="Contact Preferences">
              <p className="text-sm text-gray-600 mb-4">
                Booker Group would like to send you marketing information; including our own products and services, special offers, events and market research.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Update your contact preferences.
              </p>
              <div className="flex justify-end">
                <Link href="/account/preferences">
                  <Button variant="primary" size="sm">
                    Contact Preferences
                  </Button>
                </Link>
              </div>
            </AccountCard>

            {/* My Claims */}
            <AccountCard title="My Claims">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Manage Notifications</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 flex-1">
                      I would like to receive Claim Submission Emails
                    </span>
                    <ToggleSwitch
                      checked={claimsNotificationsEnabled}
                      onChange={setClaimsNotificationsEnabled}
                    />
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">My Claims</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Create new claim, and view claims already submitted.
                  </p>
                  <div className="flex gap-3">
                    <Link href="/account/claims" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        View Claims
                      </Button>
                    </Link>
                    <Link href="/account/claims/new" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Create New Claim
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AccountCard>
          </div>
        </div>
      </div>
    </div>
  );
}
