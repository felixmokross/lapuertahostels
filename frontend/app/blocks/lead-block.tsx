import { RichTextObject, RichTextParagraph } from "~/common/rich-text";
import { cn } from "~/components/cn";
import { Heading } from "~/components/heading";

export type LeadBlockProps = {
  heading: string;
  text: RichTextObject;
  id?: string;
  className?: string;
};

export function LeadBlock({ heading, text, id, className }: LeadBlockProps) {
  return (
    <div id={id} className={cn("mx-auto max-w-4xl px-8 lg:px-0", className)}>
      <Heading as="h1" size="medium">
        {heading}
      </Heading>
      <RichTextParagraph justify size="extra-large" className="mt-4 md:mt-6">
        {text}
      </RichTextParagraph>
    </div>
  );
}
