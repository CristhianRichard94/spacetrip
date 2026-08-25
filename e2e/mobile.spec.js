import { test, expect } from "@playwright/test";

test.describe("mobile viewport", () => {
  // Only override viewport/UA-relevant options, not browserName: switching
  // browserName inside a describe block would force a separate Playwright
  // worker/project, which conflicts with the single chromium project setup.
  test.use({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    hasTouch: true,
    isMobile: true,
  });

  test("smoke test renders the page and nav on a mobile viewport", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");

    await expect(page.locator("nav.navbar")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
    expect(errors).toEqual([]);
  });
});
