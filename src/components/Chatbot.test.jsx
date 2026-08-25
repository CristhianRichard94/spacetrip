import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Chatbot from "./Chatbot.jsx";
import { LanguageProvider } from "../context/LanguageContext.jsx";

function renderChatbot() {
  return render(
    <LanguageProvider>
      <Chatbot />
    </LanguageProvider>
  );
}

async function openChat(user) {
  await user.click(screen.getByRole("button", { name: /open chat about my experience/i }));
}

describe("Chatbot", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("is closed by default and opens the panel on toggle click", async () => {
    const user = userEvent.setup();
    renderChatbot();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await openChat(user);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/ask me about cristhian's experience/i)).toBeInTheDocument();
  });

  it("shows the loading state while waiting for a reply", async () => {
    const user = userEvent.setup();
    let resolveFetch;
    global.fetch.mockReturnValue(
      new Promise((resolve) => {
        resolveFetch = resolve;
      })
    );
    renderChatbot();
    await openChat(user);

    await user.type(screen.getByRole("textbox", { name: /your question/i }), "What tech stack?");
    await user.click(screen.getByRole("button", { name: /send question/i }));

    expect(screen.getByText(/thinking/i)).toBeInTheDocument();

    resolveFetch({
      ok: true,
      status: 200,
      json: async () => ({ reply: "React and Next.js." }),
    });

    await waitFor(() => expect(screen.getByText("React and Next.js.")).toBeInTheDocument());
  });

  it("renders the assistant reply on a successful response", async () => {
    const user = userEvent.setup();
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ reply: "He has 6+ years of experience." }),
    });
    renderChatbot();
    await openChat(user);

    await user.type(screen.getByRole("textbox", { name: /your question/i }), "Experience?");
    await user.click(screen.getByRole("button", { name: /send question/i }));

    await waitFor(() =>
      expect(screen.getByText("He has 6+ years of experience.")).toBeInTheDocument()
    );
  });

  it("shows an error message when the request fails", async () => {
    const user = userEvent.setup();
    global.fetch.mockRejectedValue(new Error("network down"));
    renderChatbot();
    await openChat(user);

    await user.type(screen.getByRole("textbox", { name: /your question/i }), "Experience?");
    await user.click(screen.getByRole("button", { name: /send question/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/something went wrong reaching the chat service/i)
      ).toBeInTheDocument()
    );
  });

  it("enters rate-limited state on a 429 response and shows the countdown", async () => {
    const user = userEvent.setup();
    global.fetch.mockResolvedValue({
      ok: false,
      status: 429,
      headers: { get: (name) => (name === "Retry-After" ? "15" : null) },
    });
    renderChatbot();
    await openChat(user);

    await user.type(screen.getByRole("textbox", { name: /your question/i }), "Experience?");
    await user.click(screen.getByRole("button", { name: /send question/i }));

    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: /your question/i })).toBeDisabled()
    );
    expect(screen.getAllByText(/15s/i).length).toBeGreaterThan(0);
  });

  it("does not send an empty or whitespace-only message", async () => {
    const user = userEvent.setup();
    renderChatbot();
    await openChat(user);

    await user.type(screen.getByRole("textbox", { name: /your question/i }), "   ");
    await user.click(screen.getByRole("button", { name: /send question/i }));

    expect(global.fetch).not.toHaveBeenCalled();
  });
});
