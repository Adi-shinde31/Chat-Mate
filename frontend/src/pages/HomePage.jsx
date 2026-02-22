import { useState } from "react";
import { Menu } from "lucide-react";

import { useChatStore } from "../store/useChatStore";
import { Sidebar } from "../components/Sidebar";
import { ChatContainer } from "../components/ChatContainer";
import { NoChatSelected } from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex overflow-hidden bg-base-100 min-h-0">

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-h-0 relative">

        <div className="lg:hidden h-14 flex items-center px-4 border-b border-base-300">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="ml-3 font-semibold">Contacts</h1>
        </div>

        <div className="flex-1 min-h-0">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>

      </main>
    </div>
  );
};
export default HomePage;
