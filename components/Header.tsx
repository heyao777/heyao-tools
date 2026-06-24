import Link from "next/link";
import { navItems } from "@/data/tools";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0F3D3E] text-sm font-bold text-white">河</span>
          <span>
            <span className="block text-base font-bold text-slate-950">河妖 HeYao Tools</span>
            <span className="block text-xs text-slate-500">中文 AI 效率工具箱</span>
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm text-slate-600">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-md px-2.5 py-2 hover:bg-[#E0F2F1] hover:text-[#0F3D3E]">
              {item.label}
            </Link>
          ))}
          <Link href="/#tools" className="ml-0 rounded-md bg-[#0F3D3E] px-3 py-2 font-semibold text-white hover:bg-[#1E6F5C] lg:ml-2">
            打开工具箱
          </Link>
        </nav>
      </div>
    </header>
  );
}
