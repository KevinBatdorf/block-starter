import { expect, test } from "@wordpress/e2e-test-utils-playwright";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

test("Block is added", async ({ admin, page, editor }) => {
	// await page.goto(`${BASE}/wp-admin/post-new.php`);
	await admin.createNewPost({ title: "My first post" });
	// Just a dummy test to verify things are working
	await editor.insertBlock({ name: "kevinbatdorf/block-starter" });
	// This text would be in the sidebar
	expect(page.getByTestId("coming-soon")).toContainText("Coming soon");
});
