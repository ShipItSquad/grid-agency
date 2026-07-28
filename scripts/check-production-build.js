import { readdir, readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const forbiddenPatterns = ['svelte-grab', 'SvelteGrab', 'SvelteDevKit'];
const textExtensions = new Set(['.cjs', '.css', '.html', '.js', '.json', '.map', '.mjs']);

async function findFile(directory, filename) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) {
			const match = await findFile(path, filename);
			if (match) return match;
		} else if (entry.name === filename) {
			return path;
		}
	}
}

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

const manifestPath = await findFile('.svelte-kit/output/client', 'manifest.json');
if (manifestPath) {
	const manifest = JSON.stringify(JSON.parse(await readFile(manifestPath, 'utf8')));
	const manifestPattern = forbiddenPatterns.find((candidate) => manifest.includes(candidate));
	if (manifestPattern) {
		throw new Error(`Production manifest ${manifestPath} contains ${manifestPattern}`);
	}
} else {
	console.warn('Production manifest not found; checked final build artifacts only');
}
