import { test, expect } from "@playwright/test";

test.describe("music toggle", () => {
  test("clicking the music toggle does not throw", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    const toggle = page.locator("button.music-toggle");
    await expect(toggle).toBeVisible();

    await toggle.click();
    await toggle.click();

    expect(errors).toEqual([]);
  });
});
