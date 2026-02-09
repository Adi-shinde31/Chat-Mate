import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

export function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="h-16 px-4 border-b border-base-300 flex items-center justify-between bg-base-100">
      {/* Left: User info */}
      <div className="flex items-center gap-3">
        <img
          src={selectedUser.profilePicture || "/avatar.jpg"}
          alt={selectedUser.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="leading-tight">
          <h2 className="font-semibold text-sm text-base-content">
            {selectedUser.fullName}
          </h2>
          <p
            className={`text-xs ${
              isOnline ? "text-success" : "text-base-content/50"
            }`}
          >
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right: Close button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost btn-sm"
      >
        <X size={18} />
      </button>
    </div>
  );
}
