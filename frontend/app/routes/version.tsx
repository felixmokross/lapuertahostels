import { json } from "@remix-run/node";
import packageJson from "../../package.json";
import { resolve6 } from "dns/promises";

async function getFlyInstances(): Promise<string[]> {
  const address = `global.${process.env.FLY_APP_NAME}.internal`;
  const ipv6s = await resolve6(address);
  return ipv6s.map((ip) => `http://[${ip}]:8080`);
}

export async function loader() {
  return json({
    version: packageJson.version,
    instances: await getFlyInstances(),
  });
}
