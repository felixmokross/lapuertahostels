import { RichTextParagraph } from "~/common/paragraph";
import { Button } from "~/common/button";
import { Heading } from "~/common/heading";
import { NewPage, Text } from "~/payload-types";
import { cn } from "~/common/cn";
import { RichTextObject } from "~/common/rich-text";
import { PageLink } from "~/common/page-link";

export type LeadBlockProps = NonNullable<NewPage["layout"]>[number] & {
  blockType: "LeadText";
};

export function LeadTextBlock({
  heading,
  text,
  elementId,
  cta,
}: LeadBlockProps) {
  if (heading != null && typeof heading !== "object") {
    throw new Error("Invalid heading");
  }

  if (typeof text !== "object") {
    throw new Error("Invalid text");
  }

  if (cta?.show && typeof cta.label !== "object") {
    throw new Error("Invalid CTA label");
  }

  return (
    <div
      id={elementId || undefined}
      className="mx-auto mb-14 mt-12 flex max-w-4xl flex-col px-8 md:mb-36 md:mt-24 lg:px-0"
    >
      {heading && (
        <Heading as="h1" size="medium">
          {heading.text}
        </Heading>
      )}

      <RichTextParagraph
        justify
        size="extra-large"
        className={cn(heading && "mt-4 md:mt-6")}
      >
        {text.richText as unknown as RichTextObject}
      </RichTextParagraph>

      {cta?.show && (
        <Button
          as={PageLink}
          link={cta.link!}
          size="large"
          variant={cta.variant || undefined}
          className="mt-10 text-center sm:self-center md:mt-12"
        >
          {(cta.label as Text).text}
        </Button>
      )}
    </div>
  );
}
