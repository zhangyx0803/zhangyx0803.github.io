// Copy the built site from dist/ into the repository root.
// GitHub Pages serves this branch's root, so the build output lives there.
import { cpSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

if (!existsSync('dist')) {
  console.error('dist/ not found — run `pnpm build` first.');
  process.exit(1);
}

for (const name of readdirSync('dist')) {
  if (name === 'dist' || name === 'node_modules') continue;
  cpSync(join('dist', name), name, { recursive: true, force: true });
}

// stop GitHub Pages from running Jekyll over the _astro/ directory
writeFileSync('.nojekyll', '');

console.log('published dist/ → repo root');
