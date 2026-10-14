import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import Critters from 'critters';

const outDir = resolve(process.cwd(), 'out');
const homepage = resolve(outDir, 'index.html');
const source = await readFile(homepage, 'utf8');

const optimized = await new Critters({
  path: outDir,
  publicPath: '',
  preload: 'media',
  pruneSource: false,
  compress: true,
  fonts: false,
  logLevel: 'silent',
}).process(source);

if (!optimized.includes('<style>') || !optimized.includes('media="print"')) {
  throw new Error('Homepage critical CSS optimization did not produce the expected output.');
}

await writeFile(homepage, optimized, 'utf8');
console.log('Optimized homepage critical CSS.');
