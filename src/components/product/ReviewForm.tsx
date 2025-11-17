"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSession } from "@/lib/mock-auth";
import Link from "next/link";

type ReviewFormProps = {
  productSku: string;
  onSuccess?: () => void;
};

export function ReviewForm({ productSku, onSuccess }: ReviewFormProps) {
  const [session, setSession] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);

    // Listen for storage changes
    const handleStorageChange = () => {
      setSession(getSession());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  if (!session?.user) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <p className="text-gray-600 mb-4">Please sign in to write a review.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/login">
            <Button variant="primary">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button variant="tertiary">Create Account</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !title || !reviewText) {
      alert("Please fill in all fields and select a rating.");
      return;
    }

    setSubmitting(true);
    try {
      // Save review to localStorage (for prototype)
      if (typeof window !== 'undefined') {
        const reviews = localStorage.getItem('productReviews');
        let reviewsList: any[] = [];
        
        if (reviews) {
          try {
            reviewsList = JSON.parse(reviews);
          } catch (e) {
            // Invalid JSON, start fresh
          }
        }

        const newReview = {
          id: `review-${Date.now()}`,
          product_sku: productSku,
          user_email: session?.user?.email || 'anonymous',
          user_name: session?.user?.name || 'Anonymous',
          rating,
          title,
          review_text: reviewText,
          created_at: new Date().toISOString(),
          status: 'pending', // Would be moderated in real system
        };

        reviewsList.push(newReview);
        localStorage.setItem('productReviews', JSON.stringify(reviewsList));
        
        setSubmitted(true);
        setRating(0);
        setTitle("");
        setReviewText("");
        onSuccess?.();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-700 font-medium mb-2">Thank you for your review!</p>
        <p className="text-sm text-green-600">Your review has been submitted and will be visible after moderation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>

      {/* Star Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Rating *
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
              aria-label={`Rate ${star} stars`}
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "text-primary fill-primary"
                    : "text-gray-300 fill-none"
                }`}
                strokeWidth={2}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Title */}
      <div>
        <label htmlFor="review-title" className="block text-sm font-medium text-gray-700 mb-2">
          Review Title *
        </label>
        <input
          id="review-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Review Text */}
      <div>
        <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          id="review-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Tell others about your experience with this product..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-gray-500">
          Your review will be visible to other customers
        </p>
        <Button
          type="submit"
          variant="primary"
          disabled={submitting || !rating || !title || !reviewText}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </form>
  );
}

