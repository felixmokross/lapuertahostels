import { json } from "@remix-run/node";
import packageJson from "../../package.json";

export function loader() {
  return json({ version: packageJson.version });
}
