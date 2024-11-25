import React from "react";

const Chats = () => {
  const chatList = [
    { id: 1, name: "John Doe", lastMessage: "How are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "Let’s meet tomorrow!" },
    { id: 3, name: "Michael", lastMessage: "Good night!" },
  ];

  return (
    <div className="flex flex-col gap-3 ">
      <div className="bg-white px-4 py-1 rounded-lg shadow-md w-full min-w-[220px]   h-full overflow-y-auto border border-black">
        <h3 className="text-lg font-bold mb-2">Groups</h3>
        <ul>
          {chatList.map((chat) => (
            <li key={chat.id} className="mb-2 p-2 hover:bg-gray-100 rounded">
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

      <div className="bg-white px-4 py-1 rounded-lg shadow-md w-full min-w-[220px]   h-[440px] overflow-y-auto border border-black">
        <h3 className="text-lg font-bold mb-2">Chats</h3>
        <ul>
          {chatList.map((chat) => (
            <li key={chat.id} className="mb-2 p-2 hover:bg-gray-100 rounded">
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
    </div>
  );
};

export default Chats;
