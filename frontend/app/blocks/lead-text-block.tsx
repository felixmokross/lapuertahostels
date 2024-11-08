import { RichTextParagraph } from "~/common/paragraph";
import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { Page } from "~/payload-types";
import { cn } from "~/common/cn";
import { RichTextObject } from "~/common/rich-text";
import { PageLink } from "~/common/page-link";

export type LeadBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "Lead";
};

export function LeadTextBlock({
  heading,
  text,
  elementId,
  cta,
}: LeadBlockProps) {
  return (
    <div
      id={elementId || undefined}
      className="mx-auto mb-14 mt-12 flex max-w-4xl flex-col px-8 md:mb-36 md:mt-24 lg:px-0"
    >
      {heading && (
        <Heading as="h1" size="medium">
          {heading}
        </Heading>
      )}

      <RichTextParagraph
        justify
        size="extra-large"
        className={cn(heading && "mt-4 md:mt-6")}
      >
        {text as RichTextObject}
      </RichTextParagraph>

      {cta?.show && (
        <Button
          as={PageLink}
          link={cta.link!}
          size="large"
          variant={cta.variant || undefined}
          className="mt-10 text-center sm:self-center md:mt-12"
        >
          {cta.link?.label}
        </Button>
      )}
    </div>
  );
}
