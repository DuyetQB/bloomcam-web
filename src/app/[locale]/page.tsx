import { setRequestLocale } from "next-intl/server";
import { FloatingNavbar } from "@/components/layout/floating-navbar";
import { Footer } from "@/components/layout/footer";
import { AppExperience } from "@/components/sections/app-experience";
import { FeaturesSection } from "@/components/sections/features-section";
import { FinalCTA } from "@/components/sections/final-cta";
import { GsapTextReveal } from "@/components/sections/gsap-scroll-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageEntrance } from "@/components/sections/page-entrance";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { SocialProof } from "@/components/sections/social-proof";
import { TimelapseGallery } from "@/components/sections/timelapse-gallery";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageEntrance>
      <FloatingNavbar />
      <main>
        <HeroSection />
        <ProductShowcase />
        <GsapTextReveal>
          <AppExperience />
        </GsapTextReveal>
        <TimelapseGallery />
        <FeaturesSection />
        <HowItWorks />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </PageEntrance>
  );
}
