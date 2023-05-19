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
      .resize({ height: 1920, width: 1080, fit: "contain" })
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
    const { name, className, rating, comment } = req.body;
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

    const newProfessorReview = new ProfessorReview({ 
      professorId, 
      userId,
      name,
      className,
      rating,
      comment,
      imageNames
    });

    const savedProfessorReview = await newProfessorReview.save();
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
    const professorReviews = await ProfessorReview.find({ professorId });
    for (let review of professorReviews) {
      for (let imageName of review.imageNames) {
        review.imageUrls.push(await getObjectSignedUrl(imageName));
      }
    }
    res.status(200).json(professorReviews);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
