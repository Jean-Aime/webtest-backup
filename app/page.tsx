import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Hero from "@/components/Hero/Hero";
import IndustrySelector from "@/components/IndustrySelector/IndustrySelector";
import FeaturedStories from "@/components/FeaturedStories/FeaturedStories";
import VideoSection from "@/components/VideoSection/VideoSection";
import LatestInsights from "@/components/LatestInsights/LatestInsights";
import CTASection from "@/components/CTASection/CTASection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <MegaMenuHeader />
      <Hero />
      <IndustrySelector />
      <FeaturedStories />
      <VideoSection />
      <LatestInsights />
      <CTASection />
      <Footer />
    </>
  );
}
