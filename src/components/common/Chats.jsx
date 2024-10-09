import React from "react";

const Chats = () => {
  const chatList = [
    { id: 1, name: "John Doe", lastMessage: "How are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "Let’s meet tomorrow!" },
    { id: 3, name: "Michael", lastMessage: "Good night!" },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-[30%] min-w-[270px]   h-full overflow-y-auto border border-black">
      <h3 className="text-lg font-bold mb-4">Chats</h3>
      <ul>
        {chatList.map((chat) => (
          <li key={chat.id} className="mb-4 p-2 hover:bg-gray-100 rounded">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div>
                <h4 className="font-semibold">{chat.name}</h4>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chats;
