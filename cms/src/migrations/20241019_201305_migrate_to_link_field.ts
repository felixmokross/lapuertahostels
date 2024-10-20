import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const common = await payload.db.connection.db
    .collection<Before_Common>("globals")
    .findOne({ globalType: "common" });

  await payload.db.connection.db.collection<After_Common>("globals").updateOne(
    { _id: common._id },
    {
      $set: {
        "footer.linkGroups": common.footer.linkGroups.map((group) => ({
          ...group,
          links: group.links.map(toAfterLink),
        })),
      },
    },
  );

  const brands = await payload.db.connection.db
    .collection<Before_Brand>("brands")
    .find()
    .toArray();

  for (const brand of brands) {
    await payload.db.connection.db.collection<After_Brand>("brands").updateOne(
      { _id: brand._id },
      {
        $set: { navLinks: brand.navLinks.map(toAfterLink) },
      },
    );
  }
}

function toAfterLink(
  link:
    | Before_Common["footer"]["linkGroups"][number]["links"][number]
    | Before_Brand["navLinks"][number],
): After_Link {
  const label = "name" in link ? link.name : link.label;
  const type = link.url.startsWith("/") ? "internal" : "external";
  const urlParts = new URL(link.url, "http://example.com");
  switch (type) {
    case "internal":
      return {
        label,
        type,
        page: urlToId(urlParts.pathname),
        fragment: urlParts.hash ? urlParts.hash.slice(1) : null,
        search: urlParts.search ? urlParts.search.slice(1) : null,
        id: link.id,
      };
    case "external":
      return {
        label,
        type,
        url: link.url,
        id: link.id,
      };
  }
}

type Before_Common = {
  globalType: "common";
  footer: {
    linkGroups: {
      links: {
        name: Record<string, string>;
        url?: string | null;
        id: string;
      }[];
    }[];
  };
};

type Before_Brand = {
  _id: string;
  navLinks: {
    label: Record<string, string>;
    url?: string | null;
    id: string;
  }[];
};

type After_Common = {
  footer: {
    linkGroups: {
      links: After_Link[];
    }[];
  };
};

type After_Brand = {
  _id: string;
  navLinks: After_Link[];
};

type After_Page = {
  _id: string;
  hero: After_Block[];
  layout: After_Block[];
};

type After_Block = {
  blockType: "Features";
  items: { cta: { link: After_Link } }[];
};

type After_Link = {
  label: Record<string, string>;
  type: "internal" | "external";
  page?: string;
  fragment?: string | null;
  search?: string | null;
  url?: string | null;
  id: string;
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}

function urlToId(url: string) {
  return url.replaceAll("/", ":");
}
