import React, { useEffect, useState } from 'react';
import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../komponenter/Sidebar.jsx";
import NoChatSelected from "../komponenter/NoChatSelected.jsx";
import ChatContainer from "../komponenter/ChatContainer.jsx";

const HomePage = () => {
  const { selectedUser, sendMessage } = useChatStore();
  const [sentCount, setSentCount] = useState(0);
  const MAX = 400;

  useEffect(() => {
    if (!selectedUser || sentCount >= MAX) return;

    const interval = setInterval(() => {
      sendMessage({ text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel tincidunt blandit, orci risus fermentum nisi, vitae tincidunt ex lectus ac turpis. Quisque vitae magna non nulla vestibulum dapibus. Fusce efficitur sem vel orci tincidunt, vitae suscipit augue porttitor, non lacinia quam. ${sentCount + 1}` });
      setSentCount((prev) => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, [selectedUser, sentCount]);

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch pt-20 px-4 max-w-7xl mx-auto h-full space-y-4 lg:space-y-0 lg:space-x-4">

        {/* Main Chat Area */}
        <div className="flex-1 bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-800 rounded-2xl shadow-xl h-full overflow-hidden border border-gray-700 backdrop-blur-xl bg-opacity-30">
          <div className="flex h-full">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>

        {/* Message Sent Status Box */}
        <div className="w-full lg:w-80 bg-gradient-to-br from-indigo-700 to-purple-800 border border-gray-700 rounded-2xl shadow-lg p-6 overflow-auto max-h-[calc(100vh-8rem)]">
          <h2 className="text-xl font-bold text-indigo-400 mb-6">Auto Message Test</h2>
          {sentCount > 0 ? (
            <ul className="space-y-4">
              {[...Array(sentCount)].map((_, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-blue-800 to-indigo-600 p-4 rounded-lg flex justify-between items-center border border-gray-600 shadow-md transition-all duration-300 hover:scale-105"
                >
                  <span className="text-gray-300">Message {index + 1}</span>
                  <span className="text-indigo-300 font-medium">Sent</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Waiting for user selection...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
