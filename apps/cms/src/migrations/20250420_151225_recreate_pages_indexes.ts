import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  await payload.db.collections.pages.base.syncIndexes();
}

export async function down({
  payload,
  req,
  session,
}: MigrateDownArgs): Promise<void> {
  // Migration code
}
