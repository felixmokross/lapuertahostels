"use server";

import { getSupportedLocaleCodes } from "@/common/locales";
import { getPayload } from "payload";
import { getLocalizedTextFields } from "./common";
import config from "@payload-config";
import { ObjectId } from "bson";
import { revalidatePath } from "next/cache";

export async function saveTranslations(formData: FormData) {
  const otherLocaleCodes = (await getSupportedLocaleCodes()).filter(
    (l) => l !== formData.get("fromLocale"),
  );
  const payload = await getPayload({ config });
  const localizedTextFieldPaths = getLocalizedTextFields(
    payload.collections.banners.config.fields,
  );

  await payload.db.connection.collection("banners").updateOne(
    {
      _id: ObjectId.createFromHexString(formData.get("id") as string),
    },
    {
      $set: Object.fromEntries(
        localizedTextFieldPaths.flatMap((p) =>
          otherLocaleCodes.map((l) => [
            `${p}.${l}`,
            formData.get(`${p}.${l}`) as string,
          ]),
        ),
      ),
    },
  );

  revalidatePath(
    `/admin/collections/banners/${formData.get("id")}/translations`,
  );
}
