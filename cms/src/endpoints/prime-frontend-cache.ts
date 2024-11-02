import { Endpoint } from "payload/config";
import { refreshCacheForAllPages } from "../common/frontend-cache";
import { User } from "payload/generated-types";

const allowedRoles = ["cicd", "admin"];

export const primeFrontendCacheEndpoint: Endpoint = {
  path: "/prime-frontend-cache",
  method: "post",
  handler: async (req, res) => {
    if (!req.user) return res.status(401).send("Unauthorized");

    if (!allowedRoles.includes((req.user as User).role)) {
      return res.status(403).send("Forbidden");
    }

    await refreshCacheForAllPages(req, "prime-only");

    res.status(204).send();
  },
};
