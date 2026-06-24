import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-[#B6D8D2] bg-[#E0F2F1] px-2.5 py-1 text-xs font-medium text-[#0F3D3E]">
      {children}
    </span>
  );
}
