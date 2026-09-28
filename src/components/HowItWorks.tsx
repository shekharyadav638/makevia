import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    n: "01",
    title: "Tell us your idea",
    body: "Describe what you want to build in simple language.",
  },
  {
    n: "02",
    title: "Get your roadmap",
    body: "Makevia identifies the relevant steps, requirements and services needed for your product.",
  },
  {
    n: "03",
    title: "Find the right providers",
    body: "Discover relevant, verified manufacturers and service providers and connect with them directly.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-24 md:py-32">
      <div className="wrap">
        <div className="reveal">
          <SectionHeading id="how-title" eyebrow="How it works" title="You bring the idea. Makevia helps you figure out how to build it." />
        </div>
        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((s) => (
            <li key={s.n} className="reveal border-t border-ink/15 pt-7">
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
