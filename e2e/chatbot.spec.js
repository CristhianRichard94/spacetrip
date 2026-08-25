import { test, expect } from "@playwright/test";

test.describe("chatbot", () => {
  test("full send/receive flow uses a mocked network response, never the real OpenAI API", async ({
    page,
  }) => {
    await page.route("**/.netlify/functions/chat", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ reply: "Cristhian has 6+ years of experience." }),
      });
    });

    await page.goto("/");
    await page.locator("button.chatbot-toggle").click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await page.getByRole("textbox", { name: /your question/i }).fill("What's his experience?");
    await page.getByRole("button", { name: /send question/i }).click();

    await expect(page.getByText("Cristhian has 6+ years of experience.")).toBeVisible();
  });

  test("shows an error message when the network call fails, without calling real OpenAI", async ({
    page,
  }) => {
    await page.route("**/.netlify/functions/chat", async (route) => {
      await route.abort("failed");
    });

    await page.goto("/");
    await page.locator("button.chatbot-toggle").click();
    await page.getByRole("textbox", { name: /your question/i }).fill("What's his experience?");
    await page.getByRole("button", { name: /send question/i }).click();

    await expect(
      page.getByText(/something went wrong reaching the chat service/i)
    ).toBeVisible();
  });
});
