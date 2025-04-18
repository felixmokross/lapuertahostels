import { CollectionSlug, Endpoint, GlobalSlug } from "payload";

export const translationsEndpoint: Endpoint = {
  path: "/translations",
  method: "get",
  handler: async (req) => {
    if (!req.user) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    const collection = req.searchParams.get("collection") as
      | CollectionSlug
      | undefined;
    const global = req.searchParams.get("global") as GlobalSlug | undefined;
    const id = req.searchParams.get("id");

    if (!collection && !global) {
      return new Response(
        JSON.stringify({ message: "'collection' or 'global' is required" }),
        {
          status: 400,
          statusText: "Bad Request",
        },
      );
    }

    if (collection && !id) {
      return new Response(
        JSON.stringify({ message: "'id' is required for collections" }),
        {
          status: 400,
          statusText: "Bad Request",
        },
      );
    }

    const fieldPath = req.searchParams.get("fieldPath");
    if (!fieldPath) {
      return new Response(
        JSON.stringify({ message: "'fieldPath' is required" }),
        {
          status: 400,
          statusText: "Bad Request",
        },
      );
    }
    const data =
      collection && id
        ? await req.payload.findByID({
            collection,
            id,
            locale: "all",
          })
        : await req.payload.findGlobal({ slug: global!, locale: "all" });

    return new Response(JSON.stringify({ value: getValue(data, fieldPath) }), {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
  },
};

function getValue(doc: object, fieldPath: string) {
  const fieldPathParts = fieldPath.split(".");
  let value = doc;
  for (const part of fieldPathParts) {
    if (value && typeof value === "object") {
      // @ts-expect-error We don't care about the type here
      value = value[part];
    } else {
      return undefined;
    }
  }

  return value;
}
