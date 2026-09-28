import { Logo } from "./Logo";

const soon = ["Contact", "Privacy", "Terms"];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 text-muted">From idea to product.</p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <ul className="flex flex-wrap gap-x-7 gap-y-3 text-sm">
            <li>
              <a href="#about" className="rounded text-ink-soft hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                About
              </a>
            </li>
            {soon.map((label) => (
              <li key={label} className="text-muted">
                {label} <span className="text-xs opacity-70">(soon)</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted">&copy; 2026 Makevia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
