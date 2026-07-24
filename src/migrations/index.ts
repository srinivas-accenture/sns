import * as migration_20260724_084347 from './20260724_084347';
import * as migration_20260724_112247 from './20260724_112247';

export const migrations = [
  {
    up: migration_20260724_084347.up,
    down: migration_20260724_084347.down,
    name: '20260724_084347',
  },
  {
    up: migration_20260724_112247.up,
    down: migration_20260724_112247.down,
    name: '20260724_112247'
  },
];
