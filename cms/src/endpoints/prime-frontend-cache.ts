import { Endpoint } from "payload/config";
import { refreshCacheForTarget } from "../common/refresh-cache";
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

    const pages = (
      await req.payload.find({ collection: "pages", pagination: false })
    ).docs;

    console.log("Priming frontend cache for all pages.");
    await Promise.allSettled(
      pages.map((page) =>
        refreshCacheForTarget({
          type: "prime-only",
          pageUrl: page.url,
        }),
      ),
    );

    console.log("Primed frontend cache for all pages.");
    res.status(204).send();
  },
};
