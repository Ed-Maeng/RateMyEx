import Internship from "../models/Internship.js";
import InternshipReview from "../models/InternshipReview.js";

// Imports for S3 & Files
import crypto from "crypto";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../services/s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createInternship = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const { name } = req.body;
    const file = req.file;
    const imageName = generateFileName();

    const internship = await Internship.findOne({ schoolId, name });
    if (internship) {
      return res.status(409).json({ msg: "Duplicate Internship Name in Same School." });
    }

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 100, width: 100, fit: "inside" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    const newInternship = new Internship({ schoolId, name, imageName });
    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createInternshipReview = async(req, res) => {
  try {
    const { internshipId, userId } = req.params;
    const {
      name,
      industry, 
      jobTitle, 
      term, 
      employmentType, 
      location, 
      rating, 
      comment } = req.body;

    const newInternshipReview = new InternshipReview({ 
      internshipId, 
      userId,
      name,
      industry,
      jobTitle,
      term,
      employmentType,
      location,
      rating,
      comment,
    });

    const savedInternshipReview = await newInternshipReview.save();

    // Update Internship `totalReviews` and `totalRatings`
    await Internship.updateOne(
      {_id: internshipId}, 
      { $inc: { totalReviews: 1, totalRatings: rating }
    });

    res.status(201).json(savedInternshipReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getInternships = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const internships = await Internship.find({ schoolId });

    for (let internship of internships) {
      internship.imageUrl = await getObjectSignedUrl(internship.imageName);
    }
    res.status(200).json(internships);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getInternship = async(req, res) => {
  try {
    const { internshipId } = req.params;
    const internship = await Internship.findById({ _id: internshipId });
    res.status(200).json(internship);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getInternshipReviews = async(req, res) => {
  try {
    const { internshipId } = req.params;
    const internshipReviews = await InternshipReview.find({ internshipId }).sort('-createdAt');
    res.status(200).json(internshipReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const updateInternship = async(req, res) => {
  try {
    const { internshipId } = req.params;
    const internship = await Internship.findOneAndUpdate({_id: internshipId}, {...req.body});
    res.status(200).json(internship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
