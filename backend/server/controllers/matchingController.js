import User from "../models/userModel.js";

const getMatches = async (req, res) => {
  try {
    const currentUser = req.user;

    const matches = await User.find({
      _id: { $ne: currentUser._id },
      skillsToTeach: { $in: currentUser.skillsToLearn },
    }).select("-password");

    res.status(200).json({
      message: "Matches fetched successfully",
      matches,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch matches",
      error: error.message,
    });
  }
};

export default getMatches;