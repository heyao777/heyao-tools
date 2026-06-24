import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ className = "", variant = "primary", children, ...props }: ButtonProps) {
  const variants = {
    primary: "bg-[#0F3D3E] text-white hover:bg-[#1E6F5C] border-[#0F3D3E]",
    secondary: "bg-white text-[#0F3D3E] hover:bg-[#E0F2F1] border-[#B6D8D2]",
    ghost: "bg-transparent text-[#334155] hover:bg-[#F1F5F9] border-transparent",
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-md border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
