"use client";

import { useState } from "react";
import { Button } from "./Button";

export function CopyButton({
  text,
  className = "",
  idleLabel = "复制",
}: {
  text: string;
  className?: string;
  idleLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="secondary" onClick={handleCopy} disabled={!text} className={className}>
      {copied ? "已复制" : idleLabel}
    </Button>
  );
}
