import * as migration_20250712_225300 from './20250712_225300';
import * as migration_20250717_073932_migration from './20250717_073932_migration';
import * as migration_20250717_231800_migration from './20250717_231800_migration';

export const migrations = [
  {
    up: migration_20250712_225300.up,
    down: migration_20250712_225300.down,
    name: '20250712_225300',
  },
  {
    up: migration_20250717_073932_migration.up,
    down: migration_20250717_073932_migration.down,
    name: '20250717_073932_migration',
  },
  {
    up: migration_20250717_231800_migration.up,
    down: migration_20250717_231800_migration.down,
    name: '20250717_231800_migration'
  },
];
