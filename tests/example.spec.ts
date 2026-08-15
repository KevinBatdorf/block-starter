import { expect, test } from "@wordpress/e2e-test-utils-playwright";

test.beforeEach(async ({ requestUtils }) => {
	// Tests are flaky if not logged in manually
	await requestUtils.login();
});

test("Block is added", async ({ admin, page, editor }) => {
	await admin.createNewPost({ title: "My first post" });
	// Just a dummy test to verify things are working
	await editor.insertBlock({ name: "kevinbatdorf/block-starter" });
	// InspectorControls only render once the settings sidebar is open
	await editor.openDocumentSettingsSidebar();
	await expect(page.getByTestId("coming-soon")).toContainText("Coming soon");
});
