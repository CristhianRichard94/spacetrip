import { test, expect } from "@playwright/test";

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("page still loads and renders content with prefers-reduced-motion enabled", async ({
    page,
  }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
    expect(errors).toEqual([]);
  });
});
