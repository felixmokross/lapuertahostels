import { Testimonials } from "@lapuertahostels/payload-types";
import { RichTextObject } from "@lapuertahostels/shared";
import { cn } from "~/common/cn";
import { Heading } from "~/common/heading";
import { QuoteIcon } from "~/common/icons/quote-icon";
import { Paragraph, RichTextParagraph } from "~/common/paragraph";

type TestimonialsBlockProps = Omit<
  Testimonials,
  "blockType" | "blockName" | "id"
>;

export function TestimonialsBlock({
  heading,
  supportingText,
  items,
}: TestimonialsBlockProps) {
  return (
    <div className="mx-8 my-24 lg:mx-auto lg:max-w-6xl">
      {heading && (
        <Heading as="h3" size="medium" className="lg:text-center">
          {heading}
        </Heading>
      )}
      {supportingText && (
        <RichTextParagraph
          size="extra-large"
          className={cn("lg:text-center", heading && "mt-6")}
        >
          {supportingText as unknown as RichTextObject}
        </RichTextParagraph>
      )}
      <div
        className={cn(
          "flex flex-col justify-evenly gap-16 lg:flex-row lg:flex-wrap lg:gap-12 xl:gap-20",
          (heading || supportingText) && "mt-20",
        )}
      >
        {items?.map((item) => (
          <blockquote
            key={item.id}
            className={cn("flex grow gap-8 lg:flex-col", {
              "lg:max-w-xl": items.length === 1,
              "lg:max-w-lg": items.length === 2,
              "lg:max-w-xs": items.length >= 3,
            })}
          >
            <div className="shrink-0 text-8xl">
              <QuoteIcon className={cn("size-5 text-neutral-300")} />
            </div>
            <div className="space-y-4">
              <Paragraph size="extra-large">{item.text}</Paragraph>
              <Paragraph size="extra-large" className="font-bold">
                {item.author}
              </Paragraph>
            </div>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
