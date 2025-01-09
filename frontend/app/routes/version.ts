import { getVersion } from "~/common/version.server";

export async function loader() {
  return Response.json({ version: getVersion() });
}
