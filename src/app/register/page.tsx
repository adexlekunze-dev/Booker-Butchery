"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getAllBranches } from "@/lib/data/branches";
import { getAllUsers } from "@/lib/mock-users";
import type { MockUser } from "@/lib/mock-users";

type Branch = {
  id: string;
  branch_code: string;
  name: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessType: "restaurant",
    phone: "",
    branchId: "",
  });
  const [branches, setBranches] = useState<Branch[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBranches, setIsLoadingBranches] = useState(true);

  useEffect(() => {
    // Only load on client side
    if (typeof window === "undefined") return;

    // Load branches from client-side data
    try {
      const allBranches = getAllBranches();
      
      // Map branches to include id
      const branchesWithId = allBranches.map((b) => ({
        id: b.id || b.branch_code,
        branch_code: b.branch_code,
        name: b.name,
      }));
      
      setBranches(branchesWithId);
      if (branchesWithId.length > 0) {
        setFormData((prev) => ({ ...prev, branchId: branchesWithId[0].id }));
      }
    } catch (error) {
      console.error("Error loading branches:", error);
      setError("Failed to load branches. Please refresh the page.");
    } finally {
      setIsLoadingBranches(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      // Check if user already exists
      const existingUsers = getAllUsers();
      if (existingUsers.find(u => u.email === formData.email)) {
        setError("Email already registered. Please sign in instead.");
        setIsLoading(false);
        return;
      }

      // Get branch info
      const selectedBranch = branches.find(b => b.id === formData.branchId);
      if (!selectedBranch) {
        setError("Please select a valid branch");
        setIsLoading(false);
        return;
      }

      // Create new user
      const newUser: MockUser = {
        id: `user-${Date.now()}`,
        email: formData.email,
        password: formData.password, // In real app, this would be hashed
        full_name: formData.businessName, // Use business name as full name for now
        business_name: formData.businessName,
        business_type: formData.businessType,
        primary_branch_code: selectedBranch.branch_code,
        delivery_address: {
          line1: '', // Will be filled in later
          city: '',
          postcode: '',
        },
        contact_phone: formData.phone,
        loyalty_tier: 'bronze',
        loyalty_points: 0,
      };

      // Store in localStorage
      const registeredUsers = typeof window !== 'undefined' 
        ? JSON.parse(localStorage.getItem('mock_users') || '[]')
        : [];
      registeredUsers.push(newUser);
      localStorage.setItem('mock_users', JSON.stringify(registeredUsers));

      // Redirect to login page with success message
      router.push("/login?registered=true");
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Member</h1>
            <p className="text-gray-600">Create your Booker account to get started</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+44 123 456 7890"
              />
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                id="businessType"
                name="businessType"
                required
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="pub">Pub</option>
                <option value="retail_shop">Retail Shop</option>
                <option value="catering">Catering</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="branchId" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Branch
              </label>
              {isLoadingBranches ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500">
                  Loading branches...
                </div>
              ) : (
                <select
                  id="branchId"
                  name="branchId"
                  required
                  value={formData.branchId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name} ({branch.branch_code})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Minimum 8 characters"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Confirm your password"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" block disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

