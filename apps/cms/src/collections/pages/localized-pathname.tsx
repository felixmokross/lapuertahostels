import { locales } from "@/common/localization";
import { addLocalesToRequestFromData, Endpoint, PayloadRequest } from "payload";

export const getLocalizedPathnameEndpoint: Endpoint = {
  method: "get",
  path: "/localized-pathname",
  handler: async (req) => {
    if (!req.user) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    const pathname = req.searchParams.get("pathname");
    addLocalesToRequestFromData(req);

    if (!pathname || !req.locale) {
      return new Response(
        JSON.stringify({
          message: "'pathname' and 'locale' are required.",
        }),
        { status: 400, statusText: "Bad Request" },
      );
    }

    const localizedPathname = await getLocalizedPathname(req, pathname);

    if (localizedPathname === null) {
      return new Response(null, { status: 404, statusText: "Not Found" });
    }

    return new Response(JSON.stringify({ localizedPathname }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export async function getLocalizedPathname(
  req: PayloadRequest,
  pathnameToFind: string,
) {
  const result = await req.payload.find({
    collection: "pages",
    where: {
      or: locales.map((l) => ({
        [`pathname.${l.code}`]: { equals: pathnameToFind },
      })),
    },
    req,
    limit: 1,
  });

  return result.totalDocs > 0 ? result.docs[0].pathname : null;
}
