import Dorm from "../models/Dorm.js";
import DormReview from "../models/DormReview.js";

export const createDorm = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const { name } = req.body;

    const newDorm = new Dorm({ schoolName, name });

    const savedDorm = await newDorm.save();
    res.status(201).json(savedDorm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createDormReview = async(req, res) => {
  try {
    const { dormId, userId } = req.params;
    const { location, rating, comment } = req.body;

    const newDormReview = new DormReview({ 
      dormId, 
      userId,
      location,
      rating,
      comment 
    });

    const savedDormReview = await newDormReview.save();
    res.status(201).json(savedDormReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getDorms = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const dorms = await Dorm.find({ schoolName });
    res.status(200).json(dorms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getDormReviews = async(req, res) => {
  try {
    const { dormId } = req.params;
    const dormReviews = await DormReview.find({ dormId });
    res.status(200).json(dormReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserDormReviews = async(req, res) => {
  try {
    const { dormId, userId } = req.params;
    const dormReviews = await DormReview.find({ dormId, userId });
    res.status(200).json(dormReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
