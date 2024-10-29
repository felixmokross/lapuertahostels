import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { Page } from "payload/generated-types";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const common = await payload.db.connection
    .collection<Before_Common>("globals")
    .findOne({ globalType: "common" });

  if (common.banner && common.banner.cta) {
    console.log("Migrating banner CTA");

    const migratedCta = migrateCta(common.banner.cta);
    await payload.db.connection.collection<After_Common>("globals").updateOne(
      { globalType: "common" },
      {
        $set: {
          "banner.cta": migratedCta as After_Common["banner"]["cta"],
        },
      },
    );
  }

  const pages = await payload.db.connection
    .collection<Before_Page>("pages")
    .find()
    .toArray();

  for (const page of pages.filter(
    (p) =>
      p.layout.some(
        (b) =>
          b.blockType === "WideImage" ||
          b.blockType === "Lead" ||
          b.blockType === "Features" ||
          b.blockType === "RoomList",
      ) ||
      p.hero.some(
        (b) => b.blockType === "HeroVideo" || b.blockType === "Slides",
      ),
  )) {
    console.log(`Migrating page ${page._id}`);

    for (const block of page.hero) {
      if (
        block.blockType === "HeroVideo" &&
        block.overlayTitle &&
        block.overlayTitle.cta
      ) {
        console.log(`Migrating HeroVideo CTA to ${block.overlayTitle.cta.url}`);
        block.overlayTitle.cta = migrateCta(block.overlayTitle.cta);
      }

      if (block.blockType === "Slides") {
        for (const slide of block.slides) {
          if (
            slide.overlayTitle &&
            slide.overlayTitle.cta &&
            slide.overlayTitle.cta.url
          ) {
            console.log(
              `Migrating Slides slide CTA to ${slide.overlayTitle.cta.url}`,
            );
            slide.overlayTitle.cta = migrateCta(slide.overlayTitle.cta);
          }
        }
      }
    }

    for (const block of page.layout) {
      if (
        block.blockType === "WideImage" &&
        block.overlayTextBox &&
        block.overlayTextBox.cta
      ) {
        console.log(
          `Migrating WideImage CTA to ${block.overlayTextBox.cta.url}`,
        );
        block.overlayTextBox.cta = migrateCta(block.overlayTextBox.cta);
      }

      if (block.blockType === "Lead" && block.cta && block.cta.url) {
        console.log(`Migrating Lead CTA to ${block.cta.url}`);
        block.cta = migrateCta(block.cta);
      }

      if (block.blockType === "Features") {
        for (const item of block.items) {
          if (!item.cta || !item.cta.url) continue;

          console.log(`Migrating Features item CTA to ${item.cta.url}`);
          item.cta = migrateCta(item.cta);
        }
      }

      if (block.blockType === "RoomList") {
        for (const room of block.rooms) {
          console.log(`Migrating RoomList room CTA to ${room.ctaUrl}`);
          (
            room as (After_Page["layout"][number] & {
              blockType: "RoomList";
            })["rooms"][number]
          ).cta = migrateCta({
            text: block.ctaTemplate?.text,
            url: room.ctaUrl,
            variant: block.ctaTemplate?.variant,
          });

          delete room.ctaUrl;
        }
      }
    }

    await payload.db.connection.collection<After_Page>("pages").updateOne(
      { _id: page._id },
      {
        $set: {
          hero: page.hero as After_Page["hero"],
          layout: page.layout as After_Page["layout"],
        },
      },
    );
  }
}

function migrateCta(cta: Before_Cta): After_Cta {
  let link: After_Cta["link"];
  if (isExternalUrl(cta.url)) {
    link = {
      label: cta.text!,
      type: "external",
      url: cta.url,
    };
  } else {
    const url = new URL(cta.url!, "http://dummy");
    link = {
      label: cta.text!,
      type: "internal",
      page: url.pathname.replaceAll("/", ":"),
      fragment: url.hash.slice(1),
      queryString: url.search.slice(1),
    };
  }

  return {
    show: cta.show,
    link: link,
    variant: cta.variant,
  };
}

function isExternalUrl(url: string) {
  return url.startsWith("https://") || url.startsWith("http://");
}

type Before_Common = {
  globalType: "common";
  banner?: {
    show?: boolean | null;
    message?: Record<string, string> | null;
    cta?: Omit<Before_Cta, "variant">;
  };
};

type After_Common = {
  globalType: "common";
  banner?: {
    show?: boolean | null;
    message?: Record<string, string> | null;
    cta?: Omit<After_Cta, "variant">;
  };
};

type Before_Page = {
  hero: (
    | {
        overlayTitle?: {
          cta?: Before_Cta;
        };
        blockType: "HeroVideo";
      }
    | {
        slides: {
          overlayTitle?: {
            cta?: Before_Cta;
          };
        }[];
        blockType: "Slides";
      }
    | { blockType: "Other" }
  )[];
  layout: (
    | {
        overlayTextBox?: {
          cta?: Before_Cta;
        };
        blockType: "WideImage";
      }
    | {
        cta?: Before_Cta;
        blockType: "Lead";
      }
    | {
        items: {
          cta?: Before_Cta;
        }[];
        blockType: "Features";
      }
    | {
        rooms: {
          ctaUrl?: string | null;
        }[];
        ctaTemplate?: {
          text?: string | null;
          variant?: ("primary" | "secondary") | null;
        };
        blockType: "RoomList";
      }
    | { blockType: "Other" }
  )[];
};

type After_Page = {
  hero: (
    | {
        overlayTitle?: {
          cta?: After_Cta;
        };
        blockType: "HeroVideo";
      }
    | {
        slides: {
          overlayTitle?: {
            cta?: After_Cta;
          };
        }[];
        blockType: "Slides";
      }
    | { blockType: "Other" }
  )[];
  layout: (
    | {
        overlayTextBox?: {
          show?: boolean | null;
          cta?: After_Cta;
        };
        blockType: "WideImage";
      }
    | {
        cta?: After_Cta;
        blockType: "Lead";
      }
    | {
        items: {
          cta?: After_Cta;
        }[];
        blockType: "Features";
      }
    | {
        rooms: {
          cta: After_Cta;
        }[];
        blockType: "RoomList";
      }
    | { blockType: "Other" }
  )[];
};

type Before_Cta = {
  show?: boolean | null;
  text?: string | null;
  url?: string | null;
  variant?: ("primary" | "secondary") | null;
};

type After_Cta = {
  show?: boolean | null;
  link?: {
    label: string;
    type: "internal" | "external";
    page?: (string | null) | Page;
    queryString?: string | null;
    fragment?: string | null;
    url?: string | null;
    id?: string | null;
  };
  variant?: ("primary" | "secondary") | null;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
