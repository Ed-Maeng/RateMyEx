import Club from "../models/Club.js";
import ClubReview from "../models/ClubReview.js";

// Imports for S3 & Files
import crypto from "crypto";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createClub = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const { name } = req.body;
    const file = req.file;
    const imageName = generateFileName();

    const club = await Club.findOne({ schoolId, name });
    if (club) {
      return res.status(409).json({ msg: "Duplicate Club Name in Same School" });
    }

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    const newClub = new Club({ schoolId, name, imageName });
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

    const files = req.files;
    const imageNames = [];

    files.map(async (file) => {
      let imageName = generateFileName();
      imageNames.push(imageName);
      
      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: "contain" })
        .toBuffer();

      await uploadFile(fileBuffer, imageName, file.mimetype);
    });

    const newClubReview = new ClubReview({ 
      clubId, 
      userId,
      location,
      rating,
      comment,
      imageNames,
    });

    const savedClubReview = await newClubReview.save();
    res.status(201).json(savedClubReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getClubs = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const clubs = await Club.find({ schoolId });

    for (let club of clubs) {
      club.imageUrl = await getObjectSignedUrl(club.imageName);
    }
    res.status(200).json(clubs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getClubReviews = async(req, res) => {
  try {
    const { clubId } = req.params;
    const clubReviews = await ClubReview.find({ clubId });
    for (let review of clubReviews) {
      for (let imageName of review.imageNames) {
        review.imageUrls.push(await getObjectSignedUrl(imageName));
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
