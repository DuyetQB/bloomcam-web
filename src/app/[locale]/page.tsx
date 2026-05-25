import { setRequestLocale } from "next-intl/server";
import { FloatingNavbar } from "@/components/layout/floating-navbar";
import { Footer } from "@/components/layout/footer";
import { HomeJsonLd } from "@/components/seo/home-json-ld";
import { AppExperience } from "@/components/sections/app-experience";
import { AboutSection } from "@/components/sections/about-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { PreorderPricingSection } from "@/components/sections/preorder-pricing-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { GsapTextReveal } from "@/components/sections/gsap-scroll-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageEntrance } from "@/components/sections/page-entrance";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { SeoIntroSection } from "@/components/sections/seo-intro-section";
import { SocialProof } from "@/components/sections/social-proof";
import { TimelapseGallery } from "@/components/sections/timelapse-gallery";
import { UseCasesSection } from "@/components/sections/use-cases-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageEntrance>
      <HomeJsonLd locale={locale} />
      <FloatingNavbar />
      <main id="main-content">
        <HeroSection />
        <SeoIntroSection />
        <ProductShowcase />
        <GsapTextReveal>
          <AppExperience />
        </GsapTextReveal>
        <TimelapseGallery />
        <FeaturesSection />
        <HowItWorks />
        <UseCasesSection />
        <ComparisonSection />
        <PreorderPricingSection />
        <SocialProof />
        <AboutSection />
        <FaqSection />
        <FinalCTA />
      </main>
      <Footer />
    </PageEntrance>
  );
}
