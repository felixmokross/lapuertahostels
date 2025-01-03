import { test as setup } from "@playwright/test";
import { getPuertaBrand, createPuertaBrand } from "./cms";

setup("setting up CMS", async ({}) => {
  const puertaBrand = await getPuertaBrand();
  if (!puertaBrand) {
    console.log("Puerta brand not found, creating it");

    await createPuertaBrand();
  }
});
