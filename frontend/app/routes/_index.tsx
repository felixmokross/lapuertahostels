import { LoaderFunctionArgs } from "@remix-run/node";
import { handleIncomingRequest } from "~/common/routing.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await handleIncomingRequest(request);

  throw new Error("Redirection to localized route failed");
}
