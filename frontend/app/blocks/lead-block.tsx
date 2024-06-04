import { RichTextParagraph } from "~/common/rich-text";
import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { Link } from "~/common/link";
import { Page } from "~/payload-types";

export type LeadBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "Lead";
};

export function LeadBlock({ heading, text, elementId, cta }: LeadBlockProps) {
  return (
    <div
      id={elementId || undefined}
      className="mx-auto mb-14 mt-12 flex max-w-4xl flex-col px-8 md:mb-36 md:mt-24 lg:px-0"
    >
      <Heading as="h1" size="medium">
        {heading}
      </Heading>
      <RichTextParagraph justify size="extra-large" className="mt-4 md:mt-6">
        {text}
      </RichTextParagraph>
      {cta?.show && (
        <Button
          as={Link}
          to={cta.url!}
          size="large"
          variant={cta.variant || undefined}
          className="mt-10 text-center sm:self-center md:mt-12"
        >
          {cta.text}
        </Button>
      )}
    </div>
  );
}
