"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/tools";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[#D8E7E1] bg-white/88 shadow-[0_12px_30px_rgba(6,63,58,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-3 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0B6B5E] to-[#063F3A] text-lg font-bold text-white shadow-[0_12px_24px_rgba(6,63,58,0.24)] transition group-hover:-translate-y-0.5">
            河
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-[#07151F]">河妖 HeYao Tools</span>
            <span className="block text-sm text-slate-500">中文 AI 效率工具箱</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm text-slate-600 lg:justify-end">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-xl px-3 py-2 font-medium transition hover:bg-[#E6F6F0] hover:text-[#063F3A] ${
                  active ? "bg-[#E6F6F0] text-[#063F3A]" : ""
                }`}
              >
                {item.label}
                {active ? <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#0B6B5E]" /> : null}
              </Link>
            );
          })}
          <Link
            href="/#tools"
            className="ml-0 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#063F3A] px-4 py-2 font-semibold text-white shadow-[0_12px_24px_rgba(6,63,58,0.18)] transition hover:bg-[#0B6B5E] lg:ml-2"
          >
            打开工具箱
          </Link>
        </nav>
      </div>
    </header>
  );
}
