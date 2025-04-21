import { Endpoint, Payload } from "payload";

export const getRedirectsEndpoint: Endpoint = {
  path: "/get",
  method: "get",
  handler: async (req) => {
    if (!req.user) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    const locale = req.searchParams.get("locale");
    const pathname = req.searchParams.get("pathname");
    if (!locale || !pathname) {
      return new Response(
        JSON.stringify({ message: "'locale' and 'pathname' are required" }),
        {
          status: 400,
          statusText: "Bad Request",
        },
      );
    }

    const limit = req.searchParams.get("limit");

    const redirects = await getRedirects(
      req.payload,
      pathname,
      locale,
      limit ? parseInt(limit, 10) : undefined,
    );
    return new Response(JSON.stringify(redirects), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export async function getRedirects(
  payload: Payload,
  pathname: string,
  locale: string,
  limit?: number,
) {
  return await payload.find({
    collection: "redirects",
    pagination: false,
    where: {
      and: [
        { fromPathname: { equals: pathname } },
        {
          or: [{ locales: { contains: locale } }, { locales: { equals: [] } }],
        },
      ],
    },
    limit,
  });
}
