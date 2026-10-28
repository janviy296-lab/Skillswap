import Skill from "../models/skillModel.js";

const addSkill = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      level,
    } = req.body;

    if (!name || !description || !category || !level) {
      return res.status(400).json({
        message: "Please fill all skill details",
      });
    }

    const skill = await Skill.create({
      name,
      description,
      category,
      level,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Skill added successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add skill",
      error: error.message,
    });
  }
};



const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    res.status(200).json({
      message: "Skills fetched successfully",
      skills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
};




const updateSkill = async (req, res) => {
  try {
    const { name, description, category, level } = req.body;

    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only update your own skill",
      });
    }

    skill.name = name || skill.name;
    skill.description = description || skill.description;
    skill.category = category || skill.category;
    skill.level = level || skill.level;

    await skill.save();

    res.status(200).json({
      message: "Skill updated successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update skill",
      error: error.message,
    });
  }
};


const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    if (skill.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only delete your own skill",
      });
    }

    await skill.deleteOne();

    res.status(200).json({
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete skill",
      error: error.message,
    });
  }
};

const getSingleSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found",
      });
    }

    res.status(200).json({
      message: "Skill fetched successfully",
      skill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch skill",
      error: error.message,
    });
  }
};

export { addSkill , getSkills , updateSkill , deleteSkill , getSingleSkill};