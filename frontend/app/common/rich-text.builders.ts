import { PlainElementNode, TextNode, ElementNode, Node } from "./rich-text";

export function plain(...children: Node[]): PlainElementNode {
  return { children };
}

export function text(text: string): TextNode {
  return { text };
}

export function bold(text: string): TextNode {
  return { text, bold: true };
}

export function italic(text: string): TextNode {
  return { text, italic: true };
}

export function underline(text: string): TextNode {
  return { text, underline: true };
}

export function simpleElement(
  type: "h4" | "h5" | "ul" | "ol" | "li",
  ...children: Node[]
): ElementNode {
  return { type, children };
}

export function link(url: string, ...children: Node[]): ElementNode {
  return { type: "link", linkType: "custom", url, children };
}
