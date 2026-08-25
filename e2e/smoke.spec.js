import { test, expect } from "@playwright/test";

test.describe("smoke", () => {
  test("page loads, the canvas mounts, and no console errors are logged", async ({ page }) => {
    // Third-party analytics (Cloudflare Web Analytics beacon) is blocked by
    // CORS/network restrictions in this sandboxed/local preview environment
    // regardless of app correctness — it's expected noise here, not a bug in
    // the app, so it's filtered out rather than asserted against.
    const isBenignThirdPartyNoise = (text) =>
      /cloudflareinsights\.com/i.test(text) || /net::ERR_FAILED/i.test(text);

    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && !isBenignThirdPartyNoise(msg.text())) {
        consoleErrors.push(msg.text());
      }
    });
    page.on("pageerror", (error) => {
      if (!isBenignThirdPartyNoise(error.message)) consoleErrors.push(error.message);
    });

    await page.goto("/");
    await expect(page.locator("nav.navbar")).toBeVisible();

    // The 3D canvas (classic fallback or enhanced scene) mounts asynchronously
    // after the initial paint.
    await expect(page.locator("canvas").first()).toBeVisible({ timeout: 15000 });

    expect(consoleErrors, `Console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  });
});
