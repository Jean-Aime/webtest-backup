"use client";
import { useState } from "react";

interface GatedContentProps {
  title: string;
  description: string;
  downloadUrl: string;
  contentType?: string;
}

export default function GatedContent({ title, description, downloadUrl, contentType = "PDF" }: GatedContentProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In production: Send to CRM (HubSpot, Salesforce, Mailchimp)
    const leadData = { email, name, company, content: title, timestamp: new Date() };
    console.log("Lead captured:", leadData);

    // Simulate API call
    setTimeout(() => {
      setUnlocked(true);
      setLoading(false);
      
      // Trigger download
      window.open(downloadUrl, '_blank');
    }, 1000);
  };

  if (unlocked) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
        <h3 className="text-2xl font-bold mb-2">Content Unlocked!</h3>
        <p className="text-gray-600 mb-4">Your download should start automatically.</p>
        <a 
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline font-medium"
        >
          Click here if download doesn't start
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-red-50 border border-primary/20 rounded-lg p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
            </svg>
            <span>{contentType} Download</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Work Email *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
              placeholder="john@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 border rounded-lg focus:border-primary focus:outline-none"
            placeholder="Your Company"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Unlocking..." : "Download Now"}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By downloading, you agree to receive occasional emails from JAS.COM. Unsubscribe anytime.
        </p>
      </form>
    </div>
  );
}