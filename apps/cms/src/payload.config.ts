import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import { Users } from "./collections/users/config";
import { Maintenance } from "./globals/maintenance/config";
import { Common } from "./globals/common/config";
import { Brands } from "./collections/brands/config";
import { Media } from "./collections/media/config";
import { MediaCategories } from "./collections/media-categories/config";
import { Config } from "./payload-types";
import { translations } from "./translations";
import { fileURLToPath } from "url";
import { s3Storage } from "@payloadcms/storage-s3";
import { Pages } from "./collections/pages/config";
import { Banners } from "./collections/banners/config";

import { en } from "@payloadcms/translations/languages/en";
import { es } from "@payloadcms/translations/languages/es";
import { ApiKeys } from "./collections/api-keys/config";
import { translationsEndpoint } from "./endpoints/translations";
import { autoTranslateEndpoint } from "./endpoints/auto-translate";
import { Redirects } from "./collections/redirects/config";
import { localization } from "./common/localization";
import { editor } from "./common/editor";
import { resendAdapter } from "@payloadcms/email-resend";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

declare module "payload" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
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
  editor: editor(),
  collections: [
    Pages,
    Brands,
    Banners,
    Media,
    Redirects,
    MediaCategories,
    Users,
    ApiKeys,
  ],
  globals: [Common, Maintenance],
  localization,
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
  endpoints: [translationsEndpoint, autoTranslateEndpoint],
  email: resendAdapter({
    defaultFromAddress: "no-reply@admin.lapuertahostels.co",
    defaultFromName: "La Puerta Hostels Admin",
    apiKey: process.env.RESEND_API_KEY!,
  }),
  async onInit(payload) {
    if (!!process.env.E2E_TESTS_API_KEY) {
      const e2eTestApiKeys = await payload.find({
        collection: "api-keys",
        where: { role: { equals: "e2e-tests" } },
        pagination: false,
      });

      if (e2eTestApiKeys.totalDocs === 0) {
        await payload.create({
          collection: "api-keys",
          data: {
            enableAPIKey: true,
            apiKey: process.env.E2E_TESTS_API_KEY,
            role: "e2e-tests",
          },
        });
      }
    }
  },
});
