import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { NoChatSelected } from "./NoChatSelected";
import { MessageInput } from "./MessageInput";
import { ChatHeader } from "./ChatHeader";

export function ChatContainer() {
  const {
    selectedUser,
    isMessagesLoading,
    messages,
    getMessages,
    subscribeToNewMessages,
    unsubscribeFromNewMessages
  } = useChatStore();

  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToNewMessages();
      return () => {
        unsubscribeFromNewMessages();
      };
    }
  }, [selectedUser?._id, getMessages, subscribeToNewMessages, unsubscribeFromNewMessages]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) return <NoChatSelected />;

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading messages...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col min-h-0 bg-base-100">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {messages.map((msg) => {
          const isMe = String(msg.senderId) === String(authUser._id);

          return (
            <div
              key={msg._id}
              className={`chat ${isMe ? "chat-end" : "chat-start"} flex-col`}
            >
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img
                    src={
                      isMe
                        ? authUser.profilePicture || "/avatar.jpg"
                        : selectedUser.profilePicture || "/avatar.jpg"
                    }
                    alt="avatar"
                  />
                </div>
              </div>

              {/* Bubble */}
              <div className="chat-bubble max-w-xs break-words">
                {msg.text}

                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="mt-2 rounded-lg max-w-full"
                  />
                )}
              </div>

              {/* Time */}
              <div className="chat-footer text-xs opacity-50 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
}
