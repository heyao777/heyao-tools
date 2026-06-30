import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ className = "", variant = "primary", children, ...props }: ButtonProps) {
  const variants = {
    primary: "border-[#063F3A] bg-[#063F3A] text-white shadow-[0_14px_30px_rgba(6,63,58,0.18)] hover:bg-[#0B6B5E]",
    secondary: "border-[#BFDCD4] bg-white/85 text-[#063F3A] hover:border-[#0B6B5E] hover:bg-[#E6F6F0]",
    ghost: "border-transparent bg-transparent text-slate-600 hover:bg-white/70 hover:text-[#063F3A]",
  };

  return (
    <button
      className={`heyao-focus inline-flex min-h-11 items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
