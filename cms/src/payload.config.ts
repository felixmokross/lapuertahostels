import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import { Users } from "./collections/Users";
import { Maintenance } from "./globals/Maintenance";
import { Common } from "./globals/Common";
import { Brands } from "./collections/Brands";
import { Media } from "./collections/Media";
import { MediaCategory } from "./collections/MediaCategory";
import { primeFrontendCacheEndpoint } from "./endpoints/prime-frontend-cache";
import { Banners } from "./collections/Banners";
import { Texts } from "./collections/texts/Texts";
import { Links } from "./collections/Links";
import { Config } from "./payload-types";
import { translations } from "./translations";
import { fileURLToPath } from "url";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { NewPages } from "./collections/NewPages";

import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

declare module "payload" {
  export interface GeneratedTypes extends Config {}
}

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  admin: {
    user: Users.slug,
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
      beforeNavLinks: ["/src/components/version-info#VersionInfo"],
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Brands,
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
    prodMigrations: migrations,
  }),
  cors: process.env.NEXT_PUBLIC_LIVE_PREVIEW_URL
    ? [process.env.NEXT_PUBLIC_LIVE_PREVIEW_URL]
    : undefined,
  i18n: { supportedLanguages: { en, es }, translations },
  endpoints: [primeFrontendCacheEndpoint],
});
