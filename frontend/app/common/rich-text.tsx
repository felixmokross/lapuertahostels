import { ComponentType, PropsWithChildren } from "react";
import { Fragment } from "react/jsx-runtime";
import { Heading, HeadingHighlight, HeadingProps } from "~/common/heading";
import {
  Paragraph,
  ParagraphHighlight,
  ParagraphProps,
} from "~/common/paragraph";
import {
  RichTextObject,
  transformRichTextToElements,
} from "./rich-text-transform";
import { Link } from "./link";

export type RichTextProps = {
  children: RichTextObject;
  HighlightComponent?: ComponentType<PropsWithChildren>;
};

export function RichText({
  children,
  HighlightComponent = Fragment,
}: RichTextProps) {
  return children?.map((line, index, allLines) => (
    <Fragment key={index}>
      {(line.children as Record<string, unknown>[])?.map((c, j) => (
        <Fragment key={j}>
          {c.bold ? (
            <HighlightComponent>{c.text as string}</HighlightComponent>
          ) : c.type === "link" ? (
            <Link
              className="text-puerta-600 hover:text-puerta-700 hover:underline active:text-puerta-700 active:underline"
              to={c.url as string}
            >
              <RichText HighlightComponent={HighlightComponent}>
                {[c] as RichTextObject}
              </RichText>
            </Link>
          ) : (
            (c.text as string)
          )}
        </Fragment>
      ))}
      {index < allLines.length - 1 && <br />}
    </Fragment>
  ));
}

export type RichTextParagraphProps = Omit<ParagraphProps, "children"> & {
  children: RichTextObject;
};

export function RichTextParagraph({
  children,
  ...props
}: RichTextParagraphProps) {
  return (
    <Paragraph {...props}>
      <RichText HighlightComponent={ParagraphHighlight}>{children}</RichText>
    </Paragraph>
  );
}

export type RichTextParagraphGroupProps = Omit<ParagraphProps, "children"> & {
  children: RichTextObject;
};

export function RichTextParagraphGroup({
  children,
  ...props
}: RichTextParagraphGroupProps) {
  const elements = transformRichTextToElements(children);
  return elements.map((element, index) => {
    switch (element.type) {
      case "h4":
        return (
          <RichTextHeading
            as="h4"
            size="small"
            key={index}
            className="mt-6 md:mt-8"
          >
            {element.richText}
          </RichTextHeading>
        );
      case "h5":
        return (
          <RichTextHeading
            as="h5"
            size="extra-small"
            key={index}
            className="mt-6 md:mt-8"
          >
            {element.richText}
          </RichTextHeading>
        );
      case "p":
        return (
          <RichTextParagraph key={index} {...props} className="mt-2 md:mt-3">
            {element.richText}
          </RichTextParagraph>
        );
      case "ul":
        return (
          <ul>
            {element.richText[0].children.map((line, j) => (
              <li key={j} className="my-2 ms-6 list-disc">
                <RichText>{[line] as unknown as RichTextObject}</RichText>
              </li>
            ))}
          </ul>
        );
    }
  });
}

export type RichTextHeadingProps = Omit<HeadingProps, "children"> & {
  children: RichTextObject;
};

export function RichTextHeading({ children, ...props }: RichTextHeadingProps) {
  return (
    <Heading {...props}>
      <RichText HighlightComponent={HeadingHighlight}>{children}</RichText>
    </Heading>
  );
}
