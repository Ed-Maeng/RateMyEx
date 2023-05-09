import Internship from "../models/Internship.js";
import InternshipReview from "../models/InternshipReview.js";

export const createInternship = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const { name } = req.body;

    const newInternship = new Internship({ schoolName, name });

    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createInternshipReview = async(req, res) => {
  try {
    const { internshipId, userId } = req.params;
    const { role, location, rating, comment } = req.body;

    const newInternshipReview = new InternshipReview({ 
      internshipId, 
      userId,
      role,
      location,
      rating,
      comment 
    });

    const savedInternshipReview = await newInternshipReview.save();
    res.status(201).json(savedInternshipReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getInternships = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const internships = await Internship.find({ schoolName });
    res.status(200).json(internships);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getInternshipReviews = async(req, res) => {
  try {
    const { internshipId } = req.params;
    const internshipReviews = await InternshipReview.find({ internshipId });
    res.status(200).json(internshipReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserInternshipReviews = async(req, res) => {
  try {
    const { internshipId, userId } = req.params;
    const internshipReviews = await Internship.find({ internshipId, userId });
    res.status(200).json(internshipReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
