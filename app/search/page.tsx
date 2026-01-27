"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/lib/data";
import { SearchResult } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    industry: "",
    service: "",
    region: ""
  });

  const searchTypes = [
    { value: "", label: "All Content" },
    { value: "industry", label: "Industries" },
    { value: "service", label: "Services" },
    { value: "insight", label: "Insights" },
    { value: "expert", label: "Experts" },
    { value: "office", label: "Offices" },
    { value: "career", label: "Careers" }
  ];

  useEffect(() => {
    const searchContent = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await DataService.search(query, filters);
        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchContent, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, filters]);

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">Search</h1>
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search insights, industries, services, experts..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-32">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Content Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({...filters, type: e.target.value})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  >
                    {searchTypes.map((type) => (
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
                    <option value="healthcare">Healthcare</option>
                    <option value="financial">Financial Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Region</label>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({...filters, region: e.target.value})}
                    className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                  >
                    <option value="">All Regions</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia-pacific">Asia Pacific</option>
                  </select>
                </div>

                <button
                  onClick={() => setFilters({ type: "", industry: "", service: "", region: "" })}
                  className="w-full text-sm text-primary hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching...</p>
              </div>
            )}

            {!loading && query && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {results.length} results for "{query}"
                </p>
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-6">
                {results.map((result) => (
                  <div key={result.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-all">
                    <div className="flex items-start gap-4">
                      {result.image && (
                        <img 
                          src={result.image} 
                          alt={result.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase font-medium">
                            {result.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          <a href={result.url} className="hover:text-primary transition-colors">
                            {result.title}
                          </a>
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {result.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}

            {!query && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                </svg>
                <h3 className="text-xl font-semibold mb-2">Start your search</h3>
                <p className="text-gray-600">Enter keywords to find insights, industries, services, and more</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}