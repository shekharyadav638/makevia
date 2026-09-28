import { ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { Categories } from "@/components/Categories";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { HowItWorks } from "@/components/HowItWorks";
import { IdeaForm } from "@/components/IdeaForm";
import { IdeaPreview } from "@/components/IdeaPreview";
import { TrustSection } from "@/components/TrustSection";

export const maxDuration = 120;

export default function Home() {
  return (
    <>
      <AppHeader />
      <main id="main">
        <section id="start" aria-labelledby="hero-title" className="relative overflow-hidden">
          <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
          <div className="wrap flex flex-col items-center pb-12 pt-16 text-center md:pb-16 md:pt-24">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Built for Indian founders</p>
            <h1
              id="hero-title"
              className="mt-5 max-w-3xl text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-balance"
            >
              What do you want to build<span className="text-accent">?</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
              Describe your product idea. Makevia maps every step from formulation to logistics, and connects you with the
              manufacturers and services to make it real.
            </p>
            <div className="mt-10 flex w-full justify-center text-left">
              <IdeaForm />
            </div>
          </div>
        </section>
        <HowItWorks />
        <IdeaPreview />
        <Features />
        <Categories />
        <TrustSection />
        <section aria-labelledby="cta-title" className="py-24 md:py-28">
          <div className="wrap flex flex-col items-center text-center">
            <h2
              id="cta-title"
              className="max-w-2xl text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-balance"
            >
              Your product is closer than you think.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-muted">Get a free roadmap for your idea in under a minute.</p>
            <a
              href="#start"
              className="group mt-9 inline-flex h-13 items-center gap-2 rounded-full bg-accent px-7 font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Get my roadmap
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
