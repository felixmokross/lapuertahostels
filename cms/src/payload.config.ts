import path from "path";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { Locale, buildConfig } from "payload/config";

import { Users } from "./collections/Users";
import { Maintenance } from "./globals/Maintenance";
import { Common } from "./globals/Common";
import { Brands } from "./collections/Brands";
import { Logo, LogoSmall } from "./components/logo";
import { Pages } from "./collections/Pages";
import { Brand, Page } from "./payload-types";
import { ContextType } from "payload/dist/admin/components/utilities/DocumentInfo/types";
import { Media } from "./collections/Media";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { MediaCategory } from "./collections/MediaCategory";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
        stream: false,
        assert: false,
        url: false,
        util: false,
        querystring: false,
        zlib: false,
        fs: false,
      };
      return config;
    },
    livePreview: {
      url: getPreviewUrl,
      collections: [Pages.slug, Brands.slug],
      globals: [Common.slug, Maintenance.slug],
    },
    meta: {
      titleSuffix: " · La Puerta Hostels Admin",
      favicon: "/assets/favicon.ico",
    },
    components: {
      graphics: {
        Logo: Logo,
        Icon: LogoSmall,
      },
    },
  },
  editor: slateEditor({}),
  collections: [Users, Brands, Pages, Media, MediaCategory],
  globals: [Common, Maintenance],
  localization: {
    locales: ["en", "es", "de", "fr"],
    defaultLocale: "en",
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
    declare: false,
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    cloudStorage({
      collections: {
        [Media.slug]: {
          adapter: s3Adapter({
            config: {
              credentials: {
                accessKeyId: process.env.MEDIA_S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.MEDIA_S3_SECRET_ACCESS_KEY,
              },
              region: process.env.MEDIA_S3_REGION,
            },
            bucket: process.env.MEDIA_S3_BUCKET,
          }),
        },
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  cors: process.env.PAYLOAD_PUBLIC_LIVE_PREVIEW_URL
    ? [process.env.PAYLOAD_PUBLIC_LIVE_PREVIEW_URL]
    : undefined,
  i18n: {
    resources: {
      en: {
        custom: {
          validation: {
            imageUrlMustBeImageKit: "Must be an ImageKit URL ({{exampleUrl}})",
            mustBeValidUrl: "Must be a valid URL",
          },
        },
      },
      es: {
        custom: {
          validation: {
            imageUrlMustBeImageKit:
              "Debe ser una URL de ImageKit ({{exampleUrl}})",
            mustBeValidUrl: "Debe ser una URL válida",
          },
        },
      },
    },
  },
});

function getPreviewUrl({
  locale,
  documentInfo,
  data,
}: {
  data: Record<string, any>;
  documentInfo: ContextType;
  locale: Locale;
}) {
  return `${process.env.PAYLOAD_PUBLIC_LIVE_PREVIEW_URL}${getPreviewPath(documentInfo.slug, data)}?lng=${locale}&preview=${getPreviewId(documentInfo)}`;
}

function getPreviewPath(slug: string, data: Record<string, any>) {
  switch (slug) {
    case Pages.slug:
      return (data as Page).url;
    case Brands.slug:
      return (data as Brand).homeLinkUrl;
    default:
      return "";
  }
}

function getPreviewId(documentInfo: ContextType) {
  return documentInfo.id
    ? `${documentInfo.slug}/${documentInfo.id}`
    : `globals/${documentInfo.slug}`;
}
