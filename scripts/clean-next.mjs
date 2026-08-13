import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = process.cwd();
const nextCache = resolve(projectRoot, '.next');

if (nextCache !== resolve(projectRoot, '.next')) {
  throw new Error('Refusing to clean an unexpected path.');
}

await rm(nextCache, { recursive: true, force: true });
console.log('Cleared stale Next.js development cache.');
