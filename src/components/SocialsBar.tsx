import { socials } from "@/data/socials";

export function SocialsBar() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-16 sm:px-10">
      <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--amber-dim)]">
        Links
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[var(--parchment)]">
        Find me elsewhere
      </h2>
      <ul className="mt-8 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
        {socials.map((s) => (
          <li key={s.id} className="bg-[var(--ink)]">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-baseline justify-between gap-4 px-5 py-4 transition hover:bg-[var(--ink-2)]"
            >
              <span className="font-[family-name:var(--font-display)] text-lg text-[var(--parchment)]">
                {s.label}
              </span>
              <span className="font-mono text-xs text-[var(--parchment-dim)]">
                {s.handle}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
