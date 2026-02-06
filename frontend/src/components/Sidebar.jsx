import { useEffect } from "react";
import { Users } from "lucide-react";

import { useChatStore } from "../store/useChatStore";
import { SidebarSkeleton } from "./skeletons/SidebarSkeleton";

export function Sidebar() {
  const {
    users,
    isUsersLoading,
    getUsers,
    setSelectedUser,
    selectedUser,
  } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="w-64 h-screen border-r border-gray-200 p-4 flex flex-col bg-base-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 font-semibold text-base-content">
        <Users size={18} />
        <span>Contacts</span>
      </div>

      {/* Users list */}
      <div className="flex-1 space-y-2 overflow-y-auto">
        {users.map((user) => {
          const isSelected = selectedUser?._id === user._id;

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                w-full flex items-center gap-3 p-2 rounded-lg transition
                text-left
                ${isSelected
                  ? "bg-primary/15 text-base-content"
                  : "hover:bg-base-200 text-base-content"}
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
                    user.isOnline
                      ? "text-success"
                      : "text-base-content/50"
                  }`}
                >
                  {user.isOnline ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
