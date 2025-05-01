// import React, { useState } from "react";
// import axios from "axios";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { sender: "user", text: input }];
//     setMessages(newMessages);

//     try {
//       const res = await axios.post("http://localhost:5004/api/chat", { message: input });
//       const botReply = res.data.reply;
//       setMessages([...newMessages, { sender: "bot", text: botReply }]);
//     } catch (err) {
//       setMessages([...newMessages, { sender: "bot", text: "Error contacting chatbot." }]);
//     }

//     setInput("");
//   };

//   return (
//     <div className="chat-container p-4 max-w-md mx-auto">
//       <div className="chat-box h-96 overflow-y-auto bg-gray-100 rounded-lg p-3 mb-2 shadow-md">
//         {messages.map((msg, index) => (
//           <div key={index} className={`my-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
//             <span className={`inline-block px-3 py-2 rounded-xl ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           className="flex-grow border border-gray-300 rounded-l px-3 py-2"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Ask me anything..."
//         />
//         <button className="bg-green-600 text-white px-4 rounded-r" onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;


import React, { useState } from "react";
import axios from "axios";
import Navbar from "./navbars/Navbar-actions";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      const res = await axios.post("http://localhost:5004/api/chat", { message: input });
      const botReply = res.data.reply;
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "Error contacting chatbot." }]);
    }

    setInput("");
  };

  return (
    <div>
        <Navbar />
    <div className="chat-container p-4 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
      {/* Chat Header */}
      <div className="mb-4 pb-2 border-b border-[#C1E1C1]">
        <h2 className="text-xl font-semibold text-[#2A4B3C]">AgriVision pro Assistant</h2>
        
      </div>

      {/* Chat Messages */}
      <div className="chat-box h-96 overflow-y-auto mb-4 pr-2">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-3`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-3 ${
                msg.sender === "user" 
                  ? "bg-[#2A4B3C] text-white" 
                  : "bg-[#C1E1C1] text-[#2A4B3C]"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-grow border-2 border-[#C1E1C1] rounded-xl px-4 py-2 
                   focus:outline-none focus:border-[#2A4B3C] transition-colors"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button
          className="bg-[#2A4B3C] text-white px-5 rounded-xl hover:bg-[#3C6B5C] 
                   transition-colors duration-200 flex items-center justify-center"
          onClick={sendMessage}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>

      <style jsx>{`
        .chat-box::-webkit-scrollbar {
          width: 6px;
        }
        .chat-box::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .chat-box::-webkit-scrollbar-thumb {
          background: #C1E1C1;
          border-radius: 4px;
        }
        .chat-box::-webkit-scrollbar-thumb:hover {
          background: #AED6AE;
        }
      `}</style>
    </div>
    </div>
  );
};

export default Chatbot;