import Internship from "../models/Internship.js";
import InternshipReview from "../models/InternshipReview.js";

// Imports for S3 & Files
import crypto from "crypto";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createInternship = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const { name } = req.body;
    const file = req.file;
    const imageName = generateFileName();

    const internship = await Internship.findOne({ schoolName, name });
    if (internship) {
      return res.status(409).json({ msg: "Duplicate Internship Name in Same School." });
    }

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    const newInternship = new Internship({ schoolName, name, imageName });
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

    const newInternshipReview = new InternshipReview({ 
      internshipId, 
      userId,
      role,
      location,
      rating,
      comment,
      imageNames
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

    for (let internship of internships) {
      internship.imageUrl = await getObjectSignedUrl(internship.imageName);
    }
    res.status(200).json(internships);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getInternshipReviews = async(req, res) => {
  try {
    const { internshipId } = req.params;
    const internshipReviews = await InternshipReview.find({ internshipId });
    for (let review of internshipReviews) {
      for (let imageName of review.imageNames) {
        review.imageUrls.push(await getObjectSignedUrl(imageName));
      }
    }
    res.status(200).json(internshipReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserInternshipReviews = async(req, res) => {
  try {
    const { internshipId, userId } = req.params;
    const internshipReviews = await InternshipReview.find({ internshipId, userId });
    res.status(200).json(internshipReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
