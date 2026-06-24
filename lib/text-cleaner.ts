export type CleanTextResult = {
  originalCount: number;
  cleanedCount: number;
  cleanedText: string;
};

export function cleanText(input: string): CleanTextResult {
  const cleanedText = input
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trimStart())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");

  return {
    originalCount: input.length,
    cleanedCount: cleanedText.length,
    cleanedText,
  };
}
