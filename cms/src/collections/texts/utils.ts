import { Node } from "slate";

export function richTextToFullText(richText: Node[]) {
  return richText.map((n) => Node.string(n)).join(" ");
}

export function fullTextToTitle(fullText: string) {
  return fullText.length > 80 ? `${fullText.slice(0, 79).trim()}…` : fullText;
}
