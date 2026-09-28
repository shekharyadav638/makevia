import { SectionHeading } from "./SectionHeading";
import { WaitlistForm } from "./WaitlistForm";

export function Waitlist() {
  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="py-24 md:py-32">
      <div className="wrap">
        <div className="reveal grid gap-12 rounded-[2rem] border border-line bg-surface p-6 shadow-[0_30px_80px_-50px_rgba(13,19,33,0.35)] sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-14">
          <SectionHeading id="waitlist-title" eyebrow="Early access" title="Be among the first to build with Makevia.">
            We&rsquo;re building Makevia for entrepreneurs who have an idea and want to turn it into something real.
          </SectionHeading>
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
