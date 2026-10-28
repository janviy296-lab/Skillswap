import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/api";
import socket from "../socket";

function Chat() {
  const [searchParams] = useSearchParams();
  const partnerId = searchParams.get("partner");

  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(socket.connected);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/profile");
        setCurrentUser(response.data.user || response.data);
      } catch {
        setError("Profile load nahi hua. Please login again.");
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    if (!partnerId) {
      setError("Chat partner select nahi hua. Matches page se Chat open karo.");
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/messages/${partnerId}`);
        setMessages(response.data.messages || []);
        setError("");
      } catch {
        setError("Messages load nahi hue. Login aur backend check karo.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [partnerId]);

  useEffect(() => {
    if (!currentUser?._id || !partnerId) return;

    const joinRoom = () => {
      setConnected(true);
      socket.emit("joinChat", {
        userId: currentUser._id,
        partnerId,
      });
    };

    const handleDisconnect = () => setConnected(false);

    const handleReceiveMessage = (newMessage) => {
      setMessages((previous) => {
        if (
          newMessage._id &&
          previous.some((item) => item._id === newMessage._id)
        ) {
          return previous;
        }

        return [...previous, newMessage];
      });
    };

    socket.on("connect", joinRoom);
    socket.on("disconnect", handleDisconnect);
    socket.on("receiveMessage", handleReceiveMessage);

    if (socket.connected) joinRoom();

    return () => {
      socket.off("connect", joinRoom);
      socket.off("disconnect", handleDisconnect);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [currentUser?._id, partnerId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !currentUser?._id || !partnerId) return;

    if (!socket.connected) {
      setError("Chat connection nahi hai. Backend check karo.");
      return;
    }

    socket.emit("sendMessage", {
      sender: currentUser._id,
      receiver: partnerId,
      message: message.trim(),
    });

    setMessage("");
    setError("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 px-3 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/matches"
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm transition hover:bg-violet-50"
        >
          ← Back to Matches
        </Link>

        <section className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-xl shadow-violet-100/60">
          <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-violet-700 to-indigo-600 px-5 py-5 text-white sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                💬
              </div>

              <div>
                <h1 className="text-xl font-bold sm:text-2xl">
                  SkillSwap Chat
                </h1>
                <p className="mt-1 text-sm text-violet-100">
                  Learn together, grow together
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium">
              <span
                className={`mr-2 inline-block h-2 w-2 rounded-full ${
                  connected ? "bg-green-300" : "bg-red-300"
                }`}
              />
              {connected ? "Connected" : "Offline"}
            </div>
          </header>

          <div className="border-b border-violet-50 bg-violet-50/60 px-5 py-3">
            <p className="text-sm text-gray-600">
              ✨ Be kind, share knowledge and help each other learn.
            </p>
          </div>

          {error && (
            <div className="mx-4 mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-6">
              {error}
            </div>
          )}

          <div className="flex h-[55vh] min-h-80 max-h-[520px] flex-col gap-4 overflow-y-auto bg-gradient-to-b from-white to-violet-50/40 p-4 sm:p-6">
            {loading ? (
              <div className="m-auto text-center">
                <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-violet-100 border-t-violet-600" />
                <p className="text-sm text-gray-500">Loading conversation...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="m-auto max-w-xs text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-100 text-3xl">
                  👋
                </div>
                <h2 className="text-lg font-bold text-gray-800">
                  Start something great!
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Say hello to your skill partner and start exchanging knowledge.
                </p>
              </div>
            ) : (
              messages.map((msg, index) => {
                const senderId =
                  typeof msg.sender === "object"
                    ? msg.sender?._id
                    : msg.sender;

                const isMine =
                  String(senderId) === String(currentUser?._id);

                return (
                  <div
                    key={msg._id || index}
                    className={`flex w-full ${
                      isMine ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[75%] ${
                        isMine
                          ? "rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 text-white"
                          : "rounded-bl-md border border-violet-100 bg-white text-gray-800"
                      }`}
                    >
                      <p
                        className={`mb-1 text-xs font-semibold ${
                          isMine ? "text-violet-100" : "text-violet-600"
                        }`}
                      >
                        {isMine ? "You" : msg.sender?.name || "Partner"}
                      </p>

                      <p className="whitespace-pre-wrap break-words text-sm leading-6">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={sendMessage}
            className="border-t border-violet-100 bg-white p-4 sm:p-5"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 transition focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100 sm:gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2000}
                className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:px-3"
              />

              <button
                type="submit"
                disabled={
                  !currentUser ||
                  !partnerId ||
                  !message.trim() ||
                  !connected
                }
                className="shrink-0 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
              >
                Send <span className="ml-1">➤</span>
              </button>
            </div>

            <p className="mt-3 text-center text-xs text-gray-400">
              Made for learners, powered by SkillSwap 💜
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Chat;