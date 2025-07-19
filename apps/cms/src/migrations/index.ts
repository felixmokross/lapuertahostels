import * as migration_20250502_171326_rename_layout_to_content from './20250502_171326_rename_layout_to_content';
import * as migration_20250502_174357_move_map_settings from './20250502_174357_move_map_settings';
import * as migration_20250502_175318_rename_maintenance_to_settings from './20250502_175318_rename_maintenance_to_settings';
import * as migration_20250719_221257_migration from './20250719_221257_migration';

export const migrations = [
  {
    up: migration_20250502_171326_rename_layout_to_content.up,
    down: migration_20250502_171326_rename_layout_to_content.down,
    name: '20250502_171326_rename_layout_to_content',
  },
  {
    up: migration_20250502_174357_move_map_settings.up,
    down: migration_20250502_174357_move_map_settings.down,
    name: '20250502_174357_move_map_settings',
  },
  {
    up: migration_20250502_175318_rename_maintenance_to_settings.up,
    down: migration_20250502_175318_rename_maintenance_to_settings.down,
    name: '20250502_175318_rename_maintenance_to_settings',
  },
  {
    up: migration_20250719_221257_migration.up,
    down: migration_20250719_221257_migration.down,
    name: '20250719_221257_migration'
  },
];
