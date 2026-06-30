import type { TextareaHTMLAttributes } from "react";

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`heyao-focus min-h-52 w-full resize-y rounded-2xl border border-[#D8E7E1] bg-white/90 px-4 py-3 text-sm leading-7 text-slate-900 shadow-inner shadow-slate-100/70 outline-none transition placeholder:text-slate-400 focus:border-[#0B6B5E] ${props.className ?? ""}`}
    />
  );
}
