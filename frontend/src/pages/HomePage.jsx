import { useChatStore } from "../store/useChatStore";
import { Sidebar } from "../components/Sidebar";
import { ChatContainer } from "../components/ChatContainer";
import { NoChatSelected } from "../components/NoChatSelected";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen flex overflow-hidden bg-base-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Area */}
      <main className="flex-1 flex">
        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
      </main>
    </div>
  );
};

export default HomePage;
