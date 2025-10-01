import { defineConfig, devices } from "@playwright/test";

const PORT = 9400;
export const BASE = `http://127.0.0.1:${PORT}`;

export default defineConfig({
	testDir: "./tests",
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: BASE,
		trace: "on-first-retry",
	},
	webServer: {
		command: `npx @wp-playground/cli@latest server --auto-mount --blueprint=tests/blueprint.json --port=${PORT} --experimental-multi-worker=3`,
		url: BASE,
		reuseExistingServer: false,
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
});
