import { Armchair, ArrowRight, Cookie, Droplets, Pill, ShoppingBag } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const categories = [
  { title: "Food & Beverage", body: "Protein snacks, beverages, packaged foods", icon: Cookie },
  { title: "Skincare & Beauty", body: "Serums, creams, cosmetics", icon: Droplets },
  { title: "Supplements", body: "Protein, vitamins, wellness products", icon: Pill },
  { title: "Furniture", body: "Desks, chairs, custom furniture", icon: Armchair },
  { title: "Consumer Products", body: "Bottles, accessories, packaging, household products", icon: ShoppingBag },
];

const card = "reveal rounded-2xl border border-line p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(13,19,33,0.3)]";

export function Categories() {
  return (
    <section aria-labelledby="categories-title" className="border-t border-line bg-surface py-24 md:py-32">
      <div className="wrap">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="categories-title" eyebrow="Examples" title="Whatever you want to build.">
            Makevia is being built for entrepreneurs across industries.
          </SectionHeading>
          <p className="max-w-xs text-sm text-muted md:text-right">
            Categories we&rsquo;re exploring first. They&rsquo;ll open up gradually as we launch.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, body, icon: Icon }) => (
            <li key={title} className={`${card} bg-paper hover:border-ink/20`}>
              <Icon className="h-6 w-6 text-accent" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-8 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-muted">{body}</p>
            </li>
          ))}
          <li className={`${card} flex flex-col justify-between border-dashed bg-surface hover:border-accent/40`}>
            <p className="text-lg font-semibold tracking-tight">Something else in mind?</p>
            <a
              href="#waitlist"
              className="group mt-8 inline-flex items-center gap-2 self-start rounded font-medium text-accent hover:text-accent-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Tell us what you&rsquo;re building
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
