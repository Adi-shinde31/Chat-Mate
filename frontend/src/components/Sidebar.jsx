import { useEffect, useState } from "react";
import { Users, X } from "lucide-react";

import { useChatStore } from "../store/useChatStore";
import { SidebarSkeleton } from "./skeletons/SidebarSkeleton";
import { useAuthStore } from "../store/useAuthStore";

export function Sidebar({ isOpen, onClose }) {
  const {
    users,
    isUsersLoading,
    getUsers,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers?.includes(user._id))
    : users;

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed lg:static z-50
          h-full w-64 border-r border-gray-200
          bg-base-100 p-4 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 text-base-content">
          <div className="flex items-center gap-2 font-semibold">
            <Users size={18} />
            <span>Contacts</span>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Online toggle */}
        <label className="flex items-center gap-2 text-xs cursor-pointer mb-4">
          <input
            type="checkbox"
            className="checkbox checkbox-xs"
            checked={showOnlineOnly}
            onChange={() => setShowOnlineOnly((prev) => !prev)}
          />
          <span>Online only</span>
        </label>

        {/* Users list */}
        <div className="flex-1 space-y-2 overflow-y-auto">
          {filteredUsers.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers?.includes(user._id);

            return (
              <button
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  onClose(); // 🔥 auto close on mobile
                }}
                className={`
                  w-full flex items-center gap-3 p-2 rounded-lg transition
                  text-left
                  ${
                    isSelected
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-200 text-base-content"
                  }
                `}
              >
                <img
                  src={user.profilePicture || "/avatar.jpg"}
                  alt={user.fullName}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">
                    {user.fullName}
                  </div>
                  <div
                    className={`text-xs ${
                      isOnline
                        ? "text-success"
                        : "text-base-content/50"
                    }`}
                  >
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            );
          })}

          {filteredUsers.length === 0 && (
            <div className="text-center text-sm text-base-content/50 mt-10">
              No users found.
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
