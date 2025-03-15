import { RichTextParagraph } from "~/common/paragraph";
import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { Page, RichTextObject } from "@lapuertahostels/shared";
import { cn } from "~/common/cn";
import { PageLink } from "~/common/page-link";
import { gracefully } from "~/common/utils";

export type LeadBlockProps = NonNullable<Page["layout"]>[number] & {
  blockType: "LeadText";
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
      className="mx-auto mt-12 mb-14 flex max-w-4xl flex-col px-8 md:mt-24 md:mb-36 lg:px-0"
    >
      {heading && (
        <Heading as="h3" size="medium">
          {gracefully(heading, "text")}
        </Heading>
      )}

      <RichTextParagraph
        justify
        size="extra-large"
        className={cn(heading && "mt-4 md:mt-6")}
      >
        {gracefully(text, "richText") as RichTextObject | undefined}
      </RichTextParagraph>

      {cta?.show && (
        <Button
          as={PageLink}
          link={cta.link}
          size="large"
          variant={cta.variant || undefined}
          className="mt-10 text-center sm:self-center md:mt-12"
        >
          {gracefully(cta.label, "text")}
        </Button>
      )}
    </div>
  );
}
