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
    <div className="h-screen flex overflow-hidden bg-base-100">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">

        {/* Mobile Top Bar */}
        <div className="lg:hidden h-14 flex items-center px-4 border-b border-base-300">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="ml-3 font-semibold">Contacts</h1>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex">
          {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
        </div>

      </main>
    </div>
  );
};

export default HomePage;
