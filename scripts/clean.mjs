import { existsSync, lstatSync, realpathSync, rmSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (args.some(arg => arg !== '--cache-only')) {
  throw new Error('Usage: npm run clean [-- --cache-only]');
}

const root = realpathSync(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const directories = args.includes('--cache-only')
  ? ['.cache']
  : ['dist', '.cache', 'output', '.playwright-cli'];

// Only these generated directories may be removed, even when run from another cwd.
const targets = directories.map(name => {
  const target = resolve(root, name);
  const pathFromRoot = relative(root, target);
  if (!pathFromRoot || isAbsolute(pathFromRoot) || pathFromRoot === '..' || pathFromRoot.startsWith(`..${sep}`)) {
    throw new Error(`Refusing to clean a path outside the project: ${target}`);
  }
  if (existsSync(target) && (lstatSync(target).isSymbolicLink() || realpathSync(target) !== target)) {
    throw new Error(`Refusing to clean a redirected directory: ${target}`);
  }
  return target;
});

for (const target of targets) {
  rmSync(target, { recursive: true, force: true });
}
console.log(`Cleaned generated directories: ${directories.join(', ')}.`);
