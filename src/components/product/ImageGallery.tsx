"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Package } from "lucide-react";

type ImageGalleryProps = {
  images: string[] | null;
  productName: string;
  badges?: {
    bestSeller?: boolean;
    onOffer?: boolean;
    savePercent?: number;
  };
};

export function ImageGallery({ images, productName, badges }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const imageArray = images && Array.isArray(images) && images.length > 0 
    ? images 
    : ["/placeholder-product.jpg"];

  const currentImage = imageArray[selectedIndex];

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % imageArray.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={productName}
              fill
              className={`object-cover cursor-zoom-in transition-transform duration-300 ${
                isZoomed ? "scale-150" : ""
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onClick={() => setIsFullscreen(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <Package className="w-16 h-16" strokeWidth={1.5} />
            </div>
          )}

          {/* Badges */}
          {(badges?.bestSeller || badges?.onOffer || badges?.savePercent) && (
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {badges.bestSeller && (
                <div className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Best Seller
                </div>
              )}
              {badges.onOffer && (
                <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  On Offer
                </div>
              )}
              {badges.savePercent && (
                <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  Save {badges.savePercent}%
                </div>
              )}
            </div>
          )}

          {/* Zoom Icon (Desktop) */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 backdrop-blur rounded-full p-2 shadow-md">
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </div>
          </div>

          {/* Navigation Arrows */}
          {imageArray.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {imageArray.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {imageArray.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(idx)}
                className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  selectedIndex === idx
                    ? "border-primary"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(false);
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentImage}
              alt={productName}
              width={1200}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain"
              sizes="90vw"
            />
            
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur rounded-full p-3 text-white hover:bg-white/30 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {imageArray.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        selectedIndex === idx ? "bg-white" : "bg-white/50"
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

