export type CleanRule =
  | "spaces"
  | "blankLines"
  | "markdown"
  | "emoji"
  | "aiPhrases"
  | "symbols";

export type TextCleanOptions = {
  removeChineseInnerSpaces?: boolean;
  conservativeSymbols?: boolean;
};

export type CleanTextStats = {
  originalCount: number;
  cleanedCount: number;
  reducedCount: number;
  removedSpaces: number;
  removedBlankLines: number;
  removedSymbols: number;
};

export type CleanTextResult = {
  originalCount: number;
  cleanedCount: number;
  cleanedText: string;
  stats: CleanTextStats;
};

type MutableStats = Omit<CleanTextStats, "originalCount" | "cleanedCount" | "reducedCount">;

const aiPhrases = [
  "当然可以",
  "以下是",
  "下面是",
  "我来帮你",
  "希望对你有帮助",
  "如果你需要，我还可以",
  "如果你需要,我还可以",
  "根据你的需求",
  "为你整理如下",
];

function createStats(): MutableStats {
  return {
    removedSpaces: 0,
    removedBlankLines: 0,
    removedSymbols: 0,
  };
}

function countMatches(input: string, pattern: RegExp) {
  return input.match(pattern)?.length ?? 0;
}

function countNewlines(input: string) {
  return countMatches(input, /\n/g);
}

function normalizeLineBreaks(input: string) {
  return input.replace(/\r\n?/g, "\n");
}

function cleanSpaces(input: string, stats: MutableStats, options: TextCleanOptions) {
  let text = normalizeLineBreaks(input);
  const beforeSpaceLike = countMatches(text, /[ \t]/g);

  text = text
    .split("\n")
    .map((line) => line.replace(/\t+/g, " ").trim())
    .join("\n")
    .replace(/[ ]{2,}/g, " ");

  if (options.removeChineseInnerSpaces) {
    text = text.replace(/([\u4e00-\u9fa5])\s+([\u4e00-\u9fa5])/g, "$1$2");
  }

  const afterSpaceLike = countMatches(text, /[ \t]/g);
  stats.removedSpaces += Math.max(0, beforeSpaceLike - afterSpaceLike);
  return text;
}

function cleanBlankLines(input: string, stats: MutableStats) {
  const beforeNewlines = countNewlines(input);
  const text = normalizeLineBreaks(input).replace(/\n{3,}/g, "\n\n");
  stats.removedBlankLines += Math.max(0, beforeNewlines - countNewlines(text));
  return text;
}

function cleanMarkdown(input: string, stats: MutableStats) {
  let text = normalizeLineBreaks(input);
  const beforeLength = text.length;

  text = text
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[a-zA-Z0-9_-]*\n?/g, "").replace(/```/g, ""))
    .replace(/`([^`\n]+)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*\n]+)\*/g, "$1")
    .replace(/_([^_\n]+)_/g, "$1")
    .replace(/~~([^~]+)~~/g, "$1")
    .replace(/^\s*[-*+]\s+\[(?: |x|X)\]\s*/gm, "")
    .replace(/^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/gm, "")
    .replace(/^\s*\|\s*/gm, "")
    .replace(/\s*\|\s*$/gm, "")
    .replace(/\s*\|\s*/g, " / ");

  stats.removedSymbols += Math.max(0, beforeLength - text.length);
  return text;
}

function cleanEmoji(input: string, stats: MutableStats) {
  const beforeLength = input.length;
  const text = input
    .replace(/[\u200B-\u200D\uFEFF\u2060]/g, "")
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/[ \t]{2,}/g, " ");

  stats.removedSymbols += Math.max(0, beforeLength - text.length);
  return text;
}

function cleanAiPhrases(input: string, stats: MutableStats) {
  let text = input;
  const beforeLength = text.length;

  for (const phrase of aiPhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    text = text.replace(new RegExp(`^\\s*${escaped}[，,。！!：:]?\\s*`, "gm"), "");
    text = text.replace(new RegExp(`${escaped}[，,。！!：:]?`, "g"), "");
  }

  stats.removedSymbols += Math.max(0, beforeLength - text.length);
  return text;
}

function cleanMessySymbols(input: string, stats: MutableStats, options: TextCleanOptions) {
  let text = input;
  const beforeLength = text.length;

  text = text
    .replace(/([!?！？。,.，、；;：:])\1{2,}/g, "$1$1")
    .replace(/([~\-_=+*#@%&])\1{2,}/g, "$1")
    .replace(/[「『“‘（(\[【]\s*[」』”’）)\]】]/g, "")
    .replace(/\s+([，。！？；：、])/g, "$1")
    .replace(/([（【「『“‘])\s+/g, "$1")
    .replace(/\s+([）】」』”’])/g, "$1");

  if (!options.conservativeSymbols) {
    text = text.replace(/[<>《》]{2,}/g, "");
  }

  stats.removedSymbols += Math.max(0, beforeLength - text.length);
  return text;
}

export function cleanTextWithRules(
  input: string,
  rules: CleanRule[],
  options: TextCleanOptions = {},
): CleanTextResult {
  const original = input;
  const stats = createStats();
  let cleanedText = normalizeLineBreaks(input);

  for (const rule of rules) {
    if (rule === "spaces") cleanedText = cleanSpaces(cleanedText, stats, options);
    if (rule === "blankLines") cleanedText = cleanBlankLines(cleanedText, stats);
    if (rule === "markdown") cleanedText = cleanMarkdown(cleanedText, stats);
    if (rule === "emoji") cleanedText = cleanEmoji(cleanedText, stats);
    if (rule === "aiPhrases") cleanedText = cleanAiPhrases(cleanedText, stats);
    if (rule === "symbols") cleanedText = cleanMessySymbols(cleanedText, stats, options);
  }

  const finalText = cleanBlankLines(cleanSpaces(cleanedText.trim(), stats, options), stats);
  const originalCount = original.length;
  const cleanedCount = finalText.length;

  return {
    originalCount,
    cleanedCount,
    cleanedText: finalText,
    stats: {
      originalCount,
      cleanedCount,
      reducedCount: Math.max(0, originalCount - cleanedCount),
      ...stats,
    },
  };
}

export function cleanText(input: string): CleanTextResult {
  return cleanTextWithRules(input, ["spaces", "blankLines"], {
    removeChineseInnerSpaces: false,
    conservativeSymbols: true,
  });
}
