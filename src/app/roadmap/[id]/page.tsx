import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Clock, ExternalLink, IndianRupee, MapPin } from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { MatchRequestForm } from "@/components/MatchRequestForm";
import { db } from "@/lib/supabase";
import { CATEGORIES, groupProviders, SERVICES, type Provider, type Roadmap, type Service } from "@/lib/roadmap";

export const metadata: Metadata = {
  title: "Your product roadmap — Makevia",
  robots: { index: false, follow: false },
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type IdeaRow = { id: string; idea: string; category: keyof typeof CATEGORIES; roadmap: Roadmap };

async function loadProviders(services: Service[], category: string): Promise<Provider[]> {
  if (!services.length) return [];
  const query = new URLSearchParams({
    select: "id,name,service,city,state,description,website,verified",
    published: "eq.true",
    service: `in.(${services.join(",")})`,
    or: `(categories.cs.{${category}},categories.eq.{})`,
    order: "verified.desc,name.asc",
  });
  return (await db(`providers?${query}`)).json();
}

export default async function RoadmapPage({ params }: PageProps<"/roadmap/[id]">) {
  const { id } = await params;
  if (!UUID_RE.test(id)) notFound();

  const [row]: IdeaRow[] = await (await db(`ideas?select=id,idea,category,roadmap&id=eq.${id}`)).json();
  if (!row) notFound();

  const { roadmap } = row;
  const services = [...new Set(roadmap.steps.map((s) => s.service))].filter((s): s is Service => s !== "none");
  const providers = groupProviders(await loadProviders(services, row.category));

  return (
    <>
      <AppHeader />
      <main id="main" className="wrap max-w-4xl py-12 md:py-16">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Start another idea
        </Link>

        <header className="mt-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{CATEGORIES[row.category]}</p>
          <h1 className="mt-4 text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-balance">
            {roadmap.product_name}
          </h1>
          <p className="mt-4 text-ink-soft">
            Your idea: <span className="italic">&ldquo;{row.idea}&rdquo;</span>
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">{roadmap.summary}</p>
        </header>

        <ol className="mt-12 space-y-5">
          {roadmap.steps.map((step, i) => {
            const matches = step.service === "none" ? [] : (providers[step.service] ?? []);
            return (
              <li key={i} className="rounded-2xl border border-line bg-surface p-6 md:p-7">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-ink font-mono text-sm text-paper">{i + 1}</span>
                  <h2 className="text-xl font-semibold tracking-tight">{step.title}</h2>
                  {step.service !== "none" && (
                    <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-strong">
                      {SERVICES[step.service]}
                    </span>
                  )}
                </div>
                <p className="mt-4 leading-relaxed text-ink-soft">{step.description}</p>

                {step.requirements.length > 0 && (
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-ink-soft marker:text-accent">
                    {step.requirements.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                )}

                <div className="mt-5 flex flex-wrap gap-2 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-ink-soft">
                    <IndianRupee className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    <span className="sr-only">Estimated cost:</span>
                    {step.estimated_cost}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-ink-soft">
                    <Clock className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                    <span className="sr-only">Estimated time:</span>
                    {step.estimated_time}
                  </span>
                </div>

                {step.service !== "none" && (
                  <div className="mt-6 border-t border-line pt-5">
                    <h3 className="text-sm font-medium text-ink">Providers</h3>
                    {matches.length ? (
                      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                        {matches.map((p) => (
                          <li key={p.id} className="rounded-xl border border-line bg-paper p-4">
                            <p className="flex items-center gap-1.5 font-medium text-ink">
                              {p.name}
                              {p.verified && <BadgeCheck className="h-4 w-4 text-accent" aria-label="Verified" />}
                            </p>
                            {(p.city || p.state) && (
                              <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                {[p.city, p.state].filter(Boolean).join(", ")}
                              </p>
                            )}
                            {p.description && <p className="mt-2 text-sm text-ink-soft">{p.description}</p>}
                            {p.website && /^https?:\/\//i.test(p.website) && (
                              <a
                                href={p.website}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-strong"
                              >
                                Visit website
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-2 text-sm text-muted">We&rsquo;re sourcing verified providers for this step.</p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <p className="mt-6 text-sm text-muted">
          Costs, timelines and requirements are AI-generated estimates. Confirm them with providers and the relevant
          authorities before you commit.
        </p>

        <section aria-labelledby="match-title" className="mt-12 rounded-2xl bg-ink p-7 text-paper md:p-9">
          <h2 id="match-title" className="text-2xl font-semibold tracking-tight">
            Want introductions to providers?
          </h2>
          <p className="mt-2 max-w-xl text-paper/70">
            Leave your email and we&rsquo;ll connect you with verified providers for {roadmap.product_name.toLowerCase()} as
            we onboard them.
          </p>
          <div className="mt-6">
            <MatchRequestForm ideaId={row.id} />
          </div>
        </section>
      </main>
    </>
  );
}
