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

export type RichTextProps = {
  children: RichTextObject;
  HighlightComponent: ComponentType<PropsWithChildren>;
};

export function RichText({ children, HighlightComponent }: RichTextProps) {
  return children?.map((line, index, allLines) => (
    <Fragment key={index}>
      {(line.children as Record<string, unknown>[])?.map((c, j) => (
        <Fragment key={j}>
          {c.bold ? (
            <HighlightComponent>{c.text as string}</HighlightComponent>
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
          <RichTextHeading as="h4" size="small" key={index}>
            {element.richText}
          </RichTextHeading>
        );
      case "h5":
        return (
          <RichTextHeading as="h5" size="extra-small" key={index}>
            {element.richText}
          </RichTextHeading>
        );
      case "p":
        return (
          <RichTextParagraph key={index} {...props}>
            {element.richText}
          </RichTextParagraph>
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
