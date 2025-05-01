import React, { useState, useContext, useEffect } from "react";
import ChatContext from "../context/chat/chatContext";

export default function ChatApp({ userId }) {
  const {
    chats,
    activeChat,
    setActiveChat,
    messages,
    sendMessage,
    setChats,
    fetchChats
  } = useContext(ChatContext);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchChats();
  },[])

  const handleChatClick = async (chat) => {
    setActiveChat(chat);
    if (chat.unreadCount > 0) {
      try {
        const res = await fetch(`http://localhost:5005/api/chat/markAsRead/${chat.bidId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "auth-token": localStorage.getItem("token") },
        });
        if (res.ok) {
          setChats((prevChats) =>
            prevChats.map((c) => (c.bidId === chat.bidId ? { ...c, unreadCount: 0 } : c))
          );
        } else {
          console.error("Failed to mark messages as read");
        }
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const handleEnterSendMessage = (event) => {
    if (event.key === "Enter" && input !== "") {
        handleSendMessage()
    }
  };

  return (
    // <div className="flex h-screen justify-center items-center" style={{backgroundColor : "#E4FFF0"}}>
    //   <div className="h-5/6 w-5/6 flex border-2 border-lime-400 rounded-xl">
    //     {/* Chat Switcher */}
    //     <div className="w-1/4 bg-white p-4 border-r border-gray-300 overflow-y-auto">
    //       <h2 className="text-2xl font-extrabold mb-2">CHATS</h2>
    //       <div className="h-[2px] bg-gray-800 w-full my-4"></div>
    //       {chats && chats.length > 0 ? (
    //         chats.map((chat, index) => (
    //           <div
    //             key={index}
    //             onClick={() => handleChatClick(chat)}
    //             className={`p-2 cursor-pointer rounded-lg flex items-center justify-between my-5 ${activeChat && activeChat.bidId === chat.bidId ? "bg-lime-400 text-gray-900" : "bg-gray-200"
    //               }`}
    //           >
    //             <img
    //               src={`http://localhost:5000/api/user/profilepicture/${chat.receiverId}`}
    //               alt="Profile"
    //               className="w-8 h-8 rounded-full mr-2 border"
    //             />
    //             <span>{chat.chatTitle}</span>
    //             {chat.unreadCount > 0 && (
    //               <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
    //                 {chat.unreadCount}
    //               </span>
    //             )}
    //           </div>
    //         ))
    //       ) : (
    //         <div>No chats available</div>
    //       )}
    //     </div>

    //     {/* Active Chat Window */}
    //     <div className="flex-1 flex flex-col justify-between p-4">
    //       <div className="h-64 overflow-y-auto p-2 border-b border-gray-300" style={{ height: "93%" }}>
    //         {activeChat ? (
    //           messages.length > 0 ? (
    //             messages.map((msg, index) => (
    //               <div key={index} className={`flex items-end my-3 ${msg.senderId === userId ? "justify-end" : "justify-start"}`}>
    //                 {msg.senderId !== userId && (
    //                   <img
    //                     src={`http://localhost:5000/api/user/profilepicture/${msg.senderId}`}
    //                     alt="Profile"
    //                     className="w-8 h-8 rounded-full mr-2 border"
    //                   />
    //                 )}
    //                 <div className={`p-2 rounded-lg w-fit ${msg.senderId === userId ? "ml-auto bg-lime-400 text-gray-900" : "mr-auto bg-green-950 text-white"}`}>
    //                   {msg.message}
    //                 </div>
    //               </div>
    //             ))
    //           ) : (
    //             <div className="text-center">No messages yet</div>
    //           )
    //         ) : (
    //           <div className="text-center">Select a chat to view messages</div>
    //         )}
    //       </div>
    //       <div className="flex mt-2">
    //         <input
    //           type="text"
    //           className="flex-1 p-2 border rounded-lg"
    //           placeholder="Type a message..."
    //           value={input}
    //           onChange={(e) => setInput(e.target.value)}
    //           onKeyDown={handleEnterSendMessage}
    //         />
    //         <button
    //           className="ml-2 bg-green-950 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
    //           onClick={handleSendMessage}
    //           disabled={!input.trim()}
    //         >
    //           Send
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  
     <div className="flex h-screen bg-[#F5FCF7]">
      <div className="flex w-full max-w-7xl mx-auto h-[90vh] my-auto rounded-2xl overflow-hidden shadow-xl">
        {/* Chat List */}
        <div className="w-1/3 bg-white border-r border-[#C1E1C1] flex flex-col">
          <div className="p-6 bg-[#C1E1C1]">
            <h2 className="text-2xl font-bold text-gray-800">Conversations</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {chats && chats.length > 0 ? (
              chats.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => handleChatClick(chat)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    activeChat?.bidId === chat.bidId
                      ? "bg-[#C1E1C1]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9olRhoEF2BaR6EQBQd48xoa8Wucs7Vml6Q&s`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-[#C1E1C1]"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">{chat.chatTitle}</p>
                      </div>
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className="bg-[#2a4b3c] text-white px-2 py-1 rounded-full text-xs">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                No active conversations
              </div>
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-white">
          {activeChat ? (
            <>
              <div className="p-4 border-b border-[#C1E1C1] flex items-center">
                <img
                  src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE9olRhoEF2BaR6EQBQd48xoa8Wucs7Vml6Q&s`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#C1E1C1]"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{activeChat.chatTitle}</h3>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-[#f8fcf9]">
                {messages.length > 0 ? (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"} mb-4`}
                    >
                      <div
                        className={`max-w-[70%] rounded-xl p-3 ${
                          msg.senderId === userId
                            ? "bg-[#C1E1C1] text-gray-800"
                            : "bg-[#2a4b3c] text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    Start a new conversation
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-[#C1E1C1]">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleEnterSendMessage}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border-2 border-[#C1E1C1] rounded-xl focus:outline-none focus:border-[#2a4b3c]"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className={`px-6 py-2 rounded-xl font-medium ${
                      input.trim()
                        ? "bg-[#2a4b3c] text-white hover:bg-[#3c6b5c]"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#f8fcf9]">
              <p className="text-gray-500">Select a chat to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}