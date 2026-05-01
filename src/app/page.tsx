import { HeroSection } from "@/components/home/HeroSection";
import { TrustStripSection } from "@/components/home/TrustStripSection";
import { HomeServicesSection } from "@/components/home/HomeServicesSection";
import { WhyUsBentoSection } from "@/components/home/WhyUsBentoSection";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { HomeTechStripSection } from "@/components/home/HomeTechStripSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <HomeServicesSection />
      <WhyUsBentoSection />
      <FeaturedWorkSection />
      <HomeTechStripSection />
      <CTASection />
    </>
  );
}
