import { useEffect, useRef, useState } from "react";

const MAX_MESSAGE_LENGTH = 500;
const RESUME_URL = "/Cristhian_Richard_Resume_16-07.pdf";

const INITIAL_MESSAGE = {
  role: "assistant",
  content:
    "Hi! Ask me about Cristhian's experience, skills, education, or projects — or download his résumé below.",
};

const SUGGESTIONS = [
  "What's his experience with React?",
  "What projects has he worked on?",
  "What's his DevOps background?",
];

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | rate-limited
  const [retryAfter, setRetryAfter] = useState(0);
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
            content: `Whoa, that's a lot of questions! Please slow down and try again in ${retrySeconds}s.`,
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
        { role: "assistant", content: data.reply || "Sorry, I didn't get a reply. Please try again." },
      ]);
      scrollToBottom();
    } catch (err) {
      setStatus("error");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          variant: "error",
          content: "Something went wrong reaching the chat service. Please try again in a moment.",
        },
      ]);
      scrollToBottom();
    }
  };

  const remaining = MAX_MESSAGE_LENGTH - input.length;

  return (
    <div className="chatbot-widget">
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="Ask about Cristhian's experience">
          <div className="chatbot-panel-header">
            <span>Ask about my experience</span>
            <button
              type="button"
              className="chatbot-close-btn"
              aria-label="Close chat"
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
                {msg.content}
              </div>
            ))}
            {status === "loading" && (
              <div className="chatbot-message chatbot-message-assistant chatbot-message-loading">
                <span className="orbit-spinner" aria-hidden="true" /> Thinking…
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="chatbot-suggestions">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="chatbot-suggestion-btn"
                  onClick={() => sendMessage(s)}
                  disabled={status === "loading" || status === "rate-limited"}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <a
            className="chatbot-resume-link"
            href={RESUME_URL}
            download
            target="_blank"
            rel="noreferrer"
          >
            ⬇ Download résumé
          </a>

          <form className="chatbot-input-row" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              placeholder={
                status === "rate-limited"
                  ? `Try again in ${retryAfter}s…`
                  : "Ask about my experience…"
              }
              value={input}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Your question"
              disabled={status === "loading" || status === "rate-limited"}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={status === "loading" || status === "rate-limited" || !input.trim()}
              aria-label="Send question"
            >
              ➤
            </button>
          </form>
          {status === "rate-limited" ? (
            <span className="chatbot-char-count chatbot-retry-countdown" role="status">
              Try again in {retryAfter}s
            </span>
          ) : (
            <span className="chatbot-char-count">{remaining} characters left</span>
          )}
        </div>
      )}

      <button
        className="chatbot-toggle"
        type="button"
        aria-label={open ? "Close chat" : "Open chat about my experience"}
        onClick={toggleOpen}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}

export default Chatbot;
