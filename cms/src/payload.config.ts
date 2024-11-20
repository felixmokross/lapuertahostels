import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import {
  Locale,
  SanitizedCollectionConfig,
  SanitizedGlobalConfig,
  buildConfig,
} from "payload";

import { Users } from "./collections/Users";
import { Maintenance } from "./globals/Maintenance";
import { Common } from "./globals/Common";
import { Brands } from "./collections/Brands";
import { Pages } from "./collections/Pages";
import { Media } from "./collections/Media";
import { MediaCategory } from "./collections/MediaCategory";
import { primeFrontendCacheEndpoint } from "./endpoints/prime-frontend-cache";
import { Banners } from "./collections/Banners";
import { Texts } from "./collections/texts/Texts";
import { Links } from "./collections/Links";
import { pageIdToUrl } from "./common/page-urls";
import { Brand, Config, NewPage, Page } from "./payload-types";
import { translations } from "./translations";
import { fileURLToPath } from "url";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { NewPages } from "./collections/NewPages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  admin: {
    user: Users.slug,
    livePreview: {
      url: getPreviewUrl,
      collections: [NewPages.slug, Brands.slug],
      globals: [Common.slug, Maintenance.slug],
    },
    meta: {
      titleSuffix: " · La Puerta Hostels Admin",
      icons: [
        {
          rel: "icon",
          type: "image/vnd.microsoft.icon",
          url: "/assets/favicon.ico",
          sizes: "48x48",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/src/components/logo#Logo",
        Icon: "/src/components/logo#LogoSmall",
      },
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Brands,
    Pages,
    NewPages,
    Media,
    MediaCategory,
    Banners,
    Texts,
    Links,
  ],
  globals: [Common, Maintenance],
  localization: {
    locales: [
      {
        code: "en",
        label: {
          en: "English",
          es: "Inglés",
        },
      },
      {
        code: "es",
        label: {
          en: "Spanish",
          es: "Español",
        },
      },
      {
        code: "de",
        label: {
          en: "German",
          es: "Alemán",
        },
      },
      {
        code: "fr",
        label: {
          en: "French",
          es: "Francés",
        },
      },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "./payload-types.ts"),
    declare: false,
  },
  graphQL: {
    disable: true,
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.MEDIA_S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.MEDIA_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.MEDIA_S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.MEDIA_S3_REGION!,
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  cors: process.env.NEXT_PUBLIC_LIVE_PREVIEW_URL
    ? [process.env.NEXT_PUBLIC_LIVE_PREVIEW_URL]
    : undefined,
  i18n: { translations },
  endpoints: [primeFrontendCacheEndpoint],
});

function getPreviewUrl({
  locale,
  collectionConfig,
  globalConfig,
  data,
}: {
  collectionConfig?: SanitizedCollectionConfig;
  data: Record<string, any>;
  globalConfig?: SanitizedGlobalConfig;
  locale: Locale;
}) {
  const slug = collectionConfig?.slug || globalConfig!.slug;
  const previewId = collectionConfig
    ? `${collectionConfig.slug}/${data.id}`
    : `globals/${globalConfig!.slug}`;
  return `${process.env.NEXT_PUBLIC_LIVE_PREVIEW_URL}${getPreviewPath(slug, data)}?lng=${locale}&preview=${previewId}`;
}

function getPreviewPath(slug: string, data: Record<string, any>) {
  switch (slug) {
    case NewPages.slug:
      return (data as NewPage).pathname;
    case Brands.slug:
      return pageIdToUrl((data as Brand).homeLink as string);
    default:
      return "";
  }
}
