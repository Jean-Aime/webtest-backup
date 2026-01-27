"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/lib/data";
import { Insight } from "@/lib/types";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [filteredInsights, setFilteredInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    industry: "",
    topic: "",
    region: ""
  });

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = await DataService.getInsights();
        setInsights(data);
        setFilteredInsights(data);
      } catch (error) {
        console.error("Error loading insights:", error);
      } finally {
        setLoading(false);
      }
    };
    loadInsights();
  }, []);

  useEffect(() => {
    let filtered = insights;

    if (filters.type) {
      filtered = filtered.filter(insight => insight.type === filters.type);
    }
    if (filters.industry) {
      filtered = filtered.filter(insight => insight.industries.includes(filters.industry));
    }
    if (filters.topic) {
      filtered = filtered.filter(insight => insight.topics.includes(filters.topic));
    }
    if (filters.region) {
      filtered = filtered.filter(insight => insight.regions.includes(filters.region));
    }

    setFilteredInsights(filtered);
  }, [filters, insights]);

  const contentTypes = [
    { value: "", label: "All Content" },
    { value: "article", label: "Articles" },
    { value: "report", label: "Reports" },
    { value: "case-study", label: "Case Studies" },
    { value: "video", label: "Videos" },
    { value: "podcast", label: "Podcasts" },
    { value: "webinar", label: "Webinars" }
  ];

  const featuredInsights = filteredInsights.filter(i => i.featured);
  const trendingInsights = filteredInsights.filter(i => i.trending);
  const regularInsights = filteredInsights.filter(i => !i.featured && !i.trending);

  if (loading) {
    return (
      <div className="min-h-screen">
        <MegaMenuHeader />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading insights...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Insights Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Insights & Thought Leadership</h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore our latest research, industry perspectives, and innovative solutions shaping the future of business.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
              <h3 className="font-semibold mb-4">Filter Content</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  >
                    {contentTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select
                    value={filters.industry}
                    onChange={(e) => setFilters({...filters, industry: e.target.value})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  >
                    <option value="">All Industries</option>
                    <option value="healthcare-life-sciences">Healthcare</option>
                    <option value="financial-services">Financial Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Topic</label>
                  <select
                    value={filters.topic}
                    onChange={(e) => setFilters({...filters, topic: e.target.value})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  >
                    <option value="">All Topics</option>
                    <option value="AI">AI & Technology</option>
                    <option value="Innovation">Innovation</option>
                    <option value="Sustainability">Sustainability</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({ type: "", industry: "", topic: "", region: "" })}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {/* Featured Insights */}
            {featuredInsights.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Insights</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredInsights.slice(0, 2).map((insight) => (
                    <a
                      key={insight.id}
                      href={`/insights/${insight.slug}`}
                      className="group bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-100"></div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                            {insight.type}
                          </span>
                          <span className="text-xs text-gray-500">{insight.readTime} min read</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                          {insight.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{insight.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            By {insight.author.name}
                          </div>
                          <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                            Read More →
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Trending Insights */}
            {trendingInsights.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Trending Now</h2>
                <div className="grid gap-4">
                  {trendingInsights.map((insight) => (
                    <a
                      key={insight.id}
                      href={`/insights/${insight.slug}`}
                      className="group bg-white border rounded-lg p-6 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-red-100 rounded flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded uppercase font-medium">
                              Trending
                            </span>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                              {insight.type}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                            {insight.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">{insight.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                              By {insight.author.name} • {insight.readTime} min read
                            </div>
                            <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                              Read →
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* All Insights */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                All Insights ({filteredInsights.length})
              </h2>
              <div className="grid gap-6">
                {regularInsights.map((insight) => (
                  <a
                    key={insight.id}
                    href={`/insights/${insight.slug}`}
                    className="group bg-white border rounded-lg p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-red-100 rounded flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                            {insight.type}
                          </span>
                          <span className="text-xs text-gray-500">{insight.readTime} min read</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {insight.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">{insight.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            By {insight.author.name}
                          </div>
                          <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                            Read More →
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            {filteredInsights.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <h3 className="text-xl font-semibold mb-2">No insights found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more content</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}