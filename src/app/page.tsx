import { AppHeader } from "@/components/AppHeader";
import { HowItWorks } from "@/components/HowItWorks";
import { IdeaForm } from "@/components/IdeaForm";

export const maxDuration = 120;

export default function Home() {
  return (
    <>
      <AppHeader />
      <main id="main">
        <section aria-labelledby="hero-title" className="relative overflow-hidden">
          <div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
          <div className="wrap flex flex-col items-center py-20 text-center md:py-28">
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
      </main>
    </>
  );
}
