import Progress from "../models/progressModel.js";

// Create progress
const createProgress = async (req, res) => {
  try {
    const { skill, topics } = req.body;

    if (!skill || !topics) {
      return res.status(400).json({
        message: "Skill and topics are required",
      });
    }

    const progress = await Progress.create({
      user: req.user._id,
      skill,
      topics,
    });

    res.status(201).json({
      message: "Progress created successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create progress",
      error: error.message,
    });
  }
};

// Get user's progress
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user._id,
    });

    res.status(200).json({
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch progress",
      error: error.message,
    });
  }
};

// Update topic progress
const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { topicName, completed } = req.body;

    const progress = await Progress.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found",
      });
    }

    const topic = progress.topics.find(
      (topic) => topic.name === topicName
    );

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    topic.completed = completed;

    await progress.save();

    res.status(200).json({
      message: "Topic progress updated successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update progress",
      error: error.message,
    });
  }
};

export {
  createProgress,
  getProgress,
  updateProgress,
};