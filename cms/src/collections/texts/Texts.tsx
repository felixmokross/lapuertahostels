import { CollectionConfig, GlobalSlug, PayloadRequest } from "payload";
import { cachePurgeHook } from "../../hooks/cache-purge-hook";
import { translateEndpoint } from "./translateEndpoint";
import { fullTextToTitle, richTextToFullText } from "./utils";
import { editor } from "./editor";
import { Link, NewPage } from "@/payload-types";
import {
  getFullCollectionCacheKey,
  getGlobalCacheKey,
  getPageCacheKey,
  refreshCacheForTarget,
} from "@/common/frontend-cache";
import {
  getUniqueGlobals,
  getUniqueCollectionItemIds,
  usagesField,
} from "@/fields/usages";

export const Texts: CollectionConfig = {
  slug: "texts",
  labels: {
    singular: {
      en: "Text",
      es: "Texto",
    },
    plural: {
      en: "Texts",
      es: "Textos",
    },
  },
  defaultSort: "title",
  defaultPopulate: {
    type: true,
    text: true,
    richText: true,
    title: true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "comment"],
    listSearchableFields: ["title"],
  },
  hooks: {
    afterChange: [
      async ({ req, doc }) => {
        const globals = getUniqueGlobals(doc.usages);
        if (globals.length > 0) {
          console.log(`Refreshing cache for globals: ${globals.join(", ")}`);
          await refreshCacheForGlobals(globals, req);
        }

        const bannerIds = getUniqueCollectionItemIds(doc.usages, "banners");
        const brandIds = getUniqueCollectionItemIds(doc.usages, "brands");

        if (brandIds.length > 0 || bannerIds.length > 0) {
          // banners are inlined into brands, therefore banners and brands both use the 'all brands' cache key
          console.log(`Refreshing cache for all brands`);
          await refreshCacheForAllBrands(req);
        }

        const pageIds = getUniqueCollectionItemIds(doc.usages, "new-pages");
        if (pageIds.length > 0) {
          console.log(`Refreshing cache for ${pageIds.length} pages`);
          await refreshCacheForPages(pageIds, req);
        }
      },
    ],
  },
  endpoints: [translateEndpoint],
  fields: [
    {
      name: "type",
      type: "radio",
      label: {
        en: "Type",
        es: "Tipo",
      },
      options: [
        {
          label: { en: "Plain Text", es: "Texto simple" },
          value: "plainText",
        },
        {
          label: { en: "Rich Text", es: "Texto enriquecido" },
          value: "richText",
        },
      ],
      defaultValue: "plainText",
      access: {
        update: () => false,
      },
      required: true,
      admin: {
        description: {
          en: "This cannot be changed after creation.",
          es: "Esto no se puede cambiar después de la creación.",
        },
        layout: "horizontal",
      },
    },
    {
      name: "text",
      type: "textarea",
      label: {
        en: "Text",
        es: "Texto",
      },
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData.type === "plainText",
      },
    },
    {
      name: "richText",
      type: "richText",
      label: {
        en: "Rich Text",
        es: "Texto enriquecido",
      },
      localized: true,
      editor: editor(),
      admin: {
        condition: (_, siblingData) => siblingData.type === "richText",
      },
    },
    {
      name: "comment",
      type: "text",
      label: {
        en: "Comment",
        es: "Comentario",
      },
      admin: {
        position: "sidebar",
        description: {
          en: "Add a comment to help other editors understand the purpose of this text. Keep in mind that texts might need different translations depending on the context.",
          es: "Añade un comentario para ayudar a otros editores a entender el propósito de este texto. Ten en cuenta que los textos pueden necesitar diferentes traducciones dependiendo del contexto.",
        },
      },
    },
    {
      name: "title",
      label: {
        en: "Title (internal)",
        es: "Título (interno)",
      },
      type: "text",
      access: {
        create: () => false,
        update: () => false,
      },
      localized: true,
      hooks: {
        beforeChange: [
          async ({ data }) => {
            return fullTextToTitle(await getFullText());

            async function getFullText() {
              if (!data) throw new Error("Data is missing.");
              switch (data.type) {
                case "plainText":
                  return data.text ?? "";
                case "richText":
                  return data.richText
                    ? await richTextToFullText(data.richText)
                    : "";
              }
            }
          },
        ],
      },
      admin: {
        description: {
          en: "This field is generated automatically and is only used internally in the CMS to identify the text.",
          es: "Este campo se genera automáticamente y solo se usa internamente en el CMS para identificar el texto.",
        },
        position: "sidebar",
      },
    },
    {
      type: "ui",
      name: "translations",
      admin: {
        components: {
          Field: "src/collections/texts/TranslateField#TranslateField",
        },
      },
    },
    usagesField("texts", {
      collections: ["new-pages", "banners", "brands"],
      globals: ["common", "maintenance"],
    }),
  ],
};

async function refreshCacheForGlobals(
  globals: GlobalSlug[],
  req: PayloadRequest,
) {
  await Promise.all(
    globals.map((global) =>
      refreshCacheForTarget(req, {
        type: "purge",
        cacheKey: getGlobalCacheKey(global),
      }),
    ),
  );

  await refreshCacheForTarget(req, {
    type: "prime",
    pageUrl: "/",
  });
}

async function refreshCacheForAllBrands(req: PayloadRequest) {
  const [brandsResult] = await Promise.all([
    req.payload.find({
      collection: "brands",
      pagination: false,
      depth: 2,
    }),
    refreshCacheForTarget(req, {
      type: "purge",
      cacheKey: getFullCollectionCacheKey("brands"),
    }),
  ]);

  await Promise.all(
    brandsResult.docs.map((brand) =>
      refreshCacheForTarget(req, {
        type: "prime",
        pageUrl: ((brand.homeLink as Link).newPage as NewPage).pathname,
      }),
    ),
  );
}

async function refreshCacheForPages(pageIds: string[], req: PayloadRequest) {
  const pages = await Promise.all(
    pageIds.map((id) =>
      req.payload.findByID({
        collection: "new-pages",
        id,
      }),
    ),
  );

  await Promise.all(
    pages.map((page) =>
      cachePurgeHook(
        {
          type: "target",
          cacheKey: getPageCacheKey(page),
          pageUrl: page.pathname,
        },
        req,
      ),
    ),
  );
}
