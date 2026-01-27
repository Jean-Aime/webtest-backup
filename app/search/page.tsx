"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<any>({ industries: [], services: [], insights: [], experts: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      performSearch();
    }
  }, [query]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalResults = results.industries.length + results.services.length + results.insights.length + results.experts.length;

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">Search</h1>
          
          <div className="mb-8">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search industries, services, insights, experts..."
              className="w-full p-4 border rounded-lg text-lg focus:border-primary focus:outline-none"
            />
          </div>

          {loading && <div className="text-center py-8">Searching...</div>}

          {!loading && query.length >= 2 && (
            <div>
              <div className="mb-6 text-gray-600">
                Found {totalResults} results for "{query}"
              </div>

              {results.industries.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Industries</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.industries.map((item: any) => (
                      <a key={item.id} href={`/industries/${item.slug}`} className="bg-white border rounded-lg p-4 hover:shadow-md transition-all">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {results.services.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Services</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.services.map((item: any) => (
                      <a key={item.id} href={`/services/${item.slug}`} className="bg-white border rounded-lg p-4 hover:shadow-md transition-all">
                        <h3 className="font-semibold mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {results.insights.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Insights</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {results.insights.map((item: any) => (
                      <a key={item.id} href={`/insights/${item.slug}`} className="bg-white border rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">{item.type}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {results.experts.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Experts</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {results.experts.map((item: any) => (
                      <a key={item.id} href={`/experts/${item.slug}`} className="bg-white border rounded-lg p-4 hover:shadow-md transition-all text-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-20 h-20 rounded-full mx-auto mb-3" />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-red-100 rounded-full mx-auto mb-3"></div>
                        )}
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.role}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {totalResults === 0 && (
                <div className="text-center py-12 text-gray-600">
                  No results found for "{query}". Try different keywords.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
