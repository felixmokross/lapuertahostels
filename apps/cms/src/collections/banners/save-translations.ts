"use server";

import { getSupportedLocaleCodes } from "@/common/locales";
import { CollectionSlug, getPayload } from "payload";
import { getLocalizedTextFields } from "./common";
import config from "@payload-config";
import { ObjectId } from "bson";
import { revalidatePath } from "next/cache";

export async function saveTranslations(formData: FormData) {
  const localeCodes = await getSupportedLocaleCodes();
  const collection = formData.get("collection") as CollectionSlug;
  const payload = await getPayload({ config });
  const localizedTextFieldPaths = getLocalizedTextFields(
    payload.collections[collection].config.fields,
  );

  await payload.db.connection.collection(collection).updateOne(
    {
      _id: ObjectId.createFromHexString(formData.get("id") as string),
    },
    {
      $set: Object.fromEntries(
        localizedTextFieldPaths.flatMap((p) =>
          localeCodes.map((l) => [
            `${p}.${l}`,
            formData.get(`${p}.${l}`) as string,
          ]),
        ),
      ),
    },
  );

  revalidatePath(
    `/admin/collections/${collection}/${formData.get("id")}/translations`,
  );
}
