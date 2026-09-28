export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 4h12v24H16a12 12 0 0 1 0-24Z" fill="currentColor" />
      <circle cx="15" cy="16" r="4.2" fill="var(--accent)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[1.35rem] font-semibold leading-none tracking-[-0.035em]">
        Make<span className="font-normal opacity-60">via</span>
      </span>
    </span>
  );
}
