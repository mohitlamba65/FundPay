import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Hi there! 👋 Welcome to FundPay. Have questions about purchasing smartphones backed by your mutual funds?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const quickQuestions = [
    "How does 0% effective EMI work?",
    "Will my mutual funds be sold?",
    "Which phones are eligible?",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { sender: "user", text }]);
    if (!textToSend) setInputValue("");

    setTimeout(() => {
      let reply =
        "Our RBI-regulated NBFC partners pledge your mutual fund units via CAMS/KFintech lien. You continue earning regular compounding returns while getting your phone at 0% down payment!";
      if (text.toLowerCase().includes("sold")) {
        reply =
          "No! Your mutual funds are never sold. They remain 100% invested in your portfolio, continuing to earn market compounding returns.";
      } else if (text.toLowerCase().includes("eligible")) {
        reply =
          "Currently, Apple iPhone 17 Pro, Samsung Galaxy S24 Ultra, and Google Pixel 11 Pro are available with instant lien approval.";
      }
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Green Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open support chat"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#20D66B] text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#20D66B]/30"
          style={{
            boxShadow: "0 8px 24px rgba(32, 214, 107, 0.4)",
          }}
        >
          {isOpen ? (
            <X className="h-6 w-6 stroke-[2.5]" />
          ) : (
            <MessageCircle className="h-6 w-6 stroke-[2.2]" />
          )}
        </button>
      </div>

      {/* Floating Chat Modal / Popover */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm rounded-[24px] bg-white border border-[#DCC9F5] shadow-2xl p-5 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between border-b border-[#E5E0EA] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#6D28D9] text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#050505]">FundPay Assistant</h4>
                <div className="flex items-center gap-1 text-[11px] text-[#20D66B] font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#20D66B] animate-pulse" />
                  Online • Instant answers
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#777777] hover:text-[#050505] p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-64 overflow-y-auto space-y-3 pr-1 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl p-3 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#6D28D9] text-white rounded-br-none"
                      : "bg-[#F8F4FF] text-[#050505] border border-[#DCC9F5]/60 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="flex flex-wrap gap-1.5 my-3 pt-2 border-t border-[#E5E0EA]">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-[11px] bg-[#F8F4FF] hover:bg-[#EFDAFF] text-[#6D28D9] font-medium px-2.5 py-1 rounded-full border border-[#DCC9F5] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about mutual fund EMIs..."
              className="flex-1 text-xs bg-[#F8F4FF] border border-[#E5E0EA] focus:border-[#6D28D9] focus:outline-none rounded-xl px-3 py-2.5 text-[#050505] placeholder:text-[#A0A0A0]"
            />
            <Button
              type="submit"
              size="icon"
              className="h-9 w-9 rounded-xl bg-[#6D28D9] hover:bg-[#5420C9] text-white shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
