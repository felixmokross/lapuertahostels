import { PlainElementNode, TextNode, ElementNode, Node } from "./rich-text";

export function plain(...children: Node[]): PlainElementNode {
  return { children };
}

export function text(
  text: string,
  {
    bold,
    italic,
    underline,
    strikethrough,
    code,
  }: {
    bold?: true;
    italic?: true;
    underline?: true;
    strikethrough?: true;
    code?: true;
  } = {},
): TextNode {
  const node = { text } as TextNode;
  if (bold) node.bold = true;
  if (italic) node.italic = true;
  if (underline) node.underline = true;
  if (strikethrough) node.strikethrough = true;
  if (code) node.code = code;
  return node;
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

export function strikethrough(text: string): TextNode {
  return { text, strikethrough: true };
}

export function code(text: string): TextNode {
  return { text, code: true };
}

export function simpleElement(
  type: "h4" | "h5" | "ul" | "ol" | "li" | "indent" | "p",
  ...children: Node[]
): ElementNode {
  return { type, children };
}

export function link(url: string, ...children: Node[]): ElementNode {
  return { type: "link", linkType: "custom", url, children };
}
