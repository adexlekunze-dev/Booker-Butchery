"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BranchSearchForm() {
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState<"retailer" | "food_service" | "">("");
  const [departments, setDepartments] = useState<{
    butchery: boolean;
    fishMonger: boolean;
    tobacco: boolean;
  }>({
    butchery: false,
    fishMonger: false,
    tobacco: false,
  });
  const [shoppingPreferences, setShoppingPreferences] = useState<{
    productRange: boolean;
    delivery: boolean;
    clickCollect: boolean;
  }>({
    productRange: false,
    delivery: false,
    clickCollect: false,
  });
  const [showResults, setShowResults] = useState(false);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, reverse geocode to get address
          setLocation(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enter it manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleDepartmentChange = (dept: keyof typeof departments) => {
    setDepartments((prev) => ({
      ...prev,
      [dept]: !prev[dept],
    }));
  };

  const handleShoppingPreferenceChange = (pref: keyof typeof shoppingPreferences) => {
    setShoppingPreferences((prev) => ({
      ...prev,
      [pref]: !prev[pref],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location Section */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Find a branch
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter a Location"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="mt-2 text-sm text-primary hover:text-primary font-medium"
          >
            Or use my location
          </button>
        </div>

        {/* Business Type */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            What type of business do you have?
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="businessType"
                value="retailer"
                checked={businessType === "retailer"}
                onChange={(e) => setBusinessType(e.target.value as "retailer" | "food_service")}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Retailer</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="businessType"
                value="food_service"
                checked={businessType === "food_service"}
                onChange={(e) => setBusinessType(e.target.value as "retailer" | "food_service")}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Food Service</span>
            </label>
          </div>
        </div>

        {/* Departments */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Will you need these departments?
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={departments.butchery}
                onChange={() => handleDepartmentChange("butchery")}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Butchery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={departments.fishMonger}
                onChange={() => handleDepartmentChange("fishMonger")}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Fish Monger</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={departments.tobacco}
                onChange={() => handleDepartmentChange("tobacco")}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Tobacco</span>
            </label>
          </div>
        </div>

        {/* Shopping Preferences */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            How do you want to shop?
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shoppingPreferences.productRange}
                onChange={() => handleShoppingPreferenceChange("productRange")}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Product Range</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shoppingPreferences.delivery}
                onChange={() => handleShoppingPreferenceChange("delivery")}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Delivery</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={shoppingPreferences.clickCollect}
                onChange={() => handleShoppingPreferenceChange("clickCollect")}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="text-sm text-gray-700">Click & Collect</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="lg" block>
          Find a branch
        </Button>
      </form>

      {/* Prototype Results Message */}
      {showResults && (
        <div className="mt-6 p-6 bg-gray-100 border border-gray-200 rounded-lg">
          <p className="text-center text-gray-700 font-medium">
            This is just a prototype - Results would display matching branches here
          </p>
        </div>
      )}
    </div>
  );
}

