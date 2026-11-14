import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cors from "cors";

import connectDB from "./config/dbConfig.js";
import User from "./models/userModel.js";
import Message from "./models/messageModel.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import skillRoutes from "./routes/skillRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
const server = createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL
].filter(Boolean).flatMap((origin) => origin.split(",").map((item) => item.trim()));

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

// Socket.IO JWT authentication
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication required"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new Error("User not found"));
    }

    socket.data.userId = String(user._id);
    next();
  } catch (error) {
    next(new Error("Invalid or expired token"));
  }
});

io.on("connection", (socket) => {
  console.log("Authenticated user connected:", socket.data.userId);

  socket.data.chatPartners = new Set();

  socket.on("joinChat", async ({ partnerId } = {}) => {
    try {
      const userId = socket.data.userId;

      if (!partnerId || partnerId === userId) return;

      const partner = await User.findById(partnerId);

      if (!partner) return;

      const roomId = [userId, String(partner._id)].sort().join("_");

      await socket.join(roomId);
      socket.data.chatPartners.add(String(partner._id));
    } catch (error) {
      console.log("Join chat error:", error.message);
    }
  });

  socket.on("sendMessage", async (data = {}) => {
    try {
      const sender = socket.data.userId;
      const { receiver, message } = data;

      if (!receiver || !message?.trim()) return;
      if (sender === receiver) return;

      // User must have joined this conversation first
      if (!socket.data.chatPartners.has(String(receiver))) return;

      const partner = await User.findById(receiver);
      if (!partner) return;

      const newMessage = await Message.create({
        sender,
        receiver,
        message: message.trim(),
      });

      const roomId = [sender, String(partner._id)].sort().join("_");

      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.log("Message save error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.data.userId);
  });
});

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/ai/assessment", assessmentRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("SkillSwap Backend is Running");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});