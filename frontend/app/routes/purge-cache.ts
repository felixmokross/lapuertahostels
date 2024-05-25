import { ActionFunctionArgs } from "@remix-run/node";
import { purgeCacheFor } from "~/common/cms-data";

export async function action({ request }: ActionFunctionArgs) {
  const { url } = await request.json();
  console.log(`Purging cache for ${url}`);
  await purgeCacheFor(url);

  return new Response(null, { status: 204 });
}
