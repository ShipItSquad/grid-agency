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
