import { io } from "socket.io-client";

const socket = io("https://skillswap-ts6q.onrender.com", {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

export default socket;