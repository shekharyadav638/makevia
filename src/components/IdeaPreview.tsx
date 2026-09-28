import { ArrowUp, Check, Eye } from "lucide-react";
import { LogoMark } from "./Logo";
import { SectionHeading } from "./SectionHeading";

const journey = [
  { step: "Product formulation", detail: "Recipe, nutrition & shelf life" },
  { step: "Manufacturing", detail: "Contract manufacturers for snacks" },
  { step: "Packaging", detail: "Pouches, labels & printing" },
  { step: "Testing & compliance", detail: "FSSAI licensing & lab tests" },
  { step: "Logistics", detail: "Warehousing & distribution" },
];

export function IdeaPreview() {
  return (
    <section aria-labelledby="preview-title" className="border-t border-line bg-surface py-24 md:py-32">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="reveal">
          <SectionHeading id="preview-title" eyebrow="Product preview" title="Start with an idea.">
            Makevia will identify the steps you actually need and connect you with relevant, verified providers.
          </SectionHeading>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-sm text-ink-soft ring-1 ring-line">
            <Eye className="h-4 w-4 text-accent" aria-hidden="true" />
            A preview of what we&rsquo;re building. Not live yet.
          </p>
        </div>

        <figure className="reveal rounded-[1.75rem] border border-line bg-paper p-3 sm:p-4">
          <div className="rounded-[1.35rem] border border-line bg-surface p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium text-ink">
                <LogoMark className="h-5 w-5" />
                Makevia
              </span>
              <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-accent-strong">
                Preview
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-line bg-paper py-2 pl-4 pr-2">
              <p className="min-w-0 flex-1 text-[0.95rem] text-ink sm:text-base">
                &ldquo;I want to launch a protein chips brand&hellip;&rdquo;
              </p>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink text-paper" aria-hidden="true">
                <ArrowUp className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-7">
              <p className="text-xs font-medium uppercase tracking-wider text-muted">Your product journey</p>
              <ol className="mt-3 divide-y divide-line">
                {journey.map(({ step, detail }) => (
                  <li key={step} className="reveal flex items-center gap-3 py-3.5">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span className="font-medium text-ink">{step}</span>
                    <span className="ml-auto hidden text-right text-sm text-muted sm:block">{detail}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <figcaption className="px-3 pt-3 text-xs text-muted">
            Illustrative example. Actual steps will vary by product.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
