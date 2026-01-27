import { DataService } from "@/lib/data";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import NewsletterSignup from "@/components/Newsletter/NewsletterSignup";

export default async function ServicesPage() {
  const services = await DataService.getServices();
  const featuredServices = services.filter(s => s.featured);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      {/* Services Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Services & Capabilities</h1>
            <p className="text-xl text-gray-600 mb-8">
              We deliver transformative solutions across strategy, operations, technology, and innovation to help organizations achieve sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Core Services</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {featuredServices.map((service) => (
              <div key={service.id} className="group">
                <a href={`/services/${service.slug}`} className="block">
                  <div className="bg-white border rounded-lg p-8 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.overview}</p>
                    
                    {service.subServices.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Key Areas:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.subServices.slice(0, 4).map((sub) => (
                            <div key={sub.id} className="text-sm text-gray-600">
                              → {sub.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                      Learn More →
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Specialized Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Digital & AI", description: "Technology-driven transformation", href: "/digital" },
              { name: "Innovation", description: "Future-focused solutions", href: "/innovation" },
              { name: "Sustainability", description: "ESG and climate strategies", href: "/sustainability" },
              { name: "Operations Excellence", description: "Operational optimization", href: "/operations" },
              { name: "M&A Strategy", description: "Merger & acquisition support", href: "/ma-strategy" },
              { name: "Change Management", description: "Organizational transformation", href: "/change-management" },
              { name: "Data & Analytics", description: "Data-driven insights", href: "/data-analytics" },
              { name: "Customer Experience", description: "CX transformation", href: "/customer-experience" }
            ].map((capability) => (
              <a
                key={capability.name}
                href={capability.href}
                className="bg-white p-6 rounded-lg hover:shadow-md transition-all group"
              >
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {capability.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{capability.description}</p>
                <div className="text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Explore →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine proven methodologies with innovative thinking to deliver measurable results
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Proven Frameworks</h3>
              <p className="text-gray-600">Battle-tested methodologies refined through thousands of engagements</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborative Approach</h3>
              <p className="text-gray-600">Working alongside your teams to build capabilities and ensure lasting impact</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Measurable Results</h3>
              <p className="text-gray-600">Data-driven solutions with clear metrics and sustainable outcomes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our services can help you achieve your strategic objectives
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Start a Conversation
            </button>
            <a href="/insights" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
              View Case Studies
            </a>
          </div>
        </div>
      </section>

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