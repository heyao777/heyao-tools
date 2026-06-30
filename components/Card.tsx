import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`heyao-surface rounded-2xl p-5 sm:p-6 ${className}`}>{children}</section>;
}
