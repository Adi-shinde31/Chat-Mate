import { useChatStore } from "../store/useChatStore";
import { NoChatSelected } from "./NoChatSelected";

export function ChatContainer() {
  const { selectedUser } = useChatStore();

  if (!selectedUser) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex-1 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b font-medium">
        Chat with {selectedUser.fullName}
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        Messages go here
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        Message input here
      </div>
    </div>
  );
}
