import { useChatStore } from "../store/useChatStore";
import { Sidebar } from "../components/Sidebar";
import { ChatContainer } from "../components/ChatContainer";
import { NoChatSelected } from "../components/NoChatSelected";
const HomePage = () => {
    const { selectedUser } = useChatStore();

    return (
        <div>
            <div>
                <Sidebar />
                {!selectedUser ? <NoChatSelected /> : <ChatContainer />}

            </div>
        </div>
    );
}

export default HomePage;