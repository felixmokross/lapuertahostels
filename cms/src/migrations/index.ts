import * as migration_20241118_165700_migration from './20241118_165700_migration';
import * as migration_20241118_173327_migration from './20241118_173327_migration';

export const migrations = [
  {
    up: migration_20241118_165700_migration.up,
    down: migration_20241118_165700_migration.down,
    name: '20241118_165700_migration',
  },
  {
    up: migration_20241118_173327_migration.up,
    down: migration_20241118_173327_migration.down,
    name: '20241118_173327_migration'
  },
];
