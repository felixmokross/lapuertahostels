import { SerializeFrom } from "@remix-run/node";
import { ComponentType, PropsWithChildren } from "react";
import { Fragment } from "react/jsx-runtime";
import { Heading, HeadingHighlight, HeadingProps } from "~/components/heading";
import {
  Paragraph,
  ParagraphHighlight,
  ParagraphProps,
} from "~/components/paragraph";

type RichTextProps = {
  children: RichTextObject;
  HighlightComponent: ComponentType<PropsWithChildren>;
};

type RichTextObject = SerializeFrom<{
  [k: string]: unknown;
}>[];

export function RichText({ children, HighlightComponent }: RichTextProps) {
  return children.map((line, index, allLines) => (
    <Fragment key={index}>
      {(line.children as Record<string, unknown>[]).map((c, j) => (
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
  const paragraphs = groupIntoParagraphs(children);
  return paragraphs.map((paragraph, index) => (
    <RichTextParagraph {...props} key={index}>
      {paragraph}
    </RichTextParagraph>
  ));
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

function groupIntoParagraphs(richText: RichTextObject) {
  const paragraphs: RichTextObject[] = [];
  let currentParagraph: RichTextObject = [];
  for (const line of richText) {
    if (
      (line.children as Record<string, unknown>[]).length === 1 &&
      (line.children as Record<string, unknown>[])[0].text === ""
    ) {
      paragraphs.push(currentParagraph);
      currentParagraph = [];
    } else {
      currentParagraph.push(line);
    }
  }
  paragraphs.push(currentParagraph);
  return paragraphs;
}
