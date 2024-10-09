import React from "react";

const ChatField = () => {
  return (
    <div className="flex flex-col bg-white h-full w-full p-4 rounded-lg shadow-md border border-black">
      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto mb-4">
        {/* Example messages */}
        <div className="flex justify-start mb-4">
          <div className="bg-gray-100 p-3 rounded-lg max-w-md">
            <p>Hey! How’s it going?</p>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <div className="bg-blue-500 text-white p-3 rounded-lg max-w-md">
            <p>I'm doing great! What about you?</p>
          </div>
        </div>
      </div>

      {/* Input field */}
      <div className="flex items-center space-x-3">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Type your message..."
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatField;
