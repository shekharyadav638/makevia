import { BadgeCheck, Crosshair, Footprints } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const principles = [
  { title: "Relevant", body: "Only show services and providers that fit your product.", icon: Crosshair },
  { title: "Verified", body: "We aim to validate provider information before recommending them.", icon: BadgeCheck },
  { title: "Practical", body: "Get the information you need to take the next step.", icon: Footprints },
];

export function TrustSection() {
  return (
    <section id="about" aria-labelledby="trust-title" className="bg-ink py-24 text-paper md:py-32">
      <div className="wrap">
        <div className="reveal">
          <SectionHeading id="trust-title" eyebrow="What we're building" title="Relevant. Verified. Useful." tone="dark">
            Makevia isn&rsquo;t designed to overwhelm you with thousands of random listings. Our goal is to surface providers and requirements that are relevant to what you&rsquo;re actually trying to build.
          </SectionHeading>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-paper/10 md:grid-cols-3">
          {principles.map(({ title, body, icon: Icon }) => (
            <li key={title} className="reveal bg-ink p-7 sm:p-8">
              <Icon className="h-6 w-6 text-[#f0a47f]" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-8 text-xl font-semibold tracking-tight">{title}</h3>
              <p className="mt-3 leading-relaxed text-paper/65">{body}</p>
            </li>
          ))}
        </ul>

        <p className="reveal mt-10 max-w-2xl text-paper/55">
          We&rsquo;re building our provider network carefully, one category at a time, so every recommendation is worth your time.
        </p>
      </div>
    </section>
  );
}
