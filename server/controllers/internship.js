import Internship from "../models/Internship.js";
import InternshipReview from "../models/InternshipReview.js";
import School from "../models/School.js";
import User from "../models/User.js";
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
    const imageName = file ? generateFileName() : "e11fa827751d82b05562abb9eecc3a1f4b324d5ea90780cf747bbf4fcb2b3476";
    const identifier = name.toLowerCase().replace(/[., ]+/g, "");

    const internship = await Internship.findOne({ schoolId, identifier });
    if (internship) {
      return res.status(409).json({ msg: "Duplicate Internship Name in Same School.", name: internship.name });
    }

    if (file) {
      const fileBuffer = await sharp(file.buffer)
        .resize({ height: 100, width: 100, fit: "inside" })
        .toBuffer();

      await uploadFile(fileBuffer, imageName, file.mimetype);
    }

    const newInternship = new Internship({ schoolId, name, imageName, identifier });
    const savedInternship = await newInternship.save();
    res.status(201).json(savedInternship);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createInternshipReview = async(req, res) => {
  try {
    const { internshipId, userId, schoolId } = req.params;
    const {
      name,
      industry, 
      jobTitle, 
      term, 
      employmentType, 
      location, 
      rating, 
      comment 
    } = req.body;

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
      { $inc: { totalReviews: 1, totalRatings: rating }}
    );

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

    res.status(201).json(savedInternshipReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getInternships = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const internships = await Internship.find({ schoolId }).sort('-totalRatings');

    for (let internship of internships) {
      if (internship.imageName) {
        internship.imageUrl = await getObjectSignedUrl(internship.imageName);
        await internship.save();
      }
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

export const getInternshipReview = async(req, res) => {
  try {
    const { _id } = req.params;
    const internshipReview = await InternshipReview.findById({ _id });
    res.status(200).json(internshipReview);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getInternshipReviewsData = async(req, res) => {
  try {
    const { internshipId } = req.params;
    // Group by `jobTitle` and get sum
    const jobTitles = await InternshipReview.aggregate([{$match: { "internshipId": internshipId }}]).sortByCount("jobTitle");
    // Group by `employmentType` and get sum
    const employmentTypes = await InternshipReview.aggregate([{$match: { "internshipId": internshipId }}]).sortByCount("employmentType");
    res.status(200).json({ "Job Titles": jobTitles, "Employment Types": employmentTypes });
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
