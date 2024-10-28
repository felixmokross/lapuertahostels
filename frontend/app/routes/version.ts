import packageJson from "../../package.json";

export async function loader() {
  return { version: packageJson.version };
}
