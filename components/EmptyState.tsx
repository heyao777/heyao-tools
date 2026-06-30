export function EmptyState({ title = "等待生成结果", description = "输入内容后点击生成，结果会显示在这里。" }) {
  return (
    <div className="heyao-soft-panel flex min-h-52 flex-col items-center justify-center rounded-2xl border-dashed p-8 text-center">
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E6F6F0] text-sm font-bold text-[#063F3A] ring-1 ring-[#BFDCD4]">河</div>
      <h3 className="text-base font-semibold text-[#07151F]">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}
