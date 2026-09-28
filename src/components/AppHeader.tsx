import Link from "next/link";
import { Logo } from "./Logo";

export function AppHeader() {
  return (
    <header className="border-b border-line/70">
      <div className="wrap flex h-16 items-center justify-between">
        <Link href="/" aria-label="Makevia home" className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <Logo />
        </Link>
        <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted">
          Early preview
        </span>
      </div>
    </header>
  );
}
