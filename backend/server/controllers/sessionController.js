import Session from "../models/sessionModel.js";

const createSession = async (req, res) => {
  try {
    const { partner, skill, date, time } = req.body;

    if (!partner || !skill || !date || !time) {
      return res.status(400).json({
        message: "Partner, skill, date and time are required",
      });
    }

    const session = await Session.create({
      requester: req.user._id,
      partner,
      skill,
      date,
      time,
    });

    res.status(201).json({
      message: "Session request created successfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create session",
      error: error.message,
    });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({
      $or: [
        { requester: req.user._id },
        { partner: req.user._id },
      ],
    })
      .populate("requester", "name email")
      .populate("partner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sessions",
      error: error.message,
    });
  }
};

const updateSessionStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const session = await Session.findOne({
      _id: req.params.id,
      partner: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    session.status = status;

    await session.save();

    res.status(200).json({
      message: "Session status updated",
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update session",
      error: error.message,
    });
  }
};

export {
  createSession,
  getSessions,
  updateSessionStatus,
};