import "dotenv/config";
import express from "express";
import {createServer} from "http";
import {Server} from "socket.io"
import connectDB from "./config/dbConfig.js";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import skillRoutes from "./routes/skillRoutes.js"
import aiRoutes from "./routes/aiRoutes.js"
import cors from "cors"
import assessmentRoutes from "./routes/assessmentRoutes.js"
import progressRoutes from "./routes/progressRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"
import Message from "./models/messageModel.js";
import messageRoutes from "./routes/messageRoutes.js"

const app = express();
 const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinChat", ({ userId, partnerId }) => {
    if (!userId || !partnerId || userId === partnerId) return;

    const roomId = [userId, partnerId].sort().join("_");
    socket.join(roomId);
  });

  socket.on("sendMessage", async (data) => {
    try {
      const { sender, receiver, message } = data;

      if (!sender || !receiver || !message?.trim()) return;
      if (sender === receiver) return;

      const newMessage = await Message.create({
        sender,
        receiver,
        message: message.trim(),
      });

      const roomId = [sender, receiver].sort().join("_");

      io.to(roomId).emit("receiveMessage", newMessage);
    } catch (error) {
      console.log("Message save error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
app.use (cors())

const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

//register user
app.use("/api/auth" , authRoutes)

//login user
app.use("/api/users" , userRoutes)

//skill routes
app.use("/api/skills" , skillRoutes)

//ai Routes
app.use("/api/ai", aiRoutes)

//assessment Routes
app.use("/api/ai/assessment", assessmentRoutes)

//progress Routes
app.use("/api/progress", progressRoutes)

//review Routes
app.use("/api/reviews", reviewRoutes)

// session Routes
app.use("/api/sessions", sessionRoutes)

//message Routes
app.use("/api/messages", messageRoutes)

app.get("/", (req, res) => {
  res.send("SkillSwap Backend is Running");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});