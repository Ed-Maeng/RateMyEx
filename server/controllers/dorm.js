import Dorm from "../models/Dorm.js";

export const createDormReview = async(req, res) => {
  try {
    const { userId, schoolId } = req.params;
    const {
      name, 
      location,
      rating,
      comment 
    } = req.body;

    const newDorm = new Dorm({ 
      userId, 
      schoolId,
      name, 
      location,
      rating,
      comment 
    });

    const savedDorm = await newDorm.save();
    res.status(201).json(savedDorm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getDormReviews = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const dorm = await Dorm.find({ schoolId });
    res.status(200).json(dorm);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserDormReviews = async(req, res) => {
  try {
    const { userId, schoolId } = req.params;
    const dorm = await Dorm.find({ schoolId, userId });
    res.status(200).json(dorm);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
