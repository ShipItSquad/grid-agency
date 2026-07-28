import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: false,
	workers: 1,
	use: {
		baseURL: 'http://127.0.0.1:43127',
		trace: 'retain-on-failure'
	},
	webServer: {
		command: 'corepack pnpm dev --host 127.0.0.1 --port 43127 --strictPort',
		url: 'http://127.0.0.1:43127',
		reuseExistingServer: false
	}
});
