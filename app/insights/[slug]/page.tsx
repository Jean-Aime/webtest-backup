import { DataService } from "@/lib/data";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";
import SocialShare from "@/components/SocialShare/SocialShare";
import GatedContent from "@/components/GatedContent/GatedContent";
import SocialShare from "@/components/SocialShare/SocialShare";

interface InsightPageProps {
  params: { slug: string };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const insights = await DataService.getInsights();
  const insight = insights.find(i => i.slug === params.slug);

  if (!insight) {
    notFound();
  }

  const relatedInsights = insights.filter(i => 
    i.id !== insight.id && 
    (i.industries.some(ind => insight.industries.includes(ind)) ||
     i.services.some(svc => insight.services.includes(svc)))
  ).slice(0, 3);

  return (
    <div className="min-h-screen">
      <MegaMenuHeader />
      
      <article className="py-20 pt-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded uppercase font-medium">
                {insight.type}
              </span>
              <span className="text-sm text-gray-500">{insight.readTime} min read</span>
              <span className="text-sm text-gray-500">
                {new Date(insight.publishedAt).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{insight.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{insight.excerpt}</p>
            
            <div className="flex items-center gap-4 pb-6 border-b">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-red-100 rounded-full"></div>
              <div>
                <p className="font-semibold">{insight.author.name}</p>
                <p className="text-sm text-gray-600">{insight.author.role}</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none mb-12">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-red-100 rounded-lg mb-8"></div>
            <p className="text-gray-700 leading-relaxed">{insight.content}</p>
          </div>

          {insight.gated && insight.downloadUrl && (
            <div className="mb-12">
              <GatedContent
                title={`Download: ${insight.title}`}
                description="Get the full report with detailed analysis, case studies, and actionable recommendations."
                downloadUrl={insight.downloadUrl}
                contentType="PDF Report"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {insight.topics.map((topic) => (
              <span key={topic} className="px-3 py-1 bg-gray-100 text-sm rounded-full">
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between py-6 border-t border-b">
            <SocialShare url={`/insights/${insight.slug}`} title={insight.title} />
            <a href={`/experts/${insight.author.slug}`} className="text-primary hover:underline">
              More from {insight.author.name} →
            </a>
          </div>
        </div>
      </article>

      {relatedInsights.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Related Insights</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedInsights.map((related) => (
                <a
                  key={related.id}
                  href={`/insights/${related.slug}`}
                  className="bg-white border rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded uppercase">
                      {related.type}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{related.title}</h3>
                  <p className="text-sm text-gray-600">{related.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  const insights = await DataService.getInsights();
  return insights.map((insight) => ({
    slug: insight.slug,
  }));
}