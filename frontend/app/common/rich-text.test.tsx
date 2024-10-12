import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { RichText } from "./rich-text";
import { PropsWithChildren } from "react";
import {
  plain,
  text,
  bold,
  italic,
  underline,
  simpleElement,
  link,
} from "./rich-text.builders";

test("Bold text node is rendered as <strong> element.", () => {
  render(
    <RichText content={[plain(text("Hello, "), bold("world"), text("!"))]} />,
  );

  expect(screen.getByRole("paragraph")).toHaveTextContent("Hello, world!");
  expect(screen.getByRole("strong")).toHaveTextContent("world");
});

test("Italic text node is rendered as <em> element.", () => {
  render(
    <RichText content={[plain(text("Hello, "), italic("world"), text("!"))]} />,
  );

  expect(screen.getByRole("paragraph")).toHaveTextContent("Hello, world!");
  expect(screen.getByRole("emphasis")).toHaveTextContent("world");
});

test("Underline text node is rendered as <u> element.", () => {
  render(
    <RichText
      content={[plain(text("Hello, "), underline("world"), text("!"))]}
    />,
  );

  expect(screen.getByRole("paragraph")).toHaveTextContent("Hello, world!");
  expect(screen.getByText("world")).toHaveStyle("text-decoration: underline");
});

test("Root element nodes are rendered as paragraphs.", () => {
  render(
    <RichText
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
  render(<RichText content={[simpleElement("h4", text("Hello, world!"))]} />);

  expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent(
    "Hello, world!",
  );
});

test("h5 element nodes are rendered as <h5> elements.", () => {
  render(<RichText content={[simpleElement("h5", text("Hello, world!"))]} />);

  expect(screen.getByRole("heading", { level: 5 })).toHaveTextContent(
    "Hello, world!",
  );

  screen.logTestingPlaygroundURL();
});

test("ul element nodes with li as children are rendered as <ul> and <li> elements.", () => {
  render(
    <RichText
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
    <RichText
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
    <RichText content={[link("https://example.com", text("Click here!"))]} />,
  );

  const linkElement = screen.getByRole("link");
  expect(linkElement).toHaveTextContent("Click here!");
  expect(linkElement).toHaveAttribute("href", "https://example.com");
});

describe("custom elements", () => {
  test("if a custom bold element is specified, it is used for bold text nodes", () => {
    function CustomHighlight({ children }: PropsWithChildren) {
      return <span data-testid="custom-highlight">{children}</span>;
    }

    render(
      <RichText
        content={[plain(bold("Hello, world!"))]}
        elements={{
          bold: CustomHighlight,
        }}
      />,
    );

    expect(screen.getByTestId("custom-highlight")).toHaveTextContent(
      "Hello, world!",
    );
  });

  test("if a custom italic element is specified, it is used for italic text nodes", () => {
    function CustomItalic({ children }: PropsWithChildren) {
      return <span data-testid="custom-italic">{children}</span>;
    }

    render(
      <RichText
        content={[plain(italic("Hello, world!"))]}
        elements={{
          italic: CustomItalic,
        }}
      />,
    );

    expect(screen.getByTestId("custom-italic")).toHaveTextContent(
      "Hello, world!",
    );
  });

  test("if a custom underline element is specified, it is used for underline text nodes", () => {
    function CustomUnderline({ children }: PropsWithChildren) {
      return <span data-testid="custom-underline">{children}</span>;
    }

    render(
      <RichText
        content={[plain(underline("Hello, world!"))]}
        elements={{
          underline: CustomUnderline,
        }}
      />,
    );

    expect(screen.getByTestId("custom-underline")).toHaveTextContent(
      "Hello, world!",
    );
  });

  test("if a custom link element is specified, it is used for link element nodes", () => {
    function CustomLink({
      children,
      href,
    }: PropsWithChildren<{ href: string }>) {
      return (
        <span data-testid="custom-link" data-href={href}>
          {children}
        </span>
      );
    }

    render(
      <RichText
        content={[link("https://example.com", text("Click here!"))]}
        elements={{
          link: CustomLink,
        }}
      />,
    );

    const linkElement = screen.getByTestId("custom-link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Click here!");
    expect(linkElement).toHaveAttribute("data-href", "https://example.com");
  });

  test("if a custom h4 element is specified, it is used for h4 element nodes", () => {
    function CustomH4({ children }: PropsWithChildren) {
      return <span data-testid="custom-h4">{children}</span>;
    }

    render(
      <RichText
        content={[simpleElement("h4", text("Hello, world!"))]}
        elements={{
          h4: CustomH4,
        }}
      />,
    );

    expect(screen.getByTestId("custom-h4")).toHaveTextContent("Hello, world!");
  });

  test("if a custom h5 element is specified, it is used for h5 element nodes", () => {
    function CustomH5({ children }: PropsWithChildren) {
      return <span data-testid="custom-h5">{children}</span>;
    }

    render(
      <RichText
        content={[simpleElement("h5", text("Hello, world!"))]}
        elements={{
          h5: CustomH5,
        }}
      />,
    );

    expect(screen.getByTestId("custom-h5")).toHaveTextContent("Hello, world!");
  });

  test("if a custom ul element is specified, it is used for ul element nodes", () => {
    function CustomUl({ children }: PropsWithChildren) {
      return <span data-testid="custom-ul">{children}</span>;
    }

    render(
      <RichText
        content={[
          simpleElement(
            "ul",
            simpleElement("li", text("First item")),
            simpleElement("li", text("Second item")),
            simpleElement("li", text("Third item")),
          ),
        ]}
        elements={{
          ul: CustomUl,
        }}
      />,
    );

    expect(screen.getByTestId("custom-ul")).toHaveTextContent(
      "First itemSecond itemThird item",
    );
  });

  test("if a custom ol element is specified, it is used for ol element nodes", () => {
    function CustomOl({ children }: PropsWithChildren) {
      return <span data-testid="custom-ol">{children}</span>;
    }

    render(
      <RichText
        content={[
          simpleElement(
            "ol",
            simpleElement("li", text("First item")),
            simpleElement("li", text("Second item")),
            simpleElement("li", text("Third item")),
          ),
        ]}
        elements={{
          ol: CustomOl,
        }}
      />,
    );

    expect(screen.getByTestId("custom-ol")).toHaveTextContent(
      "First itemSecond itemThird item",
    );
  });

  test("if a custom li element is specified, it is used for li element nodes", () => {
    function CustomLi({ children }: PropsWithChildren) {
      return <span data-testid="custom-li">{children}</span>;
    }

    render(
      <RichText
        content={[simpleElement("ul", simpleElement("li", text("First item")))]}
        elements={{
          li: CustomLi,
        }}
      />,
    );

    expect(screen.getByTestId("custom-li")).toHaveTextContent("First item");
  });

  test("if a custom paragraph element is specified, it is used for plain element nodes", () => {
    function CustomParagraph({ children }: PropsWithChildren) {
      return <span data-testid="custom-paragraph">{children}</span>;
    }

    render(
      <RichText
        content={[plain(text("Hello, world!"))]}
        elements={{
          paragraph: CustomParagraph,
        }}
      />,
    );

    expect(screen.getByTestId("custom-paragraph")).toHaveTextContent(
      "Hello, world!",
    );
  });
});

test("if lineBreakHandling is 'paragraph', each plain element node is rendered as paragraph", () => {
  render(
    <RichText
      content={[
        plain(text("Hello, world!")),
        plain(text("This is the next line")),
        plain(text("")),
        plain(text("This is the last line")),
      ]}
      lineBreakHandling="paragraph"
    />,
  );

  const paragraphs = screen.getAllByRole("paragraph");

  expect(paragraphs).toHaveLength(4);
  expect(paragraphs[0]).toHaveTextContent("Hello, world!");
  expect(paragraphs[1]).toHaveTextContent("This is the next line");
  expect(paragraphs[2]).toHaveTextContent("");
  expect(paragraphs[3]).toHaveTextContent("This is the last line");
});

test("if lineBreakHandling is 'line-break', plain element nodes at root level are separated by <br />", () => {
  const { container } = render(
    <RichText
      content={[
        plain(text("Hello, world!")),
        plain(text("This is the next line")),
        plain(text("")),
        plain(text("This is the last line")),
      ]}
      lineBreakHandling="line-break"
    />,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      Hello, world!
      <br />
      This is the next line
      <br />
      <br />
      This is the last line
    </div>
  `);
});

test("if lineBreakHandling is 'line-break', plain element nodes at deeper levels are separated by <br />", () => {
  const { container } = render(
    <RichText
      content={[
        plain(text("Hello, world!")),
        plain(text("This is the next line")),
        plain(text("")),
        plain(
          simpleElement(
            "ul",
            simpleElement(
              "li",
              plain(text("First line")),
              plain(text("")),
              plain(text("Third line")),
            ),
          ),
        ),
      ]}
      lineBreakHandling="line-break"
    />,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      Hello, world!
      <br />
      This is the next line
      <br />
      <br />
      <ul>
        <li>
          First line
          <br />
          <br />
          Third line
        </li>
      </ul>
    </div>
  `);
});
