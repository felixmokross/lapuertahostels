import { ActionFunctionArgs } from "@remix-run/node";
import { purgeCacheFor } from "~/common/cms-data";

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const url = form.get("url") as string;
  await purgeCacheFor(url);

  return new Response(null, { status: 204 });
}
