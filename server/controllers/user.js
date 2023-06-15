import ClubReview from "../models/ClubReview.js";
import DormReview from "../models/DormReview.js";
import InternshipReview from "../models/InternshipReview.js";
import ProfessorReview from "../models/ProfessorReview.js";
import User from "../models/User.js";
import { emailSupport } from "../services/email.js";

export const getUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findById({ _id });
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;
    const internshipReviews = await InternshipReview.find({ userId });
    const dormReviews = await DormReview.find({ userId });
    const clubReviews = await ClubReview.find({ userId });
    const professorReviews = await ProfessorReview.find({ userId });
    const reviews = internshipReviews.concat(dormReviews).concat(clubReviews).concat(professorReviews);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendEmailSupport = async (req, res) => {
  try {
    const { user, feedback } = req.body;
    const response = await emailSupport(`${user.firstName} ${user.lastName}`, feedback);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const saveReview = async(req, res) => {
  try {
    const { userId, reviewType, reviewId } = req.params;
    
    // Add one to `savedReviews` based on `userId` and `reviewType`
    await User.findOneAndUpdate({ _id: userId }, {
      $set: {
        [`savedReviews.${reviewId}`]: reviewType,
      }
    });

    const user = await User.findById({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unsaveReview = async(req, res) => {
  try {
    const { userId, reviewId } = req.params;
    
    // Delete one from `savedReviews` based on `userId`
    await User.findOneAndUpdate({ _id: userId }, {
      $unset: {
        [`savedReviews.${reviewId}`]: 1,
      }
    });

    const user = await User.findById({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeReview = async(req, res) => {
  try {
    const { userId, reviewType, reviewId } = req.params;
    
    // Push to `likedReviews` based on `userId`
    await User.updateOne(
      { _id: userId }, 
      { $push: { likedReviews: reviewId } },
    );

    // Increment Review's `numberOfLikes`
    if (reviewType === "internships") {
      await InternshipReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: 1 }
      });
    } else if (reviewType === "dorms") {
      await DormReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: 1 }
      });
    } else if (reviewType === "clubs") {
      await ClubReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: 1 }
      });
    } else if (reviewType === "professors") {
      await ProfessorReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: 1 }
      });
    } else {
      res.status(404).json({ message: "Review Type is not found." });
    }

    const user = await User.findById({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const unlikeReview = async(req, res) => {
  try {
    const { userId, reviewType, reviewId } = req.params;
    
    // Pull from `likedReviews` based on `userId`
    await User.updateOne(
      { _id: userId }, 
      { $pull: { likedReviews: reviewId } },
    );

    // Decrement Review's `numberOfLikes`
    if (reviewType === "internships") {
      await InternshipReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: -1 }
      });
    } else if (reviewType === "dorms") {
      await DormReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: -1 }
      });
    } else if (reviewType === "clubs") {
      await ClubReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: -1 }
      });
    } else if (reviewType === "professors") {
      await ProfessorReview.updateOne(
        {_id: reviewId}, 
        { $inc: { numberOfLikes: -1 }
      });
    } else {
      return res.status(404).json({ message: "Review Type is not found." });
    }

    const user = await User.findById({ _id: userId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

