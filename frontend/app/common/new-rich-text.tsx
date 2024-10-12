export type NewRichTextProps = {
  content: NewRichTextObject;
};

export function NewRichText({ content }: NewRichTextProps) {
  return content.map((elementNode, i) => (
    <RenderedElementNode key={i} node={elementNode} />
  ));
}

function RenderedElementNode({ node }: { node: ElementNode }) {
  const renderedChildren = node.children.map((child, i) => (
    <RenderedNode key={i} node={child} />
  ));

  if (!("type" in node)) {
    return <p>{renderedChildren}</p>;
  }

  switch (node.type) {
    case "h4":
      return <h4>{renderedChildren}</h4>;
    case "h5":
      return <h5>{renderedChildren}</h5>;
    case "ul":
      return <ul>{renderedChildren}</ul>;
    case "ol":
      return <ol>{renderedChildren}</ol>;
    case "li":
      return <li>{renderedChildren}</li>;
    case "link":
      return <a href={node.url}>{renderedChildren}</a>;
  }
}

function RenderedNode({ node }: { node: Node }) {
  if ("text" in node) {
    return <RenderedTextNode node={node} />;
  }

  return <RenderedElementNode node={node} />;
}

function RenderedTextNode({ node }: { node: TextNode }) {
  if (node.bold) {
    return <strong>{node.text}</strong>;
  }
  if (node.italic) {
    return <em>{node.text}</em>;
  }
  if (node.underline) {
    return <u>{node.text}</u>;
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
