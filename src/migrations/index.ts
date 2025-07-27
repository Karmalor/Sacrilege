import * as migration_20250724_214736_migration from './20250724_214736_migration';
import * as migration_20250724_215514_migration from './20250724_215514_migration';
import * as migration_20250724_221023_migration from './20250724_221023_migration';
import * as migration_20250724_221608_migration from './20250724_221608_migration';
import * as migration_20250727_002653_migration from './20250727_002653_migration';
import * as migration_20250727_082846_migration from './20250727_082846_migration';

export const migrations = [
  {
    up: migration_20250724_214736_migration.up,
    down: migration_20250724_214736_migration.down,
    name: '20250724_214736_migration',
  },
  {
    up: migration_20250724_215514_migration.up,
    down: migration_20250724_215514_migration.down,
    name: '20250724_215514_migration',
  },
  {
    up: migration_20250724_221023_migration.up,
    down: migration_20250724_221023_migration.down,
    name: '20250724_221023_migration',
  },
  {
    up: migration_20250724_221608_migration.up,
    down: migration_20250724_221608_migration.down,
    name: '20250724_221608_migration',
  },
  {
    up: migration_20250727_002653_migration.up,
    down: migration_20250727_002653_migration.down,
    name: '20250727_002653_migration',
  },
  {
    up: migration_20250727_082846_migration.up,
    down: migration_20250727_082846_migration.down,
    name: '20250727_082846_migration'
  },
];
