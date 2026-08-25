import { test, expect } from "@playwright/test";

test.describe("navbar navigation", () => {
  test("clicking a nav link scrolls to the target section", async ({ page }) => {
    await page.goto("/");

    const portfolioLink = page.getByRole("link", { name: /my portfolio/i });
    await portfolioLink.click();

    await expect(page.locator("#portfolio-section")).toBeInViewport({ ratio: 0.1 });
  });

  test("mobile hamburger opens and closes the menu", async ({ page }) => {
    await page.setViewportSize({ width: 400, height: 800 });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /toggle navigation menu/i });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
});
