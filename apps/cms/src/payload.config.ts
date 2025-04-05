import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import { Users } from "./collections/users";
import { Maintenance } from "./globals/Maintenance";
import { Common } from "./globals/Common";
import { Brands } from "./collections/brands";
import { Media } from "./collections/media";
import { MediaCategories } from "./collections/media-categories";
import { primeFrontendCacheEndpoint } from "./endpoints/prime-frontend-cache";
import { Texts } from "./collections/texts";
import { Links } from "./collections/links";
import { Config } from "./payload-types";
import { translations } from "./translations";
import { fileURLToPath } from "url";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { Pages } from "./collections/pages";
import { Banners } from "./collections/banners";

import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { ApiKeys } from "./collections/api-keys/config";

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
    livePreview: {
      breakpoints: [
        {
          label: "Mobile",
          name: "mobile",
          width: 390,
          height: 844,
        },
        {
          label: "Tablet (Portrait)",
          name: "tablet-portrait",
          width: 820,
          height: 1180,
        },
        {
          label: "Tablet (Landscape)",
          name: "tablet-landscape",
          width: 1180,
          height: 820,
        },
        {
          label: "Desktop",
          name: "desktop",
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    ApiKeys,
    Brands,
    Pages,
    Media,
    MediaCategories,
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
  cors: process.env.LIVE_PREVIEW_URL
    ? [process.env.LIVE_PREVIEW_URL]
    : undefined,
  serverURL: process.env.SERVER_URL,
  csrf: process.env.LIVE_PREVIEW_URL ? [process.env.LIVE_PREVIEW_URL] : [],
  i18n: { supportedLanguages: { en, es }, translations },
  endpoints: [primeFrontendCacheEndpoint],
  async onInit(payload) {
    if (process.env.ENABLE_E2E_USER === "true") {
      const users = await payload.find({
        collection: "users",
        where: { email: { equals: "e2e@lapuertahostels.co" } },
        pagination: false,
      });

      if (users.totalDocs === 0) {
        await payload.create({
          collection: "users",
          data: {
            email: "e2e@lapuertahostels.co",
            password: "password",
            enableAPIKey: true,
            apiKey: "apikey",
            role: "admin",
          },
        });
      }
    }
  },
});
