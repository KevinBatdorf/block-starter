import { expect, test } from "@wordpress/e2e-test-utils-playwright";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

test("Block is added", async ({ admin, page, editor }) => {
	await admin.createNewPost({ title: "My first post" });
	await editor.switchToLegacyCanvas();
	await page.waitForSelector('[aria-label="Add block"]');
	// Just a dummy test to verify things are working
	await editor.insertBlock({ name: "kevinbatdorf/block-starter" });
	// This text would be in the sidebar
	await page.waitForSelector('[data-testid="coming-soon"]');
	expect(page.getByTestId("coming-soon")).toContainText("Coming soon", {
		timeout: 15_000,
	});
});
