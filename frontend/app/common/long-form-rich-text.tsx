import { Link } from "@remix-run/react";
import { PropsWithChildren } from "react";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { RichTextObject, RichText } from "./rich-text";
import { TextHighlight } from "./text-highlight";
import { useTheme } from "~/themes";
import { cn } from "./cn";

export function LongFormRichText({ content }: { content: RichTextObject }) {
  const theme = useTheme();
  return (
    <RichText
      content={content}
      elements={{
        bold: (props: PropsWithChildren) => (
          <TextHighlight variant="neutral" {...props} />
        ),
        h4: (props: PropsWithChildren) => (
          <Heading
            {...props}
            as="h4"
            size="small"
            className="mt-10 first:mt-0 md:mt-12"
          />
        ),
        h5: (props: PropsWithChildren) => (
          <Heading
            {...props}
            as="h5"
            size="extra-small"
            className="mt-8 first:mt-0 md:mt-10"
          />
        ),
        paragraph: (props: PropsWithChildren) => (
          <Paragraph {...props} justify className="mt-3 first:mt-0 md:mt-4" />
        ),
        ul: (props: PropsWithChildren) => (
          <ul
            {...props}
            className="mt-3 list-disc first:mt-0 md:mt-4 [&_ul]:list-[revert]"
          />
        ),
        ol: (props: PropsWithChildren) => (
          <ol {...props} className="mt-3 list-decimal first:mt-0 md:mt-4" />
        ),
        li: (props: PropsWithChildren) => (
          <li {...props} className="ms-6 mt-1.5 md:mt-2" />
        ),
        link: ({ href, ...props }: PropsWithChildren<{ href: string }>) => (
          <Link
            {...props}
            className={cn(
              theme.linkColors.textColor,
              theme.linkColors.hoverTextColor,
              "font-bold hover:underline",
            )}
            to={href}
          />
        ),
      }}
    />
  );
}
