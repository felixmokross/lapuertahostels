import { LoaderFunctionArgs } from "react-router";
import { getCommon } from "~/cms-data.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  if (!params.locale) {
    return Response.json(
      { message: "Locale parameter is required" },
      { status: 400, statusText: "Bad Request" },
    );
  }
  const common = await getCommon(request, params.locale);
  return Response.json(common.uiLabels);
}
