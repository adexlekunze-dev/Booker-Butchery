"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type SEOContentSectionProps = {
  content: string;
  useH1?: boolean; // If true, converts h2 to h1 for pages without main H1
};

export function SEOContentSection({ content, useH1 = false }: SEOContentSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // If useH1 is true, convert h2 tags to h1 for SEO best practice (one H1 per page)
  const processedContent = useH1 
    ? content.replace(/<h2>/g, '<h1>').replace(/<\/h2>/g, '</h1>')
    : content;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div
              className={`prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold transition-all duration-300 ${
                !isExpanded ? 'line-clamp-3' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center"
              aria-label={isExpanded ? "Show Less" : "Read More"}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


