import { Quote, MapPin } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  business: string;
  location: string;
  photo: string;
};

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "Booker's wholesale platform has transformed how we manage our inventory. Real-time stock visibility means we never run out of essentials.",
    name: "Sarah Johnson",
    business: "Restaurant Owner",
    location: "Manchester, UK",
    photo: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
  },
  {
    id: "2",
    quote: "The branch-aware system is brilliant. We can see exactly what's available at our local branch and plan our orders accordingly.",
    name: "Michael Chen",
    business: "Head Chef & Owner",
    location: "London, UK",
    photo: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=800&q=80"
  },
  {
    id: "3",
    quote: "Fast delivery and excellent quality. Booker has become our trusted partner for all wholesale needs.",
    name: "Emma Williams",
    business: "Catering Director",
    location: "Birmingham, UK",
    photo: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80"
  }
];

export function TestimonialsCarousel() {
  return (
    <section className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Trusted by Businesses Across the UK
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Real stories from businesses we support every day.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
            >
              {/* Business Photo */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={testimonial.photo}
                  alt={`${testimonial.business} - ${testimonial.location}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <Quote className="w-8 h-8 text-primary mb-3" strokeWidth={1.5} />
                <blockquote className="text-base text-gray-700 mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{testimonial.business}</div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

