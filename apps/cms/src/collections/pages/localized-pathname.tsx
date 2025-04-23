import { locales } from "@/common/localization";
import { addLocalesToRequestFromData, Endpoint } from "payload";

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

    const result = await req.payload.find({
      collection: "pages",
      where: {
        or: locales.map((l) => ({
          [`pathname.${l.code}`]: { equals: pathname },
        })),
      },
      req,
      limit: 1,
    });

    if (result.totalDocs === 0) {
      return new Response(null, { status: 404, statusText: "Not Found" });
    }

    return new Response(
      JSON.stringify({ localizedPathname: result.docs[0].pathname }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
};
