import Review from "../models/reviewModel.js";

const createReview = async (req, res) => {
  try {
    const { reviewedUser, rating, comment } = req.body;

    if (!reviewedUser || !rating) {
      return res.status(400).json({
        message: "User and rating are required",
      });
    }

    const review = await Review.create({
      reviewer: req.user._id,
      reviewedUser,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add review",
      error: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewedUser: req.params.userId,
    })
      .populate("reviewer", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

export { createReview, getReviews };