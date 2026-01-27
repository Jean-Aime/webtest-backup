"use client";
import { useState, useEffect } from "react";
import { DataService } from "@/lib/data";
import { Career } from "@/lib/types";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    experience: "",
    department: ""
  });

  useEffect(() => {
    const loadCareers = async () => {
      try {
        const data = await DataService.getCareers();
        setCareers(data);
        setFilteredCareers(data);
      } catch (error) {
        console.error("Error loading careers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCareers();
  }, []);

  useEffect(() => {
    let filtered = careers;

    if (filters.type) {
      filtered = filtered.filter(career => career.type === filters.type);
    }
    if (filters.location) {
      filtered = filtered.filter(career => career.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.experience) {
      filtered = filtered.filter(career => career.experience === filters.experience);
    }
    if (filters.department) {
      filtered = filtered.filter(career => career.department.toLowerCase().includes(filters.department.toLowerCase()));
    }

    setFilteredCareers(filtered);
  }, [filters, careers]);

  const careerTracks = [
    {
      title: "Students & Graduates",
      description: "Launch your consulting career with our comprehensive development programs",
      icon: "🎓",
      href: "/careers/students"
    },
    {
      title: "Experienced Professionals",
      description: "Bring your expertise to solve complex business challenges",
      icon: "💼",
      href: "/careers/professionals"
    },
    {
      title: "Internships",
      description: "Gain hands-on experience with real client projects",
      icon: "🚀",
      href: "/careers/internships"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <MegaMenuHeader />
        <div className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading opportunities...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Careers Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Build Your Career With Us</h1>
            <p className="text-xl text-gray-600 mb-8">
              Join a global team of exceptional professionals who are passionate about solving complex business challenges and driving meaningful change.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View Open Positions
              </button>
              <button className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                Life at JAS.COME
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Career Tracks */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Career Tracks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {careerTracks.map((track) => (
              <a
                key={track.title}
                href={track.href}
                className="group bg-white border rounded-lg p-8 text-center hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{track.icon}</div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  {track.title}
                </h3>
                <p className="text-gray-600 mb-6">{track.description}</p>
                <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Learn More →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg sticky top-32">
                <h3 className="font-semibold mb-4">Filter Opportunities</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Type</label>
                    <select
                      value={filters.type}
                      onChange={(e) => setFilters({...filters, type: e.target.value})}
                      className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                    >
                      <option value="">All Types</option>
                      <option value="full-time">Full-time</option>
                      <option value="internship">Internship</option>
                      <option value="graduate">Graduate Program</option>
                      <option value="student">Student Program</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      placeholder="City or country"
                      className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Experience Level</label>
                    <select
                      value={filters.experience}
                      onChange={(e) => setFilters({...filters, experience: e.target.value})}
                      className="w-full p-2 border rounded focus:border-primary focus:outline-none"
                    >
                      <option value="">All Levels</option>
                      <option value="entry">Entry Level</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior Level</option>
                      <option value="executive">Executive</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setFilters({ type: "", location: "", experience: "", department: "" })}
                    className="w-full text-sm text-primary hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Open Positions ({filteredCareers.length})</h2>
                <p className="text-gray-600">Find your next opportunity to make an impact</p>
              </div>

              <div className="space-y-4">
                {filteredCareers.map((career) => (
                  <div key={career.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{career.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                            </svg>
                            {career.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                            </svg>
                            {career.department}
                          </span>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                            {career.type.replace('-', ' ')}
                          </span>
                        </div>
                      </div>
                      <a
                        href={`/careers/${career.slug}`}
                        className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{career.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {career.requirements.slice(0, 3).map((req, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-xs rounded">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {filteredCareers.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">No positions found</h3>
                  <p className="text-gray-600">Try adjusting your filters or check back later for new opportunities</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}