"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function CustomerFeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    postcode: "",
    email: "",
    telephone: "",
    subject: "",
    message: "",
    wantsToParticipate: false,
    participationDetails: "",
  });
  const [showPrototypeMessage, setShowPrototypeMessage] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPrototypeMessage(true);
  };

  const remainingChars = 400 - formData.participationDetails.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Customer Feedback</h1>
        
        <p className="text-gray-700 mb-8">
          Please enter your message and contact details in the boxes provided.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Your Postcode (Optional) */}
          <div>
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-900 mb-2">
              Your Postcode <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Your E-mail address */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
              Your E-mail address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Contact Telephone */}
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-900 mb-2">
              Contact Telephone
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Message Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
              Message Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
            />
          </div>

          {/* Help us improve your shopping experience! */}
          <div className="bg-gray-100 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Help us improve your shopping experience!</h2>
            
            <div>
              <p className="text-gray-700 mb-4">
                We&apos;re looking for ways to make your shopping experience better. Would you be interested in participating in a research study to share your thoughts and feedback?
              </p>
              <p className="text-gray-700 mb-4">
                If yes, please provide your contact details (telephone and or email) below and one of our team will be in touch.
              </p>
            </div>

            <div>
              <label htmlFor="participationDetails" className="block text-sm font-medium text-gray-900 mb-2">
                Maximum 400 characters <span className="text-gray-500">({remainingChars} remaining)</span>
              </label>
              <textarea
                id="participationDetails"
                name="participationDetails"
                value={formData.participationDetails}
                onChange={handleChange}
                maxLength={400}
                rows={4}
                placeholder="Please fill your answer here"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
              />
            </div>
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

