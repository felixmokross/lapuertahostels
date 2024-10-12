import {
  ComponentType,
  createContext,
  ElementType,
  PropsWithChildren,
  useContext,
} from "react";

export type NewRichTextProps = {
  content: NewRichTextObject;
  lineBreakHandling?: LineBreakHandling;
  elements?: Partial<CustomElementConfig>;
};

type CustomElementConfig = {
  bold: ElementType;
  italic: ElementType;
  underline: ElementType;
  ul: ElementType;
  ol: ElementType;
  li: ElementType;
  h4: ElementType;
  h5: ElementType;
  link: ComponentType<{ href: string }> | "a";
  paragraph: ElementType;
};

type NewRichTextContextValue = {
  elements: CustomElementConfig;
  lineBreakHandling: LineBreakHandling;
};

type LineBreakHandling = "line-break" | "paragraph";

const NewRichTextContext = createContext<NewRichTextContextValue | null>(null);

const defaultElements: CustomElementConfig = {
  bold: "strong",
  italic: "em",
  underline: "u",
  ul: "ul",
  ol: "ol",
  li: "li",
  h4: "h4",
  h5: "h5",
  link: "a",
  paragraph: "p",
};

function useNewRichTextContext() {
  const context = useContext(NewRichTextContext);
  if (!context) throw new Error("NewRichTextContext is not provided.");
  return context;
}

export function NewRichText({
  content,
  elements,
  lineBreakHandling = "paragraph",
}: NewRichTextProps) {
  return (
    <NewRichTextContext.Provider
      value={{
        elements: { ...defaultElements, ...elements },
        lineBreakHandling,
      }}
    >
      {content.map((elementNode, i) => (
        <RenderedElementNode
          key={i}
          node={elementNode}
          isLast={i === content.length - 1}
        />
      ))}
    </NewRichTextContext.Provider>
  );
}

function RenderedElementNode({
  node,
  isLast,
}: {
  node: ElementNode;
  isLast: boolean;
}) {
  const { elements } = useNewRichTextContext();
  const renderedChildren = node.children.map((child, i) => (
    <RenderedNode
      key={i}
      node={child}
      isLast={i === node.children.length - 1}
    />
  ));

  if (!("type" in node)) {
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
  const { elements, lineBreakHandling } = useNewRichTextContext();

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
  const { elements } = useNewRichTextContext();

  if (node.bold) {
    return <elements.bold>{node.text}</elements.bold>;
  }
  if (node.italic) {
    return <elements.italic>{node.text}</elements.italic>;
  }
  if (node.underline) {
    return <elements.underline>{node.text}</elements.underline>;
  }
  return <>{node.text}</>;
}

export type NewRichTextObject = ElementNode[];

export type TextNode = { text: string } & { [key in LeafType]?: boolean };

export type LeafType = "bold" | "italic" | "underline";

export type ElementNode =
  | PlainElementNode
  | SimpleElementNode
  | LinkElementNode;

export type Node = ElementNode | TextNode;

type BaseElementNode = { children: Node[] };

export type PlainElementNode = BaseElementNode & { type?: never };
export type SimpleElementNode = BaseElementNode & {
  type: "h4" | "h5" | "ul" | "ol" | "li";
};
export type LinkElementNode = BaseElementNode & {
  type: "link";
  linkType: "custom";
  url: string;
};
