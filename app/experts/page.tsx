import { prisma } from "@/lib/prisma";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

export default async function ExpertsPage() {
  const experts = await prisma.expert.findMany({
    orderBy: { featured: 'desc' }
  });

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <section className="bg-gradient-to-br from-primary/10 to-red-50 py-20 pt-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">Our Experts</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Meet our global team of industry leaders, strategic thinkers, and transformation experts who drive innovation across every sector.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experts.map((expert) => {
              const expertise = JSON.parse(expert.expertise || '[]');
              return (
                <a
                  key={expert.id}
                  href={`/experts/${expert.slug}`}
                  className="group bg-white border rounded-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  {expert.image ? (
                    <img src={expert.image} alt={expert.name} className="aspect-square object-cover" />
                  ) : (
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-red-100"></div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {expert.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">{expert.role}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{expert.bio}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expertise.slice(0, 2).map((skill: string) => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                      View Profile →
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
