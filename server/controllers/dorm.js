import Dorm from "../models/Dorm.js";
import DormReview from "../models/DormReview.js";

// Imports for S3 & Files
import crypto from "crypto";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createDorm = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const { name } = req.body;
    const file = req.file;
    const imageName = generateFileName();

    const dorm = await Dorm.findOne({ schoolId, name });
    if (dorm) {
      return res.status(409).json({ msg: "Duplicate Dorm Name in Same School." });
    }

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    const newDorm = new Dorm({ schoolId, name, imageName });
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

    const newDormReview = new DormReview({ 
      dormId, 
      userId,
      location,
      rating,
      comment,
      imageNames
    });

    const savedDormReview = await newDormReview.save();
    res.status(201).json(savedDormReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getDorms = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const dorms = await Dorm.find({ schoolId });

    for (let dorm of dorms) {
      dorm.imageUrl = await getObjectSignedUrl(dorm.imageName);
    }
    res.status(200).json(dorms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getDormReviews = async(req, res) => {
  try {
    const { dormId } = req.params;
    const dormReviews = await DormReview.find({ dormId });
    for (let review of dormReviews) {
      for (let imageName of review.imageNames) {
        review.imageUrls.push(await getObjectSignedUrl(imageName));
      }
    }
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
