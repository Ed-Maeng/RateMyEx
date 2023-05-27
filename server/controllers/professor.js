//TODO: Finish Professor Page

import Professor from "../models/Professor.js";
import ProfessorReview from "../models/ProfessorReview.js";

// Imports for S3 & Files
import crypto from "crypto";
import sharp from "sharp";
import { getObjectSignedUrl, uploadFile } from "../services/s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

export const createProfessor = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const { name } = req.body;
    const file = req.file;
    const imageName = generateFileName();

    const professor = await Professor.findOne({ schoolId, name });
    if (professor) {
      return res.status(409).json({ msg: "Duplicate Professor Name in Same School." });
    }

    const fileBuffer = await sharp(file.buffer)
      .resize({ height: 200, width: 300, fit: "contain" })
      .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);

    const newProfessor = new Professor({ schoolId, name, imageName });
    const savedProfessor = await newProfessor.save();
    res.status(201).json(savedProfessor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createProfessorReview = async(req, res) => {
  try {
    const { professorId, userId } = req.params;
    const { term, className, rating, comment } = req.body;

    const newProfessorReview = new ProfessorReview({ 
      professorId, 
      userId,
      term,
      className,
      rating,
      comment,
    });

    const savedProfessorReview = await newProfessorReview.save();

    // Update Professor `totalReviews` and `totalRatings`
    await Professor.updateOne(
      {_id: professorId}, 
      { $inc: { totalReviews: 1, totalRatings: rating }
    });
    

    res.status(201).json(savedProfessorReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getProfessors = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const professors = await Professor.find({ schoolId });

    for (let professor of professors) {
      professor.imageUrl = await getObjectSignedUrl(professor.imageName);
    }
    res.status(200).json(professors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
} 

export const getProfessorReviews = async(req, res) => {
  try {
    const { professorId } = req.params;
    const professorReviews = await ProfessorReview.find({ professorId }).sort('-createdAt');
    res.status(200).json(professorReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const updateProfessor = async(req, res) => {
  try {
    const { professorId } = req.params;
    const professor = await Professor.findOneAndUpdate({_id: professorId}, {...req.body});
    res.status(200).json(professor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
