import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const forbiddenPatterns = ['svelte-grab', 'SvelteGrab', 'SvelteDevKit'];
const textExtensions = new Set(['.css', '.html', '.js', '.json', '.map']);

async function checkDirectory(directory) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);

		if (entry.isDirectory()) {
			await checkDirectory(path);
			continue;
		}
		if (!textExtensions.has(extname(entry.name))) continue;

		const content = await readFile(path, 'utf8');
		const pattern = forbiddenPatterns.find((candidate) => content.includes(candidate));

		if (pattern) {
			throw new Error(`Production artifact ${path} contains ${pattern}`);
		}
	}
}

await checkDirectory('build');

const manifestPath = '.svelte-kit/output/client/.vite/manifest.json';
const manifestContent = await readFile(manifestPath, 'utf8').catch((error) => {
	throw new Error(`Could not inspect production manifest at ${manifestPath}`, { cause: error });
});
const manifest = JSON.stringify(JSON.parse(manifestContent));
const manifestPattern = forbiddenPatterns.find((candidate) => manifest.includes(candidate));

if (manifestPattern) {
	throw new Error(`Production manifest ${manifestPath} contains ${manifestPattern}`);
}
