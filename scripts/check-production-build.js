import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const forbiddenPatterns = ['svelte-grab', 'SvelteGrab', 'SvelteDevKit'];

async function checkDirectory(directory) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);

		if (entry.isDirectory()) {
			await checkDirectory(path);
			continue;
		}

		const content = await readFile(path, 'utf8').catch(() => '');
		const pattern = forbiddenPatterns.find((candidate) => content.includes(candidate));

		if (pattern) {
			throw new Error(`Production artifact ${path} contains ${pattern}`);
		}
	}
}

await checkDirectory('build');

const manifestPath = '.svelte-kit/output/client/.vite/manifest.json';
const manifest = JSON.stringify(JSON.parse(await readFile(manifestPath, 'utf8')));
const manifestPattern = forbiddenPatterns.find((candidate) => manifest.includes(candidate));

if (manifestPattern) {
	throw new Error(`Production manifest ${manifestPath} contains ${manifestPattern}`);
}
