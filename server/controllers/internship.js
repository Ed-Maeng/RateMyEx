import Internship from "../models/Internship.js";

export const createInternshipReview = async(req, res) => {
  try {
    const { userId, schoolId } = req.params;
    const {
      name, 
      role,
      location,
      rating,
      comment 
    } = req.body;

    const newInternship = new Internship({ 
      userId, 
      schoolId,
      name, 
      role,
      location,
      rating,
      comment 
    });

    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getInternshipReviews = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const internship = await Internship.find({ schoolId });
    res.status(200).json(internship);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserInternshipReviews = async(req, res) => {
  try {
    const { userId, schoolId } = req.params;
    const internship = await Internship.find({ schoolId, userId });
    res.status(200).json(internship);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
