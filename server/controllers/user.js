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
    const reviews = await internshipReviews.concat(dormReviews).concat(clubReviews).concat(professorReviews);
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
