import Link from "next/link";
import { Logo } from "./Logo";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#about", label: "About" },
];

const focus = "rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label="Makevia home" className={focus}>
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`${focus} hover:text-ink`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#start"
          className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper transition-colors hover:bg-ink-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Get my roadmap
        </Link>
      </div>
    </header>
  );
}
