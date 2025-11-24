"use client";

import { useEffect, useState } from "react";
import { getProductBySku, getProducts } from "@/lib/data/products";
import { getSession, getUser } from "@/lib/mock-auth";
import { ProductBreadcrumb } from "@/components/product/ProductBreadcrumb";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductTabs } from "@/components/product/ProductTabs";
import { FrequentlyBoughtTogether } from "@/components/product/FrequentlyBoughtTogether";
import { UpsellProducts } from "@/components/product/UpsellProducts";
import { CompleteYourOrder } from "@/components/product/CompleteYourOrder";
import { CustomersAlsoViewedClient } from "@/components/product/CustomersAlsoViewedClient";
import { TrustBadges } from "@/components/product/TrustBadges";
import { StockBadge } from "@/components/product/StockBadge";
import { StockNotificationCheckbox } from "@/components/product/StockNotificationCheckbox";
import { AvailabilityPanelWrapper } from "@/components/product/AvailabilityPanelWrapper";
import { RecipeIntegration } from "@/components/product/RecipeIntegration";
import { ChefTestimonials } from "@/components/testimonials/ChefTestimonials";

export function ProductDetailClient({ sku }: { sku: string }) {
  const [productData, setProductData] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any>({ frequentlyBought: { products: [] }, upsells: { products: [] }, complementary: { products: [] } });
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentSession = getSession();
    const currentUser = getUser();
    setSession(currentSession);
    setUser(currentUser);

    const branchCode = currentUser?.primary_branch_code;
    
    // Fetch product
    const product = getProductBySku(sku, branchCode);
    if (!product) {
      setLoading(false);
      return;
    }

    setProductData({
      product,
      availability: product.availability,
      reviews_summary: {
        average_rating: 4.5, // Mock data
        total_count: 12, // Mock data
      },
    });

    // Fetch related products (simplified for prototype)
    const categoryProducts = getProducts({
      category: product.category,
      branchCode,
      perPage: 8,
    });

    setRelatedProducts({
      frequentlyBought: { products: categoryProducts.products.slice(0, 4) },
      upsells: { products: categoryProducts.products.slice(4, 8) },
      complementary: { products: [] },
    });

    setLoading(false);
  }, [sku]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading product...</div>
        </div>
      </div>
    );
  }

  if (!productData || !productData.product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Product not found</div>
        </div>
      </div>
    );
  }

  const { product, availability, reviews_summary } = productData;
  const isAuthenticated = !!session?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductBreadcrumb
          category={product.category}
          subcategory={product.subcategory}
          productName={product.name}
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
            {/* Left Column: Image Gallery */}
            <div className="space-y-6">
              <ImageGallery images={product.images || []} productName={product.name} />
              
              {/* Availability Panel - Desktop only, below image gallery */}
              {isAuthenticated && (
                <div className="hidden lg:block">
                  <AvailabilityPanelWrapper sku={product.sku} />
                </div>
              )}
            </div>

            {/* Right Column: Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {product.on_offer && (
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mb-4">
                      On Offer
                    </span>
                  )}
                </div>
                <StockBadge availability={availability} />
              </div>

              <ProductInfo 
                product={product} 
                reviewsSummary={reviews_summary}
                availabilityPanel={isAuthenticated ? <AvailabilityPanelWrapper sku={product.sku} /> : null}
              />

              {isAuthenticated && availability && (
                <div className="mt-4">
                  <StockNotificationCheckbox
                    productId={product.id}
                    sku={product.sku}
                    inStock={availability.in_stock}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <ProductTabs product={product} reviewsSummary={reviews_summary} />

        {/* Related Products */}
        {relatedProducts.frequentlyBought.products.length > 0 && (
          <FrequentlyBoughtTogether 
            products={relatedProducts.frequentlyBought.products}
            currentProduct={product}
          />
        )}

        {relatedProducts.upsells.products.length > 0 && (
          <UpsellProducts 
            products={relatedProducts.upsells.products} 
            currentProduct={product}
          />
        )}

        {/* Recipe Integration - After Upgrade Your Choice */}
        {product.recipes && product.recipes.length > 0 && (
          <RecipeIntegration recipes={product.recipes} />
        )}

        {/* Chef Testimonials */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                What Professional Chefs Say
              </h2>
              <p className="text-gray-600">
                Trusted by top restaurants across the UK
              </p>
            </div>
            <ChefTestimonials
              variant="carousel"
              productCategory={product.category}
              productSku={product.sku}
              maxItems={5}
              showNavigation={true}
              autoplay={true}
              autoplayDelay={6000}
            />
          </div>
        </div>

        <CompleteYourOrder products={[]} />

        <CustomersAlsoViewedClient currentProductId={product.id} />

        <TrustBadges product={product} />
      </div>
    </div>
  );
}

