import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import { PayloadPreference } from "payload/generated-types";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.connection
    .collection<PayloadPreference>("payload-preferences")
    .deleteMany({ key: { $ne: "locale" } });
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
