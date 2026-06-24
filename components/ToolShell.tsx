import type { ReactNode } from "react";
import { Badge } from "./Badge";

export function ToolShell({
  title,
  description,
  badge,
  input,
  result,
}: {
  title: string;
  description: string;
  badge: string;
  input: ReactNode;
  result: ReactNode;
}) {
  return (
    <main className="bg-[#F8FAF7]">
      <section className="mx-auto max-w-[1200px] px-5 py-10">
        <div className="mb-8 max-w-3xl">
          <Badge>{badge}</Badge>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
          {input}
          {result}
        </div>
      </section>
    </main>
  );
}
