import mongoose from "mongoose";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";

const getConversation = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(partnerId)) {
      return res.status(400).json({
        message: "Invalid partner ID",
      });
    }

    if (userId.toString() === partnerId) {
      return res.status(400).json({
        message: "You cannot chat with yourself",
      });
    }

    const partner = await User.findById(partnerId);

    if (!partner) {
      return res.status(404).json({
        message: "Partner not found",
      });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: partnerId },
        { sender: partnerId, receiver: userId },
      ],
    })
      .populate("sender", "name")
      .sort({ createdAt: 1 });

    res.status(200).json({ messages });

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

export default getConversation;