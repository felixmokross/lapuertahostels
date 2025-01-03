import { LoaderFunctionArgs } from "react-router";
import { getRequestUrl } from "~/common/routing";

export async function loader({ request }: LoaderFunctionArgs) {
  const content = `User-Agent: *
Disallow: 
Allow: /

Sitemap: ${new URL("/sitemap.xml", getRequestUrl(request).origin).href}`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      encoding: "UTF-8",
    },
  });
}
