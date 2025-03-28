import { createId } from "@paralleldrive/cuid2";
import {
  Banner,
  Brand,
  ElementNode,
  Link,
  Media,
  Page,
  Text,
  richTextRoot,
} from "@lapuertahostels/shared";

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
    alt: plainText(altText ?? "Puerta Aqua"),
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
    label: plainText(label),
    link: externalLink("http://example.com/"),
    variant: variant ?? "secondary",
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
    label: plainText(label),
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
    name: "Discount before 20 September",
    message: plainText(
      message ?? "Travel before 20 September and get 20% off!",
    ),
    cta: callToAction(ctaLabel ?? "Book Now"),
  };
}

const date = new Date().toISOString();
