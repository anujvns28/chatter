import { useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// Create socket instance
const socket = io("http://localhost:4000", {
  autoConnect: false, // Prevent auto connection
  reconnection: true,
});

const useSocketConnection = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // Listen for socket connection event
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id); // Log connection status
        // Emit userConnected event once the socket is connected
        socket.emit("userConnected", user._id);
      });

      if (!socket.connected) {
        socket.connect(); // Connect socket if it's not already connected
      }

      // Cleanup on unmount or user change
      return () => {
        if (socket.connected) {
          console.log("Disconnecting socket...");
          socket.disconnect(); // Disconnect when the component unmounts
        }
      };
    }
  }, [user]);

  return socket;
};

export default useSocketConnection;
