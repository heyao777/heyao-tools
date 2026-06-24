import type { ReactNode } from "react";
import { Card } from "./Card";
import { CopyButton } from "./CopyButton";

export function ResultCard({ title, children, copyText }: { title: string; children: ReactNode; copyText?: string }) {
  return (
    <Card>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold text-slate-950">{title}</h3>
        {copyText ? <CopyButton text={copyText} className="w-full sm:w-auto" /> : null}
      </div>
      <div className="text-sm leading-7 text-slate-700">{children}</div>
    </Card>
  );
}
