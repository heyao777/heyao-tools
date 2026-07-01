export type ToolUsageRecord = {
  title: string;
  href: string;
  usedAt: string;
};

const recentUsageKey = "heyao_recent_tool_usage";

function readRecords(): ToolUsageRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(recentUsageKey);
    return raw ? (JSON.parse(raw) as ToolUsageRecord[]) : [];
  } catch {
    return [];
  }
}

export function getRecentToolUsage() {
  return readRecords();
}

export function recordToolUsage(record: Omit<ToolUsageRecord, "usedAt">) {
  if (typeof window === "undefined") return;

  const nextRecord = { ...record, usedAt: new Date().toISOString() };
  const records = [nextRecord, ...readRecords().filter((item) => item.href !== record.href)].slice(0, 8);
  window.localStorage.setItem(recentUsageKey, JSON.stringify(records));
}

export function clearRecentToolUsage() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(recentUsageKey);
}
