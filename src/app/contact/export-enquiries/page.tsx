"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const COUNTRIES = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Ireland",
  "Other",
];

export default function ExportEnquiriesPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    companyTradeName: "",
    countryBasedIn: "",
    countryExportTo: "",
    currentlyExporting: "",
    productsRequired: "",
  });
  const [showPrototypeMessage, setShowPrototypeMessage] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPrototypeMessage(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Export</h1>
        
        <p className="text-gray-700 mb-2">
          Fields marked <span className="text-red-600">*</span> are mandatory
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Your Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
              Your Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* E-mail Address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              E-mail Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Contact Telephone */}
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-900 mb-2">
              Contact Telephone <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Company Trade Name */}
          <div>
            <label htmlFor="companyTradeName" className="block text-sm font-medium text-gray-900 mb-2">
              Company Trade Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="companyTradeName"
              name="companyTradeName"
              value={formData.companyTradeName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* What country are you based in? */}
          <div>
            <label htmlFor="countryBasedIn" className="block text-sm font-medium text-gray-900 mb-2">
              What country are you based in? <span className="text-red-600">*</span>
            </label>
            <select
              id="countryBasedIn"
              name="countryBasedIn"
              value={formData.countryBasedIn}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* What country will the goods be exported to? */}
          <div>
            <label htmlFor="countryExportTo" className="block text-sm font-medium text-gray-900 mb-2">
              What country will the goods be exported to? <span className="text-red-600">*</span>
            </label>
            <select
              id="countryExportTo"
              name="countryExportTo"
              value={formData.countryExportTo}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Are you currently exporting from the UK? */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Are you currently exporting from the UK? <span className="text-red-600">*</span>
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="currentlyExporting"
                  value="yes"
                  checked={formData.currentlyExporting === "yes"}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="currentlyExporting"
                  value="no"
                  checked={formData.currentlyExporting === "no"}
                  onChange={handleChange}
                  required
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          {/* Type of Products Required */}
          <div>
            <label htmlFor="productsRequired" className="block text-sm font-medium text-gray-900 mb-2">
              Type of Products Required <span className="text-red-600">*</span>
            </label>
            <textarea
              id="productsRequired"
              name="productsRequired"
              value={formData.productsRequired}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" variant="primary" size="lg" block>
            Submit
          </Button>
        </form>

        {/* Prototype Message */}
        {showPrototypeMessage && (
          <div className="mt-8 p-6 bg-gray-100 border border-gray-200 rounded-lg">
            <p className="text-center text-gray-700 font-medium">
              This is just a prototype - This action is not functional yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

