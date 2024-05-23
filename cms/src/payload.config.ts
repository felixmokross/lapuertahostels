import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import { Users } from "./collections/Users";
import { Home } from "./globals/Home";
import { Common } from "./globals/Common";
import { getConfig } from "./common/config";
import { Azul } from "./globals/Azul";
import { Brands } from "./collections/Brands";
import { Logo, LogoSmall } from "./components/logo";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    livePreview: {
      url: async ({ locale, documentInfo }) =>
        `${(await getConfig()).livePreviewUrl}${documentInfo.global.custom.route || ""}?lng=${locale}`,
      globals: [Home.slug, Azul.slug],
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
  collections: [Users, Brands],
  globals: [Home, Azul, Common],
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
  cors: process.env.LIVE_PREVIEW_URL
    ? [process.env.LIVE_PREVIEW_URL]
    : undefined,
});
