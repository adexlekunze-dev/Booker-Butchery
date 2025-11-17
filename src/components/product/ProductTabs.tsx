"use client";

import { useState } from "react";
import { BookOpen, Package, Building2, AlertTriangle, Star, HelpCircle, ChevronDown, ChevronUp, Award, Thermometer, Calendar, ChefHat } from "lucide-react";
import { ReviewDisplay } from "./ReviewDisplay";

type ProductTabsProps = {
  product: {
    id: string;
    sku: string;
    name?: string;
    brand?: string;
    descriptions?: any;
    specifications?: any;
    storage_info?: string | null;
    shelf_life_days?: number | null;
    cooking_instructions?: string | null;
    nutrition?: any;
    allergens?: any;
    certifications?: any;
    attributes?: any;
    packaging?: any;
    supplier?: any;
    disclaimer?: string | null;
  };
  reviewsSummary?: {
    average_rating: number;
    total_count: number;
    rating_breakdown?: Array<{
      rating: number;
      count: number;
      percentage: number;
    }>;
  };
};

type TabId = "about" | "packaging" | "brand" | "disclaimer" | "reviews" | "qa";

export function ProductTabs({ product, reviewsSummary }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("about");
  const [expandedTabs, setExpandedTabs] = useState<Set<TabId>>(new Set(["about"]));

  const tabs: Array<{ id: TabId; label: string; icon: any }> = [
    { id: "about", label: "About the product", icon: BookOpen },
    { id: "packaging", label: "Product Packaging Information", icon: Package },
    { id: "brand", label: "Brand and Supplier Information", icon: Building2 },
    { id: "disclaimer", label: "Product Disclaimer", icon: AlertTriangle },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "qa", label: "Q&A", icon: HelpCircle },
  ];

  const toggleTab = (tabId: TabId) => {
    setExpandedTabs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tabId)) {
        newSet.delete(tabId);
      } else {
        newSet.add(tabId);
      }
      return newSet;
    });
  };

  const longDescription = product.descriptions?.long || product.descriptions?.short || "";
  const shortDescription = product.descriptions?.short || "";
  const features = product.descriptions?.features || [];
  const specifications = product.specifications || {};
  const nutrition = product.nutrition || {};
  const allergens = product.allergens || [];
  const certifications = product.certifications || [];
  const packaging = product.packaging || {};
  const supplier = product.supplier || {};
  const disclaimer = product.disclaimer || "";

  // About the Product Content
  const renderAboutContent = () => (
    <div className="space-y-6 prose max-w-none">
      {longDescription && (
        <div className="text-gray-700 leading-relaxed">{longDescription}</div>
      )}

      {features.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Features:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {features.map((feature: string, idx: number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Storage & Handling */}
      {(product.storage_info || product.shelf_life_days || product.cooking_instructions) && (
        <div className="border-t border-gray-200 pt-6 space-y-4">
          {product.storage_info && (
            <div className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">Storage</div>
                <div className="text-gray-700">{product.storage_info}</div>
              </div>
            </div>
          )}

          {product.shelf_life_days && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">Shelf Life</div>
                <div className="text-gray-700">
                  {product.shelf_life_days} days from delivery
                </div>
              </div>
            </div>
          )}

          {product.cooking_instructions && (
            <div className="flex items-start gap-3">
              <ChefHat className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 mb-1">Cooking Instructions</div>
                <div className="text-gray-700">{product.cooking_instructions}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Nutritional Information */}
      {Object.keys(nutrition).length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Nutritional Information (per 100g)</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full text-sm">
              <tbody className="space-y-2">
                {nutrition.energy && (
                  <tr className="flex justify-between border-b border-gray-200 py-2">
                    <td className="font-medium">Energy</td>
                    <td>{nutrition.energy}</td>
                  </tr>
                )}
                {nutrition.protein && (
                  <tr className="flex justify-between border-b border-gray-200 py-2">
                    <td className="font-medium">Protein</td>
                    <td>{nutrition.protein}</td>
                  </tr>
                )}
                {nutrition.fat && (
                  <tr className="flex justify-between border-b border-gray-200 py-2">
                    <td className="font-medium">Fat</td>
                    <td>{nutrition.fat}</td>
                  </tr>
                )}
                {nutrition.carbohydrates && (
                  <tr className="flex justify-between border-b border-gray-200 py-2">
                    <td className="font-medium">Carbohydrates</td>
                    <td>{nutrition.carbohydrates}</td>
                  </tr>
                )}
                {nutrition.fiber && (
                  <tr className="flex justify-between border-b border-gray-200 py-2">
                    <td className="font-medium">Fiber</td>
                    <td>{nutrition.fiber}</td>
                  </tr>
                )}
                {nutrition.salt && (
                  <tr className="flex justify-between py-2">
                    <td className="font-medium">Salt</td>
                    <td>{nutrition.salt}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button className="text-sm text-primary hover:text-primary font-medium">
              View Full Nutrition Facts →
            </button>
          </div>
        </div>
      )}

      {/* Allergens */}
      {Array.isArray(allergens) && allergens.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Allergens</h3>
          <div className="text-gray-700">
            {allergens.join(", ")}
          </div>
        </div>
      )}

      {Array.isArray(allergens) && allergens.length === 0 && (
        <div className="border-t border-gray-200 pt-6">
          <div className="text-gray-700">None</div>
        </div>
      )}

      {/* Certifications */}
      {Array.isArray(certifications) && certifications.length > 0 && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Certifications</h3>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert: string, idx: number) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-gray-900">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Packaging Information Content
  const renderPackagingContent = () => (
    <div className="space-y-6">
      {Object.keys(packaging).length > 0 ? (
        <div className="bg-gray-50 rounded-lg p-6">
          <dl className="space-y-4">
            {Object.entries(packaging).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-4 last:border-0">
                <dt className="font-semibold text-gray-900 mb-1 capitalize">
                  {key.replace(/_/g, " ")}
                </dt>
                <dd className="text-gray-700">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="text-gray-600">No packaging information available for this product.</div>
      )}
    </div>
  );

  // Brand and Supplier Information Content
  const renderBrandContent = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        {product.brand && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Brand</h3>
            <p className="text-gray-700">{product.brand}</p>
          </div>
        )}
        
        {Object.keys(supplier).length > 0 && (
          <div className={product.brand ? "border-t border-gray-200 pt-4" : ""}>
            <h3 className="font-semibold text-gray-900 mb-2">Supplier Information</h3>
            <dl className="space-y-3">
              {Object.entries(supplier).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-medium text-gray-900 mb-1 capitalize">
                    {key.replace(/_/g, " ")}
                  </dt>
                  <dd className="text-gray-700">{String(value)}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {!product.brand && Object.keys(supplier).length === 0 && (
          <div className="text-gray-600">No brand or supplier information available for this product.</div>
        )}
      </div>
    </div>
  );

  // Disclaimer Content
  const renderDisclaimerContent = () => (
    <div className="space-y-6">
      {disclaimer ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {disclaimer}
          </div>
        </div>
      ) : (
        <div className="text-gray-600">No disclaimer information available for this product.</div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return renderAboutContent();
      case "packaging":
        return renderPackagingContent();
      case "brand":
        return renderBrandContent();
      case "disclaimer":
        return renderDisclaimerContent();
      case "reviews":
        return (
          <ReviewDisplay 
            productId={product.id} 
            productSku={product.sku}
            reviewsSummary={reviewsSummary}
          />
        );
      case "qa":
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Questions Yet</h3>
              <p className="text-gray-600">
                Be the first to ask a question about this product.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Desktop: 2 Column Layout */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-0">
        {/* Left Column: Tab List */}
        <div className="lg:col-span-4 border-r border-gray-200 bg-gray-50">
          <div className="p-4">
            <h2 className="font-semibold text-gray-900 text-lg mb-4">Product Information</h2>
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-md transition-colors border-b-4 ${
                      isActive
                        ? "border-primary text-primary font-medium"
                        : "border-transparent text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-600"}`} />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-8">
          <div className="p-6 md:p-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile: Collapsible Sections */}
      <div className="lg:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isExpanded = expandedTabs.has(tab.id);

          return (
            <div key={tab.id} className="border-b border-gray-200 last:border-0">
              <button
                onClick={() => toggleTab(tab.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">{tab.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {isExpanded && (
                <div className="px-4 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    {tab.id === "about" && renderAboutContent()}
                    {tab.id === "packaging" && renderPackagingContent()}
                    {tab.id === "brand" && renderBrandContent()}
                    {tab.id === "disclaimer" && renderDisclaimerContent()}
                    {tab.id === "reviews" && (
                      <ReviewDisplay 
                        productId={product.id} 
                        productSku={product.sku}
                        reviewsSummary={reviewsSummary}
                      />
                    )}
                    {tab.id === "qa" && (
                      <div className="space-y-6">
                        <div className="text-center py-12">
                          <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Questions Yet</h3>
                          <p className="text-gray-600">
                            Be the first to ask a question about this product.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

