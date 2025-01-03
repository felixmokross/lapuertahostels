import {
  ComponentType,
  createContext,
  ElementType,
  Fragment,
  PropsWithChildren,
  useContext,
} from "react";
import { Page } from "~/payload-types";

export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

export type RichTextProps = {
  content?: RichTextObject;
  lineBreakHandling?: LineBreakHandling;
  elements?: Partial<CustomElementConfig>;
};

type CustomElementConfig = {
  bold: ElementType;
  italic: ElementType;
  underline: ElementType;
  strikethrough: ElementType;
  code: ElementType;
  ul: ElementType;
  ol: ElementType;
  li: ElementType;
  h4: ElementType;
  h5: ElementType;
  link: ComponentType<PropsWithChildren<{ to: string }>> | "a";
  paragraph: ComponentType<PropsWithChildren<{ indent?: number }>> | "p";
  linebreak: ElementType;
};

type RichTextContextValue = {
  content: RichTextObject;
  elements: CustomElementConfig;
  lineBreakHandling: LineBreakHandling;
};

type LineBreakHandling = "line-break" | "paragraph";

const RichTextContext = createContext<RichTextContextValue | null>(null);

const defaultElements: CustomElementConfig = {
  bold: "strong",
  italic: "em",
  underline: "u",
  strikethrough: "s",
  code: "code",
  ul: "ul",
  ol: "ol",
  li: "li",
  h4: "h4",
  h5: "h5",
  link: "a",
  paragraph: "p",
  linebreak: "br",
};

function useRichTextContext() {
  const context = useContext(RichTextContext);
  if (!context) throw new Error("RichTextContext is not provided.");
  return context;
}

export function RichText({
  content,
  elements,
  lineBreakHandling = "paragraph",
}: RichTextProps) {
  if (!content) return null;
  return (
    <RichTextContext.Provider
      value={{
        content,
        elements: { ...defaultElements, ...elements },
        lineBreakHandling,
      }}
    >
      {content.root.children.map((elementNode, i) => (
        <RenderedElementNode
          key={i}
          node={elementNode}
          isLast={i === content.root.children.length - 1}
        />
      ))}
    </RichTextContext.Provider>
  );
}

function RenderedElementNode({
  node,
  isLast,
}: {
  node: ElementNode;
  isLast: boolean;
}) {
  const { elements, content } = useRichTextContext();

  const renderedChildren = node.children?.map((child, i) => (
    <RenderedNode
      key={i}
      node={child}
      isLast={i === node.children.length - 1}
    />
  ));

  switch (node.type) {
    case "paragraph":
      return (
        <Line isLast={isLast} indent={node.indent}>
          {renderedChildren}
        </Line>
      );
    case "heading":
      return <Heading node={node}>{renderedChildren}</Heading>;
    case "list":
      return <List node={node}>{renderedChildren}</List>;
    case "listitem":
      return <elements.li>{renderedChildren}</elements.li>;
    case "link": {
      const href =
        node.fields.linkType === "custom"
          ? node.fields.url
          : node.fields.doc.value.pathname;

      return elements.link === "a" ? (
        <a href={href}>{renderedChildren}</a>
      ) : (
        <elements.link to={href}>{renderedChildren}</elements.link>
      );
    }
    default:
      throw new Error(
        `Unsupported node type ${node["type"]}: ${JSON.stringify(node, null, 2)}

Rich text object: ${JSON.stringify(content, null, 2)}`,
      );
  }
}

function Heading({
  children,
  node,
}: PropsWithChildren<{ node: HeadingElementNode }>) {
  const { elements } = useRichTextContext();
  const HeadingElement = elements[node.tag];
  return <HeadingElement>{children}</HeadingElement>;
}

function List({
  children,
  node,
}: PropsWithChildren<{ node: ListElementNode }>) {
  const { elements } = useRichTextContext();
  const ListElement = elements[node.tag];
  return <ListElement>{children}</ListElement>;
}

function Line({
  children,
  isLast,
  indent,
}: PropsWithChildren<{ isLast: boolean; indent?: number }>) {
  const { elements, lineBreakHandling } = useRichTextContext();

  switch (lineBreakHandling) {
    case "line-break":
      return (
        <>
          {children}
          {!isLast && <br />}
        </>
      );
    case "paragraph":
      return elements.paragraph === "p" ? (
        <p>{children}</p>
      ) : (
        <elements.paragraph indent={indent}>{children}</elements.paragraph>
      );
  }
}

function RenderedNode({ node, isLast }: { node: Node; isLast: boolean }) {
  const { elements } = useRichTextContext();

  if (node.type === "text") {
    return <RenderedTextNode node={node} />;
  }

  if (node.type === "linebreak") {
    return <elements.linebreak />;
  }

  return <RenderedElementNode node={node} isLast={isLast} />;
}

function RenderedTextNode({ node }: { node: TextNode }) {
  const { elements } = useRichTextContext();

  let result = <RenderedTextLines text={node.text ?? ""} />;

  if (node.format & IS_BOLD) {
    result = <elements.bold>{result}</elements.bold>;
  }

  if (node.format & IS_ITALIC) {
    result = <elements.italic>{result}</elements.italic>;
  }

  if (node.format & IS_UNDERLINE) {
    result = <elements.underline>{result}</elements.underline>;
  }

  if (node.format & IS_STRIKETHROUGH) {
    result = <elements.strikethrough>{result}</elements.strikethrough>;
  }

  if (node.format & IS_CODE) {
    result = <elements.code>{result}</elements.code>;
  }

  return result;
}

function RenderedTextLines({ text }: { text: string }) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));
}

export type RichTextObject = {
  root: { type: "root"; children: ElementNode[] };
};

export type TextNode = { type: "text"; text?: string; format: number };

export type ElementNode =
  | ListItemElementNode
  | ParagraphElementNode
  | LinkElementNode
  | ListElementNode
  | HeadingElementNode;

export type Node = ElementNode | TextNode | LineBreakNode;

export type LineBreakNode = { type: "linebreak" };

type BaseElementNode = { children: Node[] };

export type ListItemElementNode = BaseElementNode & {
  type: "listitem";
};

export type ParagraphElementNode = BaseElementNode & {
  type: "paragraph";
  indent?: number;
};

export type HeadingElementNode = BaseElementNode & {
  type: "heading";
  tag: "h4" | "h5";
};

export type LinkElementNode = BaseElementNode & {
  type: "link";
  fields:
    | {
        linkType: "custom";
        url: string;
      }
    | {
        linkType: "internal";
        doc: {
          relationTo: "pages";
          value: Page;
        };
      };
};

export type ListElementNode = BaseElementNode & {
  type: "list";
  tag: "ul" | "ol";
};
