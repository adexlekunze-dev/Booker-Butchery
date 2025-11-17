"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ReviewForm } from "./ReviewForm";

type Review = {
  id: string;
  rating: number;
  title: string;
  review_text: string;
  verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
  user: {
    business_name: string;
    business_type: string;
  };
};

type ReviewDisplayProps = {
  productId: string;
  productSku: string;
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

export function ReviewDisplay({ productId, productSku, reviewsSummary }: ReviewDisplayProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("most_helpful");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [productSku, sortBy, page, ratingFilter]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Mock reviews data
      const mockReviews: Review[] = [
        {
          id: '1',
          rating: 5,
          title: 'Excellent quality',
          review_text: 'Great product, very fresh and delivered on time. Will definitely order again!',
          verified_purchase: true,
          helpful_count: 12,
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
          user: {
            business_name: 'The Red Lion Restaurant',
            business_type: 'restaurant',
          },
        },
        {
          id: '2',
          rating: 4,
          title: 'Good value for money',
          review_text: 'Good quality for the price. Consistent quality and fast delivery. Recommended.',
          verified_purchase: true,
          helpful_count: 8,
          created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
          user: {
            business_name: 'Sample Cafe',
            business_type: 'cafe',
          },
        },
        {
          id: '3',
          rating: 5,
          title: 'Top quality as always',
          review_text: 'We order this regularly and it never disappoints. Fresh, well-packaged, and great value.',
          verified_purchase: true,
          helpful_count: 15,
          created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
          user: {
            business_name: 'The Golden Spoon Restaurant',
            business_type: 'restaurant',
          },
        },
        {
          id: '4',
          rating: 4,
          title: 'Reliable supplier',
          review_text: 'Good service and consistent quality. Delivery is always on time.',
          verified_purchase: true,
          helpful_count: 6,
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
          user: {
            business_name: 'City Bistro',
            business_type: 'restaurant',
          },
        },
      ];

      // Filter by rating if needed
      let filteredReviews = mockReviews;
      if (ratingFilter) {
        filteredReviews = mockReviews.filter(r => r.rating === ratingFilter);
      }

      // Sort reviews
      let sortedReviews = [...filteredReviews];
      switch (sortBy) {
        case 'newest':
          sortedReviews.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        case 'highest':
          sortedReviews.sort((a, b) => b.rating - a.rating);
          break;
        case 'lowest':
          sortedReviews.sort((a, b) => a.rating - b.rating);
          break;
        case 'most_helpful':
        default:
          sortedReviews.sort((a, b) => b.helpful_count - a.helpful_count);
          break;
      }

      // Simple pagination
      const startIndex = (page - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedReviews = sortedReviews.slice(startIndex, endIndex);

      setReviews(paginatedReviews);
      setTotalPages(Math.ceil(sortedReviews.length / 10));
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    // TODO: Implement helpful increment API
    console.log("Mark as helpful:", reviewId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  };

  const getBusinessTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      restaurant: "Restaurant",
      cafe: "Cafe",
      pub: "Pub/Bar",
      retail_shop: "Retail Shop",
      catering: "Catering",
      other: "Business",
    };
    return labels[type] || type;
  };

  const averageRating = reviewsSummary?.average_rating || 0;
  const totalCount = reviewsSummary?.total_count || 0;
  const ratingBreakdown = reviewsSummary?.rating_breakdown || [];

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      {totalCount > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Overall Rating */}
            <div className="text-center md:text-left">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating)
                        ? "text-primary fill-primary"
                        : i < averageRating
                        ? "text-primary fill-primary opacity-50"
                        : "text-gray-300 fill-none"
                    }`}
                    strokeWidth={2}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {totalCount} {totalCount === 1 ? "review" : "reviews"}
              </div>
            </div>

            {/* Rating Breakdown */}
            {ratingBreakdown.length > 0 ? (
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const breakdown = ratingBreakdown.find((b) => b.rating === rating);
                  const percentage = breakdown?.percentage || 0;
                  const count = breakdown?.count || 0;
                  
                  // Create visual bar (20 blocks = 100%)
                  const filledBlocks = Math.round(percentage / 5); // percentage / 5 = blocks (out of 20)
                  const emptyBlocks = 20 - filledBlocks;
                  const filledBar = '█'.repeat(filledBlocks);
                  const emptyBar = '░'.repeat(emptyBlocks);
                  
                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="text-sm font-medium w-12 text-right">
                        {rating} star:
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-base font-mono text-gray-700">
                          {filledBar}{emptyBar}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 w-16 text-right">
                        {percentage.toFixed(0)}%
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Generate breakdown if not provided (mock data for prototype)
              totalCount > 0 && (
                <div className="flex-1 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    // Mock percentages based on average rating
                    let mockPercentage = 0;
                    if (rating === 5) mockPercentage = averageRating >= 4.5 ? 78 : 60;
                    else if (rating === 4) mockPercentage = averageRating >= 4 ? 15 : 20;
                    else if (rating === 3) mockPercentage = averageRating >= 3 ? 5 : 10;
                    else if (rating === 2) mockPercentage = 1;
                    else mockPercentage = 1;
                    
                    const filledBlocks = Math.round(mockPercentage / 5);
                    const emptyBlocks = 20 - filledBlocks;
                    const filledBar = '█'.repeat(filledBlocks);
                    const emptyBar = '░'.repeat(emptyBlocks);
                    
                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="text-sm font-medium w-12 text-right">
                          {rating} star:
                        </div>
                        <div className="flex-1 flex items-center gap-2">
                          <span className="text-base font-mono text-gray-700">
                            {filledBar}{emptyBar}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 w-16 text-right">
                          {mockPercentage}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Review Form */}
      <ReviewForm productSku={productSku} onSuccess={fetchReviews} />

      {/* Sort Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="most_helpful">Most Helpful</option>
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Filter by rating:</span>
          <div className="flex gap-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => setRatingFilter(ratingFilter === rating ? null : rating)}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  ratingFilter === rating
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {rating} ⭐
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="text-center py-8 text-gray-600">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-primary fill-primary"
                                : "text-gray-300 fill-none"
                            }`}
                            strokeWidth={2}
                          />
                        ))}
                      </div>
                      {review.verified_purchase && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">{review.title}</h4>
                  </div>
                  <div className="text-sm text-gray-500">{formatDate(review.created_at)}</div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{review.review_text}</p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{review.user.business_name}</span>
                    <span className="mx-2">•</span>
                    <span>{getBusinessTypeLabel(review.user.business_type)}</span>
                  </div>

                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Helpful ({review.helpful_count})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </div>
              <div className="flex gap-2">
                {page > 1 && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </Button>
                )}
                {page < totalPages && (
                  <Button
                    variant="tertiary"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

