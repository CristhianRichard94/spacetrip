import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MusicToggle from "./MusicToggle.jsx";
import { LanguageProvider } from "../context/LanguageContext.jsx";

function renderWithAudio(audioMock) {
  const audioRef = { current: audioMock };
  render(
    <LanguageProvider>
      <MusicToggle audioRef={audioRef} />
    </LanguageProvider>
  );
  return audioRef;
}

describe("MusicToggle", () => {
  it("renders muted by default", () => {
    renderWithAudio({ muted: true, paused: true, play: vi.fn() });
    expect(screen.getByRole("button")).toHaveTextContent("🔇");
  });

  it("does nothing when audioRef.current is not set", async () => {
    const user = userEvent.setup();
    const audioRef = { current: null };
    render(
      <LanguageProvider>
        <MusicToggle audioRef={audioRef} />
      </LanguageProvider>
    );
    await user.click(screen.getByRole("button"));
    // No throw, and stays muted-looking since no audio element exists.
    expect(screen.getByRole("button")).toHaveTextContent("🔇");
  });

  it("unmutes and plays the audio element on click", async () => {
    const user = userEvent.setup();
    const play = vi.fn().mockResolvedValue(undefined);
    const audioRef = renderWithAudio({ muted: true, paused: true, play });

    await user.click(screen.getByRole("button"));

    expect(audioRef.current.muted).toBe(false);
    expect(play).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button")).toHaveTextContent("🔊");
  });

  it("mutes without calling play when toggled back off", async () => {
    const user = userEvent.setup();
    const play = vi.fn().mockResolvedValue(undefined);
    const audioRef = renderWithAudio({ muted: false, paused: false, play });

    await user.click(screen.getByRole("button"));

    expect(audioRef.current.muted).toBe(true);
    expect(play).not.toHaveBeenCalled();
    expect(screen.getByRole("button")).toHaveTextContent("🔇");
  });

  it("swallows a rejected play() promise without throwing", async () => {
    const user = userEvent.setup();
    const play = vi.fn().mockRejectedValue(new Error("autoplay blocked"));
    renderWithAudio({ muted: true, paused: true, play });

    await expect(user.click(screen.getByRole("button"))).resolves.not.toThrow();
  });
});
