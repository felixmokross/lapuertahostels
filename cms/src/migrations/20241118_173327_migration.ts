import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { migrateSlateToLexical } from "@payloadcms/richtext-lexical/migrate";

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await migrateSlateToLexical({ payload });
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  // Migration code
}
