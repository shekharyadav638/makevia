export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  tone = "light",
}: {
  id: string;
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="max-w-2xl">
      <p
        className={`font-mono text-xs uppercase tracking-[0.18em] ${
          dark ? "text-[#f0a47f]" : "text-accent"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-4 text-[clamp(2rem,4.6vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-balance"
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-5 text-lg leading-relaxed text-pretty ${
            dark ? "text-paper/70" : "text-muted"
          }`}
        >
          {children}
        </p>
      )}
    </div>
  );
}
