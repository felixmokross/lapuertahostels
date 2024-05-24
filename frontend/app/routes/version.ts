import { json } from "@remix-run/node";
import packageJson from "../../package.json";

export async function loader() {
  return json({ version: packageJson.version });
}
