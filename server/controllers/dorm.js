import Dorm from "../models/Dorm.js";
import DormReview from "../models/DormReview.js";
import School from "../models/School.js";
import User from "../models/User.js";
// Imports for S3 & Files
import crypto from "crypto";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../services/s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createDorm = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const { name } = req.body;
    const file = req.file;
    const imageName = file ? generateFileName() : "9c006e2f35abcb80f190d737f0a3ff4a0d234b6b1af5197f672332052d122e63";
    const identifier = name.toLowerCase().replace(/[., ]+/g, "");

    const dorm = await Dorm.findOne({ schoolId, identifier });
    if (dorm) {
      return res.status(409).json({ msg: "Duplicate Dorm Name in Same School.", name: dorm.name });
    }

    if (file) {
      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 100, width: 100, fit: "inside" })
        .toBuffer();

      await uploadFile(fileBuffer, imageName, file.mimetype);
    }

    const newDorm = new Dorm({ schoolId, name, imageName, identifier });
    const savedDorm = await newDorm.save();
    res.status(201).json(savedDorm);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createDormReview = async(req, res) => {
  try {
    const { dormId, userId, schoolId } = req.params;
    const { name, campus, rooms, rating, comment } = req.body;
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

    const newDormReview = new DormReview({ 
      dormId, 
      userId,
      name,
      campus,
      rooms,
      rating,
      comment,
      imageNames
    });

    const savedDormReview = await newDormReview.save();

    // Update Dorm `totalReviews` and `totalRatings`
    await Dorm.updateOne(
      {_id: dormId}, 
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

    res.status(201).json(savedDormReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getDorms = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const dorms = await Dorm.find({ schoolId }).sort('-totalRatings');

    for (let dorm of dorms) {
      if (dorm.imageName) {
        dorm.imageUrl = await getObjectSignedUrl(dorm.imageName);
        await dorm.save();
      }
    }
    res.status(200).json(dorms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getDorm = async(req, res) => {
  try {
    const { dormId } = req.params;
    const dorm = await Dorm.findById({ _id: dormId });
    res.status(200).json(dorm);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getDormReviews = async(req, res) => {
  try {
    const { dormId } = req.params;
    const dormReviews = await DormReview.find({ dormId }).sort('-createdAt');;
    for (let review of dormReviews) {
      review.imageUrls = [];
      for (let imageName of review.imageNames) {
        review.imageUrls.push(await getObjectSignedUrl(imageName));
        await review.save();
      }
    }
    res.status(200).json(dormReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getDormReview = async(req, res) => {
  try {
    const { _id } = req.params;
    const dormReview = await DormReview.findById({ _id });
    res.status(200).json(dormReview);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getDormReviewsData = async(req, res) => {
  try {
    const { dormId } = req.params;
    // Group by `rooms` and get sum
    const rooms = await DormReview.aggregate([{$match: { "dormId": dormId }}]).sortByCount("rooms");
    // Group by `campus` and get sum
    const campuses = await DormReview.aggregate([{$match: { "dormId": dormId }}]).sortByCount("campus");
    res.status(200).json({ "Rooms": rooms, "On/Off Campus": campuses });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const updateDorm = async(req, res) => {
  try {
    const { dormId } = req.params;
    const dorm = await Dorm.findOneAndUpdate({_id: dormId}, {...req.body});
    res.status(200).json(dorm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
