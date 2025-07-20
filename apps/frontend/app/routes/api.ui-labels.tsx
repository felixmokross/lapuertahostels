import { LoaderFunctionArgs } from "react-router";
import { getCommon } from "~/cms-data.server";
import { getRequestUrl } from "~/common/routing";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = getRequestUrl(request);

  // using 'lng' instead of 'locale' for consistency as this is the default in i18next (consider changing this)
  const lng = url.searchParams.get("lng");
  if (!lng) {
    return Response.json(
      { message: "'lng' parameter is required" },
      { status: 400, statusText: "Bad Request" },
    );
  }
  const common = await getCommon(request, lng);
  return Response.json(common.uiLabels, {
    headers: {
      "Cache-Control": "max-age=3600", // Cache for 1 hour
    },
  });
}
