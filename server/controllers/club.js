import Club from "../models/Club.js";
import ClubReview from "../models/ClubReview.js";
import School from "../models/School.js";
import User from "../models/User.js";
// Imports for S3 & Files
import crypto from "crypto";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../services/s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createClub = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const { name } = req.body;
    const file = req.file;
    const imageName = file ? generateFileName() : "40a6176e6e3d95f69d4f1aa7e3d5d280b0ab2ecd02ac57a500e4bbd766545a67";
    const identifier = name.toLowerCase().replace(/[., ]+/g, "");

    const club = await Club.findOne({ schoolId, identifier });
    if (club) {
      return res.status(409).json({ msg: "Duplicate Club Name in Same School.", name: club.name });
    }

    if (file) {
      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 100, width: 100, fit: "inside" })
        .toBuffer();

      await uploadFile(fileBuffer, imageName, file.mimetype);
    }

    const newClub = new Club({ schoolId, name, imageName, identifier });
    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createClubReview = async(req, res) => {
  try {
    const { clubId, userId, schoolId } = req.params;
    const { name, category, term, rating, comment } = req.body;

    const files = req.files;
    const imageNames = [];

    files.map(async (file) => {
      let imageName = generateFileName();
      imageNames.push(imageName);
      
      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 200, width: 300, fit: "inside" })
        .toBuffer();

      await uploadFile(fileBuffer, imageName, file.mimetype);
    });

    const newClubReview = new ClubReview({ 
      clubId, 
      userId,
      name,
      category,
      term,
      rating,
      comment,
      imageNames,
    });

    const savedClubReview = await newClubReview.save();

    // Update Club `totalReviews` and `totalRatings`
    await Club.updateOne(
      {_id: clubId}, 
      { $inc: { totalReviews: 1, totalRatings: rating }
    });

    // Update School `numberOfReviews`
    await School.updateOne(
      {_id: schoolId}, 
      { $inc: { numberOfReviews: 1 }}
    );
    
    // Update User `numberOfReviews`
    await User.updateOne(
      {_id: userId}, 
      { $inc: { numberOfReviews: 1 }}
    );

    res.status(201).json(savedClubReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getClubs = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const clubs = await Club.find({ schoolId }).sort('-totalRatings');

    for (let club of clubs) {
      if (club.imageName) {
        club.imageUrl = await getObjectSignedUrl(club.imageName);
        await club.save();
      }
    }
    res.status(200).json(clubs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getClub = async(req, res) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findById({ _id: clubId });
    res.status(200).json(club);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getClubReviews = async(req, res) => {
  try {
    const { clubId } = req.params;
    const clubReviews = await ClubReview.find({ clubId }).sort('-createdAt');
    for (let review of clubReviews) {
      review.imageUrls = [];
      for (let imageName of review.imageNames) {
        review.imageUrls.push(await getObjectSignedUrl(imageName));
        await review.save();
      }
    }
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

export const getClubReviewsData = async(req, res) => {
  try {
    const { clubId } = req.params;
    // Group by `rooms` and get sum
    const categories = await ClubReview.aggregate([{$match: { "clubId": clubId }}]).sortByCount("category");
    // Group by `campus` and get sum
    const terms = await ClubReview.aggregate([{$match: { "clubId": clubId }}]).sortByCount("term");
    res.status(200).json({ "Categories": categories, "Terms": terms });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const updateClub = async(req, res) => {
  try {
    const { clubId } = req.params;
    const club = await Club.findOneAndUpdate({_id: clubId}, {...req.body});
    res.status(200).json(club);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
