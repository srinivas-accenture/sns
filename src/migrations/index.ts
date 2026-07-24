import * as migration_20260724_084347 from './20260724_084347';
import * as migration_20260724_112247 from './20260724_112247';
import * as migration_20260724_134919 from './20260724_134919';
import * as migration_20260724_140209 from './20260724_140209';

export const migrations = [
  {
    up: migration_20260724_084347.up,
    down: migration_20260724_084347.down,
    name: '20260724_084347',
  },
  {
    up: migration_20260724_112247.up,
    down: migration_20260724_112247.down,
    name: '20260724_112247',
  },
  {
    up: migration_20260724_134919.up,
    down: migration_20260724_134919.down,
    name: '20260724_134919',
  },
  {
    up: migration_20260724_140209.up,
    down: migration_20260724_140209.down,
    name: '20260724_140209'
  },
];
