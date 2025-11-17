"use client";

import { SectorFAQ as SectorFAQType } from "@/data/sectors";
import { FAQAccordion } from "@/components/help/FAQAccordion";

type SectorFAQProps = {
  sectorName: string;
  faqs?: SectorFAQType[];
};

export function SectorFAQ({ sectorName, faqs }: SectorFAQProps) {
  // Default FAQs if none provided - always render section
  const defaultFaqs: SectorFAQType[] = [
    {
      question: `What types of products does Booker supply for ${sectorName}?`,
      answer: `Booker supplies a comprehensive range of products tailored for ${sectorName}, including fresh ingredients, beverages, and essential supplies. Our extensive catalog is specifically curated to meet the needs of ${sectorName.toLowerCase()} businesses.`,
    },
    {
      question: `How does delivery work for ${sectorName}?`,
      answer: `We offer reliable next-day delivery to ${sectorName} businesses across the UK. Orders placed before 3pm are delivered the next day. You can also use our Click & Collect service to pick up orders from your nearest branch.`,
    },
    {
      question: `Do I need to be a member to order from Booker?`,
      answer: `Yes, membership is required to access our wholesale pricing and full product range. Becoming a member is free and takes just a few minutes. Membership gives you access to competitive pricing, account management, and exclusive offers.`,
    },
    {
      question: `Can I get support from a local account manager?`,
      answer: `Yes, all ${sectorName} members have access to a dedicated local account manager who understands your business needs. They can help with ordering, product recommendations, and any questions you may have.`,
    },
    {
      question: `What payment methods are accepted?`,
      answer: `We accept various payment methods including credit cards, bank transfers, and account credit terms for qualifying businesses. Payment terms can be discussed with your account manager.`,
    },
  ];

  const displayFaqs = faqs && faqs.length > 0 ? faqs : defaultFaqs;

  // Convert SectorFAQ format to FAQItem format expected by FAQAccordion
  const faqItems = displayFaqs.map((faq) => ({
    question: faq.question,
    answer: faq.answer,
    category: "general" as const,
  }));

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Common questions from {sectorName} businesses
          </p>
        </div>

        <FAQAccordion faqs={faqItems} />
      </div>
    </section>
  );
}

