import { createId } from "@paralleldrive/cuid2";
import { ElementNode, richTextRoot } from "@lapuertahostels/shared";
import {
  Banner,
  Brand,
  Link,
  Media,
  Page,
  Text,
} from "@lapuertahostels/payload-types";

export function plainText(text: string): Text {
  return {
    id: createId(),
    type: "plainText",
    text,
    createdAt: date,
    updatedAt: date,
  };
}

export function richText(...nodes: ElementNode[]): Text {
  return {
    id: createId(),
    type: "richText",
    richText: richTextRoot(...nodes) as unknown as Text["richText"],
    createdAt: date,
    updatedAt: date,
  };
}

export function brand(values: Partial<Brand> = {}): Brand {
  return {
    ...values,
    id: values.id ?? createId(),
    name: values.name ?? "La Puerta Hostels",
    homeLink: values.homeLink ?? internalLink("/"),
    navLinks: values.navLinks ?? [],
    logo: values.logo ?? media("logo-puerta-simple.png"),
    createdAt: date,
    updatedAt: date,
  };
}

export function media(filename: string, altText?: string): Media {
  return {
    id: createId(),
    mimeType: "image/jpeg",
    filename,
    alt: altText ?? "Puerta Aqua",
    createdAt: date,
    updatedAt: date,
  };
}

type CallToAction = NonNullable<
  (NonNullable<Page["layout"]>[number] & {
    blockType: "LeadText";
  })["cta"]
>;

export function callToAction(
  label: string,
  variant?: CallToAction["variant"],
): CallToAction {
  return {
    show: true,
    label,
    link: externalLink("http://example.com/"),
    variant: variant ?? "secondary",
  };
}

type CallToAction2 = NonNullable<Banner["cta"]>;

export function callToAction2(label: string): CallToAction2 {
  return {
    show: true,
    label,
    link: externalLink("http://example.com/"),
  };
}

type RequiredCallToAction = NonNullable<
  (NonNullable<Page["layout"]>[number] & {
    blockType: "RoomList";
  })["rooms"][number]["cta"]
>;

export function requiredCallToAction(
  label: string,
  variant?: CallToAction["variant"],
): RequiredCallToAction {
  return {
    label,
    link: externalLink("http://example.com/"),
    variant: variant ?? "secondary",
  };
}

export function internalLink(pageUrl?: string): Link {
  return {
    id: createId(),
    type: "internal",
    page: page(pageUrl ?? "/"),
    createdAt: date,
    updatedAt: date,
  };
}

export function externalLink(url: string): Link {
  return {
    id: createId(),
    type: "external",
    url,
    createdAt: date,
    updatedAt: date,
  };
}

export function page(pathname: string): Page {
  return {
    id: createId(),
    pathname,
    brand: null as unknown as Brand,
    createdAt: date,
    updatedAt: date,
  };
}

export function banner(message: string, ctaLabel?: string): Banner {
  return {
    id: createId(),
    createdAt: date,
    updatedAt: date,
    message: message ?? "Travel before 20 September and get 20% off!",
    cta: callToAction2(ctaLabel ?? "Book Now"),
  };
}

const date = new Date().toISOString();
