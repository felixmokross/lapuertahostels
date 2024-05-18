import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import { Users } from "./collections/Users";
import { Home } from "./globals/Home";
import { Common } from "./globals/Common";

async function getLivePreviewUrl() {
  const { livePreviewUrl } = await (await fetch("/config")).json();

  console.info(`Live Preview URL is ${livePreviewUrl}`);

  return livePreviewUrl;
}

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    livePreview: {
      url: async ({ locale }) => `${await getLivePreviewUrl()}?lng=${locale}`,
      globals: [Home.slug, Common.slug],
    },
    meta: {
      titleSuffix: " · La Puerta Hostels Admin",
    },
  },
  editor: slateEditor({}),
  collections: [Users],
  globals: [Home, Common],
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
});
