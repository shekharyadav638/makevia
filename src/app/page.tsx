import { Categories } from "@/components/Categories";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { IdeaPreview } from "@/components/IdeaPreview";
import { Navbar } from "@/components/Navbar";
import { TrustSection } from "@/components/TrustSection";
import { Waitlist } from "@/components/Waitlist";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <IdeaPreview />
        <HowItWorks />
        <Categories />
        <TrustSection />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
