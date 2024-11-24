import { ActionFunctionArgs } from "@remix-run/node";
import { purgeCacheFor } from "~/cms-data";

export async function action({ request }: ActionFunctionArgs) {
  const { url } = await request.json();
  console.log(`Purging cache for ${url}`);
  await purgeCacheFor(url);
  console.log(`Cache purged for ${url}`);

  return new Response(null, { status: 204 });
}
