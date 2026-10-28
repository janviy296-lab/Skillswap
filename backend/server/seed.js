import bcrypt from "bcryptjs"
import "dotenv/config"
import mongoose from "mongoose"
import User from  "./models/userModel.js"
import Skill from "./models/skillModel.js"


const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const users = [
      {
        name: "Rahul",
        email: "rahul@skillswap.com",
        password: "123456",
        skillsToTeach: ["JavaScript", "React"],
        skillsToLearn: ["Node.js", "MongoDB"],
      },
      {
        name: "Aman",
        email: "aman@skillswap.com",
        password: "123456",
        skillsToTeach: ["Node.js", "MongoDB"],
        skillsToLearn: ["JavaScript", "React"],
      },
      {
        name: "Priya",
        email: "priya@skillswap.com",
        password: "123456",
        skillsToTeach: ["UI/UX Design"],
        skillsToLearn: ["React"],
      },
    ];

await User.deleteMany();

const hashedUsers = await Promise.all(
  users.map(async (user) => ({
    ...user,
    password: await bcrypt.hash(user.password, 10),
  }))
);

const createdUsers = await User.insertMany(hashedUsers);

console.log("Users Seeded Successfully");

  } catch (error) {
    console.log("Database Connection Failed:", error.message);
  }
};

seedData()