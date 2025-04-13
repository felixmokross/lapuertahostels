"use server";

import { getSupportedLocaleCodes } from "@/common/locales";
import { CollectionSlug, getPayload, GlobalSlug } from "payload";
import { getLocalizedTextFields } from "./common";
import config from "@payload-config";
import { ObjectId } from "bson";
import { revalidatePath } from "next/cache";

export async function saveTranslations(formData: FormData) {
  const localeCodes = await getSupportedLocaleCodes();
  const collection = (formData.get("collection") || undefined) as
    | CollectionSlug
    | undefined;
  const global = (formData.get("global") || undefined) as
    | GlobalSlug
    | undefined;
  const payload = await getPayload({ config });

  const data = collection
    ? await payload.findByID({
        id: formData.get("id") as string,
        collection,
      })
    : await payload.findGlobal({ slug: global! });
  const localizedTextFieldPaths = getLocalizedTextFields(
    data,
    collection
      ? payload.collections[collection].config.fields
      : payload.globals.config.find((c) => c.slug === global!)!.fields,
  );

  const update = {
    $set: Object.fromEntries(
      localizedTextFieldPaths.flatMap((p) =>
        localeCodes.map((l) => [
          `${p}.${l}`,
          formData.get(`${p}.${l}`) as string,
        ]),
      ),
    ),
  };

  if (collection) {
    await payload.db.connection
      .collection<{ _id: string | ObjectId }>(collection)
      .updateOne(
        {
          _id:
            typeof data.id === "string"
              ? data.id
              : ObjectId.createFromHexString(data.id),
        },
        update,
      );

    revalidatePath(
      `/admin/collections/${collection}/${formData.get("id")}/translations`,
    );
  } else {
    await payload.db.connection
      .collection("globals")
      .updateOne({ globalType: global }, update);

    revalidatePath(`/admin/globals/${global!}/translations`);
  }
}
