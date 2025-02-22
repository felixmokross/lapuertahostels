import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { migrateRelationshipsV2_V3 } from "@payloadcms/db-mongodb/migration-utils";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await migrateRelationshipsV2_V3({ req, batchSize: 100 });
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
}
