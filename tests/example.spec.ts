import { expect, test } from "@wordpress/e2e-test-utils-playwright";
import { BASE } from "../playwright.config";

test("true is true", async ({ page, editor }) => {
	await page.goto(`${BASE}/wp-admin/post-new.php`);
	// Just a dummy test to verify things are working
	await editor.insertBlock({ name: "kevinbatdorf/block-starter" });
	// This text would be on the sidebar
	expect(page.getByText("Coming soon")).toContainText("Coming soon");
});
