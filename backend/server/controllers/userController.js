const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      message: "Profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};



const updateProfile = async (req, res) => {
  try {
    const {
      name,
      skillsToTeach,
      skillsToLearn,
    } = req.body;

    const user = req.user;

    user.name = name || user.name;
    user.skillsToTeach = skillsToTeach || user.skillsToTeach;
    user.skillsToLearn = skillsToLearn || user.skillsToLearn;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export {getProfile , updateProfile};