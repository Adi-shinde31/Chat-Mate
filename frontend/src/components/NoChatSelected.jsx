import { MessageSquare } from "lucide-react";

export const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-gray-500">
      <MessageSquare size={48} className="mb-4" />
      <h2 className="text-2xl font-semibold">No Chat Selected</h2>
      <p className="mt-2 text-sm">
        Please select a chat to start messaging
      </p>
    </div>
  );
};
