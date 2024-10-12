import { Heading, HeadingHighlight, HeadingProps } from "~/common/heading";
import {
  Paragraph,
  ParagraphHighlight,
  ParagraphProps,
} from "~/common/paragraph";
import { NewRichText, NewRichTextObject } from "./new-rich-text";

export type RichTextParagraphProps = Omit<ParagraphProps, "children"> & {
  children: NewRichTextObject;
};

export function RichTextParagraph({
  children,
  ...props
}: RichTextParagraphProps) {
  return (
    <Paragraph {...props}>
      <NewRichText content={children} elements={{ bold: ParagraphHighlight }} />
    </Paragraph>
  );
}

export type RichTextHeadingProps = Omit<HeadingProps, "children"> & {
  children: NewRichTextObject;
};

export function RichTextHeading({ children, ...props }: RichTextHeadingProps) {
  return (
    <Heading {...props}>
      <NewRichText
        content={children}
        elements={{
          bold: HeadingHighlight,
        }}
      />
    </Heading>
  );
}
