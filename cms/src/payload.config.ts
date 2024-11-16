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
import { primeFrontendCacheEndpoint } from "./endpoints/prime-frontend-cache";
import { Banners } from "./collections/Banners";
import { Texts } from "./collections/texts/Texts";
import { Links } from "./collections/Links";
import { pageIdToUrl } from "./common/page-urls";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        os: false,
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
  collections: [
    Users,
    Brands,
    Pages,
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
            mustBeValidUrl: "Must be a valid URL",
          },
          texts: {
            translateToAllLocales: "Translate to all locales",
            translatingToAllLocales: "Translating to all locales…",
            pleaseSaveYourChangesToEnableTranslation:
              "Please save your changes to enable translation.",
            confirmTranslateToAllLocales:
              "This will overwrite all translations of this text. Do you want to proceed?",
            translatedToAllLocalesSuccessfully:
              "Translated to all locales successfully",
          },
        },
      },
      es: {
        custom: {
          validation: {
            mustBeValidUrl: "Debe ser una URL válida",
          },
          texts: {
            translateToAllLocales: "Traducir a todos los idiomas",
            translatingToAllLocales: "Traduciendo a todos los idiomas…",
            pleaseSaveYourChangesToEnableTranslation:
              "Por favor, guarde sus cambios para habilitar la traducción.",
            confirmTranslateToAllLocales:
              "Esto sobrescribirá todas las traducciones de este texto. ¿Desea continuar?",
            translatedToAllLocalesSuccessfully:
              "Traducido a todos los idiomas con éxito",
          },
        },
      },
    },
  },
  endpoints: [primeFrontendCacheEndpoint],
  rateLimit: {
    max: 1500,
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
      return pageIdToUrl((data as Brand).homeLink as string);
    default:
      return "";
  }
}

function getPreviewId(documentInfo: ContextType) {
  return documentInfo.id
    ? `${documentInfo.slug}/${documentInfo.id}`
    : `globals/${documentInfo.slug}`;
}
