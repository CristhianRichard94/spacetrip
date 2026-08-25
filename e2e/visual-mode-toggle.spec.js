import { test, expect } from "@playwright/test";

test.describe("visual mode toggle", () => {
  test("switching scene variant does not crash the page", async ({ page }) => {
    const consoleErrors = [];
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto("/");
    const toggle = page.locator("button.visual-mode-toggle");

    // Only present when the browser reports WebGL support.
    const isVisible = await toggle.isVisible().catch(() => false);
    test.skip(!isVisible, "WebGL not available in this environment; toggle is not rendered.");

    const initialPressed = await toggle.getAttribute("aria-pressed");
    await toggle.click();
    await expect(toggle).not.toHaveAttribute("aria-pressed", initialPressed ?? "");

    // Scene should still be up (canvas present) after switching modes.
    await expect(page.locator("canvas").first()).toBeVisible();
    expect(consoleErrors).toEqual([]);
  });
});
