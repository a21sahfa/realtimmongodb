import React, { useEffect, useState } from 'react';
import { useChatStore } from "../store/useChatStore.js";


import Sidebar from "../komponenter/Sidebar.jsx";
import NoChatSelected from "../komponenter/NoChatSelected.jsx";
import ChatContainer from "../komponenter/ChatContainer.jsx";


const HomePage = () => {
 const { selectedUser, sendMessage } = useChatStore();
 const [sentCount, setSentCount] = useState(0);
 const MAX = 1001;


 // Automatically send 10 messages when a user is selected
 useEffect(() => {
   if (!selectedUser || sentCount >= MAX) return;


   const interval = setInterval(() => {
     sendMessage({ text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ${sentCount + 1}` });
     setSentCount((prev) => prev + 1);
   }, 500); // small delay between sends


   return () => clearInterval(interval);
 }, [selectedUser, sentCount]);


 return (
   <div className="h-screen bg-base-200">
     <div className="flex items-center justify-center pt-20 px-4">
       <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
         <div className="flex h-full rounded-lg overflow-hidden">
           <Sidebar />
           {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
         </div>
       </div>
     </div>
     {sentCount > 0 && (
       <div className="text-center text-xs text-gray-500 mt-2">
         Sent {sentCount}/{MAX} test messages...
       </div>
     )}
   </div>
 );
};


export default HomePage;