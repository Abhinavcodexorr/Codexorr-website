import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreviewSection } from "@/components/home/ServicesPreviewSection";
import { AboutSnippetSection } from "@/components/home/AboutSnippetSection";
import { TechStackSection } from "@/components/home/TechStackSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesPreviewSection />
      <AboutSnippetSection />
      <TechStackSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
