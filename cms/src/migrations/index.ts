import * as migration_20241118_165700_migration from "./20241118_165700_migration";
import * as migration_20241118_173327_migration from "./20241118_173327_migration";
import * as migration_20241119_204317_migration from "./20241119_204317_migration";
import * as migration_20241207_173838_migrate_media_alt_to_texts from "./20241207_173838_migrate_media_alt_to_texts";
import * as migration_20241229_110109_rename_pages_collection from "./20241229_110109_rename_pages_collection";

export const migrations = [
  {
    up: migration_20241118_165700_migration.up,
    down: migration_20241118_165700_migration.down,
    name: "20241118_165700_migration",
  },
  {
    up: migration_20241118_173327_migration.up,
    down: migration_20241118_173327_migration.down,
    name: "20241118_173327_migration",
  },
  {
    up: migration_20241119_204317_migration.up,
    down: migration_20241119_204317_migration.down,
    name: "20241119_204317_migration",
  },
  {
    up: migration_20241207_173838_migrate_media_alt_to_texts.up,
    down: migration_20241207_173838_migrate_media_alt_to_texts.down,
    name: "20241207_173838_migrate_media_alt_to_texts",
  },
  {
    up: migration_20241229_110109_rename_pages_collection.up,
    down: migration_20241229_110109_rename_pages_collection.down,
    name: "20241229_110109_rename_pages_collection",
  },
];
