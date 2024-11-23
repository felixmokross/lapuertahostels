import {
  ComponentType,
  createContext,
  ElementType,
  Fragment,
  PropsWithChildren,
  useContext,
} from "react";

export type RichTextProps = {
  content: RichTextObject;
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
  link: ComponentType<{ href: string }> | "a";
  paragraph: ElementType;
};

type RichTextContextValue = {
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
  return <>Rich Text not implemented</>;
  // return (
  //   <RichTextContext.Provider
  //     value={{
  //       elements: { ...defaultElements, ...elements },
  //       lineBreakHandling,
  //     }}
  //   >
  //     {content.map((elementNode, i) => (
  //       <RenderedElementNode
  //         key={i}
  //         node={elementNode}
  //         isLast={i === content.length - 1}
  //       />
  //     ))}
  //   </RichTextContext.Provider>
  // );
}

function RenderedElementNode({
  node,
  isLast,
}: {
  node: ElementNode;
  isLast: boolean;
}) {
  const { elements } = useRichTextContext();
  const renderedChildren = node.children.map((child, i) => (
    <RenderedNode
      key={i}
      node={child}
      isLast={i === node.children.length - 1}
    />
  ));

  if (!("type" in node) || node.type === "p") {
    return <Line isLast={isLast}>{renderedChildren}</Line>;
  }

  switch (node.type) {
    case "h4":
      return <elements.h4>{renderedChildren}</elements.h4>;
    case "h5":
      return <elements.h5>{renderedChildren}</elements.h5>;
    case "ul":
      return <elements.ul>{renderedChildren}</elements.ul>;
    case "ol":
      return <elements.ol>{renderedChildren}</elements.ol>;
    case "li":
      return <elements.li>{renderedChildren}</elements.li>;
    case "link":
      return <elements.link href={node.url}>{renderedChildren}</elements.link>;
  }
}

function Line({ children, isLast }: PropsWithChildren<{ isLast: boolean }>) {
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
      return <elements.paragraph>{children}</elements.paragraph>;
  }
}

function RenderedNode({ node, isLast }: { node: Node; isLast: boolean }) {
  if ("text" in node) {
    return <RenderedTextNode node={node} />;
  }

  return <RenderedElementNode node={node} isLast={isLast} />;
}

function RenderedTextNode({ node }: { node: TextNode }) {
  const { elements } = useRichTextContext();

  let result = <RenderedTextLines text={node.text} />;

  if (node.bold) {
    result = <elements.bold>{result}</elements.bold>;
  }

  if (node.italic) {
    result = <elements.italic>{result}</elements.italic>;
  }

  if (node.underline) {
    result = <elements.underline>{result}</elements.underline>;
  }

  if (node.strikethrough) {
    result = <elements.strikethrough>{result}</elements.strikethrough>;
  }

  if (node.code) {
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

export type RichTextObject = ElementNode[];

export type TextNode = { text: string } & { [key in LeafType]?: boolean };

export type LeafType =
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code";

export type ElementNode =
  | PlainElementNode
  | SimpleElementNode
  | LinkElementNode;

export type Node = ElementNode | TextNode;

type BaseElementNode = { children: Node[] };

export type PlainElementNode = BaseElementNode & { type?: never };
export type SimpleElementNode = BaseElementNode & {
  type: "h4" | "h5" | "ul" | "ol" | "li" | "indent" | "p";
};
export type LinkElementNode = BaseElementNode & {
  type: "link";
  linkType: "custom";
  url: string;
};
