import React, { useEffect, useState } from 'react';
import { useChatStore } from "../store/useChatStore.js";
import Sidebar from "../komponenter/Sidebar.jsx";
import NoChatSelected from "../komponenter/NoChatSelected.jsx";
import ChatContainer from "../komponenter/ChatContainer.jsx";
import { saveAs } from 'file-saver'; // To save the file


const HomePage = () => {
 const [fetchTimes, setFetchTimes] = useState([]); // Store the fetch times
 const { selectedUser, getMessage } = useChatStore();


 // Function to perform the fetch 10 times and track the times
 const fetchMessagesMultipleTimes = async () => {
   let times = [];
   for (let i = 0; i < 10; i++) {
     const startTime = performance.now(); // Start the timer


     await getMessage(selectedUser._id); // Fetch the messages for the selected user


     const endTime = performance.now(); // End the timer
     const fetchTime = endTime - startTime; // Calculate the time it took


     times.push({
       attempt: i + 1,
       fetchTime: fetchTime.toFixed(2) // Round the time to two decimal places
     });


     console.log(`Fetch ${i + 1}: ${fetchTime.toFixed(2)} ms`); //console for debugging
   }


   // Store the results in the state
   setFetchTimes(times);


   // Create a JSON blob from the results
   const fileBlob = new Blob([JSON.stringify(times, null, 2)], { type: 'application/json' });


   // Download the file
   saveAs(fileBlob, 'fetch-times.json');
 };


 // Call the fetchMessagesMultipleTimes function when the component mounts
 useEffect(() => {
   if (selectedUser) {
     fetchMessagesMultipleTimes();
   }
 }, [selectedUser]); // Fetch when selectedUser changes


 return (
   <div className="h-screen bg-base-200">
     <div className="flex items-center justify-center pt-20 px-4">
       <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
         <div className="flex h-full rounded-lg overflow-hidden">
           <Sidebar />


           {/* If no user is selected, show NoChatSelected */}
           {!selectedUser ? <NoChatSelected /> : <ChatContainer />}


         </div>
       </div>
     </div>


     {/*Shows fetch times */}
     <div>
       <h2>Fetch Times</h2>
       {fetchTimes.length > 0 ? (
         <ul>
           {fetchTimes.map((time, index) => (
             <li key={index}>Fetch {time.attempt}: {time.fetchTime} ms</li>
           ))}
         </ul>
       ) : (
         <p>No fetch times yet.</p>
       )}
     </div>
   </div>
 );
};


export default HomePage;
