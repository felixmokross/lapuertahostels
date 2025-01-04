import { Endpoint } from "payload";
import { refreshCacheForAllPages } from "../common/frontend-cache";
import { User } from "@lapuertahostels/shared";

const allowedRoles = ["cicd", "admin"];

export const primeFrontendCacheEndpoint: Endpoint = {
  path: "/prime-frontend-cache",
  method: "post",
  handler: async (req) => {
    if (!req.user) {
      return new Response(null, { status: 401, statusText: "Unauthorized" });
    }

    if (!allowedRoles.includes((req.user as unknown as User).role)) {
      return new Response(null, { status: 403, statusText: "Forbidden" });
    }

    await refreshCacheForAllPages(req, "prime-only");

    return new Response(null, { status: 204, statusText: "No Content" });
  },
};
