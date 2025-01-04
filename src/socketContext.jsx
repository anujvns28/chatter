import React, { createContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// Create the Context
export const SocketContext = createContext(null);

// Define the Provider Component
export const SocketProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const socketRef = useRef(null);
  const [socketReady, setSocketReady] = useState(false);

  useEffect(() => {
    if (user) {
      if (!socketRef.current) {
        socketRef.current = io("http://localhost:4000", {
          autoConnect: false,
          reconnection: true,
        });
      }

      const socket = socketRef.current;

      const handleConnect = () => {
        console.log("Socket connected successss:", socket.id);
        socket.emit("userConnected", user._id);
        setSocketReady(true); // Mark socket as ready
      };

      const handleDisconnect = () => {
        console.log("Socket disconnected");
        setSocketReady(false); // Mark socket as not ready
      };

      const handleConnectError = (error) => {
        console.error("Socket connection error:", error);
      };

      // Add event listeners
      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
      socket.on("connect_error", handleConnectError);

      // Connect socket
      if (!socket.connected) {
        socket.connect();
      }

      return () => {
        // Cleanup on unmount or user change
        if (socket.connected) {
          console.log("Disconnecting socket...");
          socket.emit("userDisconnected", user._id);
          socket.disconnect();
        }

        // Remove event listeners
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
        socket.off("connect_error", handleConnectError);
      };
    } else {
      setSocketReady(false);
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    }
  }, [user]);

  // Render children only if socket is ready
  if (!socketReady) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
