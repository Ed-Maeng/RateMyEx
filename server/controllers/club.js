import Club from "../models/Club.js";
import ClubReview from "../models/ClubReview.js";

export const createClub = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const { name } = req.body;

    const newClub = new Club({ schoolName, name });

    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createClubReview = async(req, res) => {
  try {
    const { clubId, userId } = req.params;
    const { location, rating, comment } = req.body;

    const newClubReview = new ClubReview({ 
      clubId, 
      userId,
      location,
      rating,
      comment 
    });

    const savedClubReview = await newClubReview.save();
    res.status(201).json(savedClubReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getClubs = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const clubs = await Club.find({ schoolName });
    res.status(200).json(clubs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getClubReviews = async(req, res) => {
  try {
    const { clubId } = req.params;
    const clubReviews = await ClubReview.find({ clubId });
    res.status(200).json(clubReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserClubReviews = async(req, res) => {
  try {
    const { clubId, userId } = req.params;
    const clubReviews = await ClubReview.find({ clubId, userId });
    res.status(200).json(clubReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
