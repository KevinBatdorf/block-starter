import { expect, test } from "@wordpress/e2e-test-utils-playwright";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

test("Block is added", async ({ admin, page, editor }) => {
	await admin.createNewPost({ title: "My first post" });
	await editor.insertBlock({ name: "kevinbatdorf/block-starter" });
	// Sidebar renders outside the canvas iframe, so page — not editor.canvas
	await expect(page.getByTestId("coming-soon")).toContainText("Coming soon");
});
