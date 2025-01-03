import React, { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// Create a Context
const SocketContext = createContext(null);

// Create a Provider Component
export const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const socketRef = useRef(null);

  useEffect(() => {
    if (user) {
      // Initialize socket instance if not already created
      if (!socketRef.current) {
        socketRef.current = io("http://localhost:4000", {
          autoConnect: false,
          reconnection: true,
        });
      }

      const socket = socketRef.current;

      // Connect and set up listeners
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
        socket.emit("userConnected", user._id);
      });

      if (!socket.connected) {
        socket.connect();
      }

      // Cleanup on unmount or user change
      return () => {
        if (socket.connected) {
          console.log("Disconnecting socket...");
          socket.emit("userDisconnected", user._id);
          socket.disconnect();
        }
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

// Create a custom hook to use the SocketContext
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
