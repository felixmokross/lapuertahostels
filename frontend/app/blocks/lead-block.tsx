import { RichTextObject, RichTextParagraph } from "~/common/rich-text";
import { Heading } from "~/components/heading";

export type LeadBlockProps = {
  heading: string;
  text: RichTextObject;
  id?: string;
};

export function LeadBlock({ heading, text, id }: LeadBlockProps) {
  return (
    <div
      id={id}
      className="mx-auto mb-14 mt-12 max-w-4xl px-8 md:mb-36 md:mt-24 lg:px-0"
    >
      <Heading as="h1" size="medium">
        {heading}
      </Heading>
      <RichTextParagraph justify size="extra-large" className="mt-4 md:mt-6">
        {text}
      </RichTextParagraph>
    </div>
  );
}
