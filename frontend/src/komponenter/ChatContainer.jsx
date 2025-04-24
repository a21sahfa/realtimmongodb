import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageHead from "./MessageHead";
import MessageInput from "./MessageInput";
import MessageSkelett from "./skelett/MessageSkelett";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../Lib/time";

const ChatContainer = () => {
  const {
    messages,
    getMessage,
    isMessagesLoading,
    selectedUser,
    subToMes,
    unsubFromMes,
    renderStartTime, // <- timer start value from Zustand
  } = useChatStore();
  const { authUser } = useAuthStore();

  const hasMeasured = useRef(false); // prevents multiple loggings

  // Fetch messages and subscribe to socket updates
  useEffect(() => {
    getMessage(selectedUser._id);
    subToMes();

    return () => unsubFromMes();
  }, [selectedUser._id, getMessage, subToMes, unsubFromMes]);

  // Measure render time once messages have been received and rendered
  useEffect(() => {
    if (messages.length > 0 && renderStartTime && !hasMeasured.current) {
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const duration = endTime - renderStartTime;
        console.log(`⏱️ Fetch + render time: ${duration.toFixed(2)} ms`);
        hasMeasured.current = true;
      });
    }
  }, [messages, renderStartTime]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <MessageHead />
        <MessageSkelett />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <MessageHead />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilBild || "avatar.png"
                      : selectedUser.profilBild || "avatar.png"
                  }
                  alt="profilBild"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex">
              {message.bild && (
                <img
                  src={message.bild}
                  alt="bild"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
