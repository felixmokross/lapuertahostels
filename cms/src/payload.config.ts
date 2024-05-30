import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import { Users } from "./collections/Users";
import { Common } from "./globals/Common";
import { Brands } from "./collections/Brands";
import { Logo, LogoSmall } from "./components/logo";
import { Pages } from "./collections/Pages";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        dns: false,
      };
      return config;
    },
    livePreview: {
      url: ({ locale, documentInfo }) =>
        `${process.env.PAYLOAD_PUBLIC_LIVE_PREVIEW_URL}${documentInfo.global.custom.route || ""}?lng=${locale}`,
      collections: [Pages.slug],
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
  collections: [Users, Brands, Pages],
  globals: [Common],
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
  plugins: [payloadCloud()],
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
