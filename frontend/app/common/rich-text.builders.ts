import { NewPage } from "~/payload-types";
import {
  TextNode,
  ElementNode,
  Node,
  IS_BOLD,
  IS_ITALIC,
  IS_UNDERLINE,
  IS_STRIKETHROUGH,
  IS_CODE,
  RichTextObject,
  HeadingElementNode,
  LinkElementNode,
} from "./rich-text";

export function richTextRoot(...children: ElementNode[]): RichTextObject {
  return {
    root: { type: "root", children },
  };
}

export function text(
  text: string | undefined,
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
  const node: TextNode = { type: "text", text, format: 0 };
  if (bold) node.format += IS_BOLD;
  if (italic) node.format += IS_ITALIC;
  if (underline) node.format += IS_UNDERLINE;
  if (strikethrough) node.format += IS_STRIKETHROUGH;
  if (code) node.format += IS_CODE;
  return node;
}

export function bold(t: string): TextNode {
  return text(t, { bold: true });
}

export function italic(t: string): TextNode {
  return text(t, { italic: true });
}

export function underline(t: string): TextNode {
  return text(t, { underline: true });
}

export function strikethrough(t: string): TextNode {
  return text(t, { strikethrough: true });
}

export function code(t: string): TextNode {
  return text(t, { code: true });
}

export function simpleElement(
  type: "listitem" | "paragraph",
  ...children: Node[]
): ElementNode {
  return { type, children };
}

export function heading(
  tag: "h4" | "h5",
  ...children: Node[]
): HeadingElementNode {
  return { type: "heading", tag, children };
}

export function list(
  tag: "ul" | "ol",
  ...children: ElementNode[]
): ElementNode {
  return { type: "list", tag, children };
}

export function customUrlLink(
  url: string,
  ...children: Node[]
): LinkElementNode {
  return {
    type: "link",
    fields: { linkType: "custom", url },
    children,
  };
}

export function internalLink(
  pathname: string,
  ...children: Node[]
): LinkElementNode {
  return {
    type: "link",
    fields: {
      linkType: "internal",
      doc: {
        relationTo: "new-pages",
        value: { pathname } as NewPage,
      },
    },
    children,
  };
}
