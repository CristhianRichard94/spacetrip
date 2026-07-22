import { useEffect, useRef, useState } from "react";
import useTranslation from "../hooks/useTranslation.js";

const MAX_MESSAGE_LENGTH = 500;
const RESUME_URL = "/Cristhian_Richard_Resume_16-07.pdf";

const SUGGESTION_KEYS = ["react", "projects", "devops"];

function Chatbot() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", greeting: true }]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | rate-limited
  const [retryAfter, setRetryAfter] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (retryAfter <= 0) {
      if (status === "rate-limited") setStatus("idle");
      return;
    }
    const timer = setInterval(() => {
      setRetryAfter((prev) => {
        if (prev <= 1) {
          setStatus("idle");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [retryAfter, status]);

  const toggleOpen = () => setOpen((prev) => !prev);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    });
  };

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (
      !trimmed ||
      trimmed.length > MAX_MESSAGE_LENGTH ||
      status === "loading" ||
      status === "rate-limited"
    ) {
      return;
    }
    await sendMessage(trimmed);
  };

  const sendMessage = async (trimmed) => {
    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setStatus("loading");
    scrollToBottom();

    try {
      const response = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (response.status === 429) {
        const retrySecondsHeader = parseInt(response.headers.get("Retry-After"), 10);
        const retrySeconds =
          Number.isFinite(retrySecondsHeader) && retrySecondsHeader > 0 ? retrySecondsHeader : 15;
        setRetryAfter(retrySeconds);
        setStatus("rate-limited");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            variant: "rate-limited",
            content: `${t("chatbot.rateLimitedPrefix")} ${retrySeconds}s.`,
          },
        ]);
        scrollToBottom();
        return;
      }

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setStatus("idle");
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || t("chatbot.noReplyFallback") },
      ]);
      scrollToBottom();
    } catch (err) {
      setStatus("error");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          variant: "error",
          content: t("chatbot.errorMessage"),
        },
      ]);
      scrollToBottom();
    }
  };

  const handleCopy = async (index, content) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex((prev) => (prev === index ? null : prev)), 1500);
    } catch (err) {
      // clipboard unavailable, ignore silently
    }
  };

  const remaining = MAX_MESSAGE_LENGTH - input.length;

  return (
    <div className="chatbot-widget">
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label={t("chatbot.header")}>
          <div className="chatbot-panel-header">
            <span>{t("chatbot.header")}</span>
            <button
              type="button"
              className="chatbot-close-btn"
              aria-label={t("chatbot.closeChat")}
              onClick={toggleOpen}
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chatbot-message chatbot-message-${msg.role}${
                  msg.variant ? ` chatbot-message-${msg.variant}` : ""
                }`}
              >
                {msg.greeting ? t("chatbot.greeting") : msg.content}
                {msg.role === "assistant" && (
                  <button
                    type="button"
                    className="chatbot-copy-btn"
                    aria-label={t("chatbot.copyMessage")}
                    onClick={() =>
                      handleCopy(index, msg.greeting ? t("chatbot.greeting") : msg.content)
                    }
                  >
                    {copiedIndex === index ? "✓" : "⧉"}
                  </button>
                )}
              </div>
            ))}
            {status === "loading" && (
              <div className="chatbot-message chatbot-message-assistant chatbot-message-loading">
                <span className="orbit-spinner" aria-hidden="true" /> {t("chatbot.thinking")}
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="chatbot-suggestions">
              {SUGGESTION_KEYS.map((key) => {
                const label = t(`chatbot.suggestions.${key}`);
                return (
                  <button
                    key={key}
                    type="button"
                    className="chatbot-suggestion-btn"
                    onClick={() => sendMessage(label)}
                    disabled={status === "loading" || status === "rate-limited"}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          <a
            className="chatbot-resume-link"
            href={RESUME_URL}
            download
            target="_blank"
            rel="noreferrer"
          >
            ⬇ {t("chatbot.downloadResume")}
          </a>

          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              placeholder={
                status === "rate-limited"
                  ? `${t("chatbot.tryAgainIn")} ${retryAfter}s…`
                  : t("chatbot.inputPlaceholder")
              }
              value={input}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(e) => setInput(e.target.value)}
              aria-label={t("chatbot.yourQuestion")}
              disabled={status === "loading" || status === "rate-limited"}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={status === "loading" || status === "rate-limited" || !input.trim()}
              aria-label={t("chatbot.sendQuestion")}
            >
              ➤
            </button>
          </form>
          {status === "rate-limited" ? (
            <span className="chatbot-char-count chatbot-retry-countdown" role="status">
              {t("chatbot.tryAgainIn")} {retryAfter}s
            </span>
          ) : (
            <span className="chatbot-char-count">
              {remaining} {t("chatbot.charactersLeft")}
            </span>
          )}
        </div>
      )}

      <button
        className="chatbot-toggle"
        type="button"
        aria-label={open ? t("chatbot.closeChat") : t("chatbot.openChat")}
        onClick={toggleOpen}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}

export default Chatbot;
