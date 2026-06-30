import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#BFDCD4] bg-[#E6F6F0] px-3 py-1 text-xs font-semibold text-[#063F3A] shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-[#0B6B5E]" />
      {children}
    </span>
  );
}
