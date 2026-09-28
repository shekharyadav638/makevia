import {
  ArrowRight,
  ChevronDown,
  Cog,
  FlaskConical,
  Lightbulb,
  Package,
  PackageCheck,
  Truck,
} from "lucide-react";
import { LogoMark } from "./Logo";

const services = [
  { label: "Manufacturing", icon: Cog },
  { label: "Packaging", icon: Package },
  { label: "Testing", icon: FlaskConical },
  { label: "Logistics", icon: Truck },
];

const delay = (step: number) => ({ animationDelay: `${350 + step * 140}ms` });

function Connector({ step }: { step: number }) {
  return (
    <div className="animate-rise flex justify-center py-1.5" style={delay(step)} aria-hidden="true">
      <div className="flex flex-col items-center">
        <span className="h-5 w-px bg-linear-to-b from-line to-ink/25" />
        <ChevronDown className="-mt-1.5 h-3.5 w-3.5 text-ink/35" />
      </div>
    </div>
  );
}

function ProductFlow() {
  return (
    <figure className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent-soft/40 blur-2xl" aria-hidden="true" />
      <div className="rounded-[1.75rem] border border-line bg-surface/80 p-4 shadow-[0_1px_0_rgba(13,19,33,0.04),0_24px_60px_-28px_rgba(13,19,33,0.25)] backdrop-blur-sm sm:p-6">
        <div className="animate-rise flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3.5" style={delay(0)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface text-ink-soft ring-1 ring-line">
            <Lightbulb className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">Your idea</p>
            <p className="truncate text-[0.95rem] text-ink">&ldquo;A protein chips brand&rdquo;</p>
          </div>
        </div>

        <Connector step={1} />

        <div className="animate-rise flex items-center gap-3 rounded-2xl bg-ink px-4 py-3.5 text-paper" style={delay(2)}>
          <LogoMark className="h-8 w-8 shrink-0 text-paper" />
          <div>
            <p className="font-semibold tracking-tight">Makevia</p>
            <p className="text-sm text-paper/60">Maps what your product needs</p>
          </div>
        </div>

        <Connector step={3} />

        <ul className="grid grid-cols-2 gap-2">
          {services.map(({ label, icon: Icon }, i) => (
            <li
              key={label}
              className="animate-rise flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-3 text-sm text-ink-soft"
              style={delay(4 + i * 0.6)}
            >
              <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <Connector step={7} />

        <div className="animate-rise flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent-soft px-4 py-3.5" style={delay(8)}>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-white">
            <PackageCheck className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-accent-strong">Your product</p>
            <p className="text-[0.95rem] text-ink">Ready for the shelf</p>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        How Makevia works: your idea goes to Makevia, which maps the manufacturing, packaging, testing and logistics you need, resulting in your product.
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 md:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          <p className="animate-rise inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-ink-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Coming soon · Built for Indian founders
          </p>
          <h1
            id="hero-title"
            className="animate-rise mt-7 text-[clamp(3.1rem,9vw,6.25rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-balance"
            style={{ animationDelay: "80ms" }}
          >
            From idea to product<span className="text-accent">.</span>
          </h1>
          <p
            className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-muted text-pretty sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Have a product idea but don&rsquo;t know where to start? Makevia will help you find verified manufacturers, suppliers, and packaging, testing and logistics services in India to turn your idea into a real product.
          </p>
          <div
            className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "240ms" }}
          >
            <a
              href="#waitlist"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-accent px-7 font-medium text-white shadow-[0_8px_24px_-10px_rgba(194,70,15,0.7)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Join the Waitlist
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex h-13 items-center justify-center rounded-full border border-line bg-surface/60 px-7 font-medium text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              See How It Works
            </a>
          </div>
        </div>
        <ProductFlow />
      </div>
    </section>
  );
}
