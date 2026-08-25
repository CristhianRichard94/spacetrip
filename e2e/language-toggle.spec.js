import { test, expect } from "@playwright/test";

test.describe("language toggle", () => {
  test("switches the visible hero text between English and Spanish", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();

    await page.locator("button.lang-toggle").click();

    await expect(page.getByRole("heading", { name: "Bienvenido" })).toBeVisible();
  });
});
