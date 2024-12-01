import { getVersion } from "~/common/version.server";

export async function loader() {
  return { version: getVersion() };
}
