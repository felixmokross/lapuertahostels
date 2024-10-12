import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import {
  ElementNode,
  NewRichText,
  Node,
  PlainElementNode,
  TextNode,
} from "./new-rich-text";

test("Bold text node is rendered as <strong> element.", () => {
  render(
    <NewRichText
      content={[plain(text("Hello, "), bold("world"), text("!"))]}
    />,
  );

  expect(screen.getByRole("paragraph")).toHaveTextContent("Hello, world!");
  expect(screen.getByRole("strong")).toHaveTextContent("world");
});

test("Italic text node is rendered as <em> element.", () => {
  render(
    <NewRichText
      content={[plain(text("Hello, "), italic("world"), text("!"))]}
    />,
  );

  expect(screen.getByRole("paragraph")).toHaveTextContent("Hello, world!");
  expect(screen.getByRole("emphasis")).toHaveTextContent("world");
});

test("Underline text node is rendered as <u> element.", () => {
  render(
    <NewRichText
      content={[plain(text("Hello, "), underline("world"), text("!"))]}
    />,
  );

  expect(screen.getByRole("paragraph")).toHaveTextContent("Hello, world!");
  expect(screen.getByText("world")).toHaveStyle("text-decoration: underline");
});

test("Root element nodes are rendered as paragraphs.", () => {
  render(
    <NewRichText
      content={[
        plain(text("Hello, "), underline("world"), text("!")),
        plain(text("This is the next line")),
        plain(text("This is the last line")),
      ]}
    />,
  );

  const paragraphs = screen.getAllByRole("paragraph");

  expect(paragraphs).toHaveLength(3);
  expect(paragraphs[0]).toHaveTextContent("Hello, world!");
  expect(paragraphs[1]).toHaveTextContent("This is the next line");
  expect(paragraphs[2]).toHaveTextContent("This is the last line");
});

test("h4 element nodes are rendered as <h4> elements.", () => {
  render(
    <NewRichText content={[simpleElement("h4", text("Hello, world!"))]} />,
  );

  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Hello, world!",
  );
});

test("h5 element nodes are rendered as <h5> elements.", () => {
  render(
    <NewRichText content={[simpleElement("h5", text("Hello, world!"))]} />,
  );

  expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
    "Hello, world!",
  );

  screen.logTestingPlaygroundURL();
});

test("ul element nodes with li as children are rendered as <ul> and <li> elements.", () => {
  render(
    <NewRichText
      content={[
        simpleElement(
          "ul",
          simpleElement("li", text("First item")),
          simpleElement("li", text("Second item")),
          simpleElement("li", text("Third item")),
        ),
      ]}
    />,
  );

  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  expect(within(list).getByText("First item")).toBeInTheDocument();
  expect(within(list).getByText("Second item")).toBeInTheDocument();
  expect(within(list).getByText("Third item")).toBeInTheDocument();
});

test("ol element nodes with li as children are rendered as <ol> and <li> elements.", () => {
  render(
    <NewRichText
      content={[
        simpleElement(
          "ol",
          simpleElement("li", text("First item")),
          simpleElement("li", text("Second item")),
          simpleElement("li", text("Third item")),
        ),
      ]}
    />,
  );

  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
  expect(within(list).getAllByRole("listitem")).toHaveLength(3);
  expect(within(list).getByText("First item")).toBeInTheDocument();
  expect(within(list).getByText("Second item")).toBeInTheDocument();
  expect(within(list).getByText("Third item")).toBeInTheDocument();
});

test("link element nodes are rendered as <a> elements with the correct href attribute.", () => {
  render(
    <NewRichText
      content={[link("https://example.com", text("Click here!"))]}
    />,
  );

  const linkElement = screen.getByRole("link");
  expect(linkElement).toHaveTextContent("Click here!");
  expect(linkElement).toHaveAttribute("href", "https://example.com");
});

function plain(...children: Node[]): PlainElementNode {
  return { children };
}

function text(text: string): TextNode {
  return { text };
}

function bold(text: string): TextNode {
  return { text, bold: true };
}

function italic(text: string): TextNode {
  return { text, italic: true };
}

function underline(text: string): TextNode {
  return { text, underline: true };
}

function simpleElement(
  type: "h4" | "h5" | "ul" | "ol" | "li",
  ...children: Node[]
): ElementNode {
  return { type, children };
}

function link(url: string, ...children: Node[]): ElementNode {
  return { type: "link", linkType: "custom", url, children };
}
