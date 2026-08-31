import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedWork from "@/components/home/FeaturedWork";
import ProcessTeaser from "@/components/home/ProcessTeaser";
import HomeFaq from "@/components/home/HomeFaq";
import CtaBand from "@/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <WhyChooseUs />
      <FeaturedWork />
      <ProcessTeaser />
      <HomeFaq />
      <CtaBand />
    </>
  );
}


