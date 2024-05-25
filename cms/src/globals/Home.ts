import { GlobalConfig } from "payload/types";
import { slidesField } from "../fields/slides";
import { StoryBlock } from "../blocks/Story";
import { ImageWithFloatingTextBlock } from "../blocks/ImageWithFloatingText";
import { AccommodationSelectorBlock } from "../blocks/AccommodationSelector";
import { LeadBlock } from "../blocks/Lead";
import { FeaturesBlock } from "../blocks/Features";
import { resolve6 } from "dns/promises";

export const Home: GlobalConfig = {
  slug: "home",
  label: {
    en: "Home",
    es: "Inicio",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [
      async function afterChangeHook() {
        try {
          if (!process.env.CACHE_PURGE_TARGET_TYPE) {
            throw new Error("CACHE_PURGE_TARGET is not set");
          }
          if (!process.env.CACHE_PURGE_TARGET_ARG) {
            throw new Error("CACHE_PURGE_TARGET_ARG is not set");
          }

          switch (process.env.CACHE_PURGE_TARGET_TYPE) {
            case "single":
              await purgeCache(process.env.CACHE_PURGE_TARGET_ARG);
              break;
            case "fly":
              const [appName, port] =
                process.env.CACHE_PURGE_TARGET_ARG.split(",");
              console.log(
                `Determining Fly frontend VM URLs for cache purge (app=${appName}, port=${port})`,
              );

              const urls = await queryFlyVmUrls(appName, parseInt(port, 10));

              console.log(`Purging cache at ${urls.length} frontend VMs`);

              const results = await Promise.allSettled(urls.map(purgeCache));
              const failed = results.filter(isPromiseRejectedResult);

              console.error(
                `Failed to purge cache at ${failed.length} frontend VMs:\n${failed.map((r, i) => `[${i}] ${r}`).join("\n")}`,
              );
              break;
            default:
              throw new Error(
                `Unsupported CACHE_PURGE_TARGET type: ${process.env.CACHE_PURGE_TARGET_TYPE}`,
              );
          }
        } catch (e) {
          console.error("Failed to purge cache:", e);
        }
      },
    ],
  },
  fields: [
    slidesField,
    {
      name: "slideCta",
      label: {
        en: "Slide CTA",
        es: "CTA de Diapositiva",
      },
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "layout",
      label: {
        en: "Layout",
        es: "Diseño",
      },
      labels: {
        singular: {
          en: "Block",
          es: "Bloque",
        },
        plural: {
          en: "Blocks",
          es: "Bloques",
        },
      },
      type: "blocks",
      minRows: 0,
      maxRows: 20,
      blocks: [
        LeadBlock,
        AccommodationSelectorBlock,
        ImageWithFloatingTextBlock,
        StoryBlock,
        FeaturesBlock,
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
};

async function queryFlyVmUrls(appName: string, port: number) {
  const address = `global.${appName}.internal`;
  const ipv6s = await resolve6(address);
  const urls = ipv6s.map((ip) => `http://[${ip}]:${port}/purge-cache`);

  return urls;
}

async function purgeCache(targetUrl: string) {
  console.log(`Purging cache at ${targetUrl} for globals/home`);
  const response = await fetch(targetUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: "globals/home" }),
  });

  if (!response.ok) {
    throw new Error(`Failed to purge cache at ${targetUrl} for globals/home`);
  }
}

function isPromiseRejectedResult(
  result: PromiseSettledResult<unknown>,
): result is PromiseRejectedResult {
  return result.status === "rejected";
}
