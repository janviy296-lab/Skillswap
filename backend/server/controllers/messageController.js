import Message from "../models/messageModel.js";

const getConversation = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const userId = req.user._id;

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
      error: error.message,
    });
  }
};

export default getConversation;