import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: ReactNode }) {
  return (
    <div className="mb-6 max-w-3xl">
      {eyebrow ? <p className="mb-2 text-sm font-semibold text-[#0B6B5E]">{eyebrow}</p> : null}
      <h2 className="text-2xl font-bold tracking-tight text-[#07151F] sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}
