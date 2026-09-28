import { BadgeCheck, Factory, IndianRupee, Route, ShieldCheck, Zap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const features = [
  {
    title: "Idea to roadmap",
    body: "Describe your product in one line and get a step-by-step plan, from formulation to your first sellable batch.",
    icon: Route,
  },
  {
    title: "Indian compliance, built in",
    body: "See which licences and standards apply to your product, like FSSAI, CDSCO, BIS and GST, before you spend a rupee.",
    icon: ShieldCheck,
  },
  {
    title: "Cost and time estimates",
    body: "Rough budgets in ₹ and timelines for every step, so you can plan your launch with real numbers.",
    icon: IndianRupee,
  },
  {
    title: "Matched providers",
    body: "Manufacturers, packaging suppliers, testing labs and logistics partners that fit your category.",
    icon: Factory,
  },
  {
    title: "Verified network",
    body: "We check providers before they get a verified badge, and clearly label everything we haven't checked yet.",
    icon: BadgeCheck,
  },
  {
    title: "Free, no sign-up",
    body: "Get your roadmap in under a minute and share it with a link. No account needed.",
    icon: Zap,
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="border-t border-line py-24 md:py-32">
      <div className="wrap">
        <div className="reveal">
          <SectionHeading id="features-title" eyebrow="Features" title="Everything between your idea and your first batch.">
            Makevia does the research a first-time founder usually spends weeks on, and puts it on one page.
          </SectionHeading>
        </div>
        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, icon: Icon }) => (
            <li key={title} className="reveal">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
