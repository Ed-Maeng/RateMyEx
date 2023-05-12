import crypto from "crypto";
import sharp from "sharp";
import School from "../models/School.js";
import { getObjectSignedUrl, uploadFile } from "../s3.js";

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

/* CREATE UNIVERSITY */
export const createSchool = async(req, res) => {
  try {
    const { name, shortName, location } = req.body;
    const file = req.file;
    const imageName = generateFileName();

    const school = await School.findOne({ name });
    if (school) {
      return res.status(409).json({ msg: "Duplicate School Name." });
    }

    const fileBuffer = await sharp(file.buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();

    await uploadFile(fileBuffer, imageName, file.mimetype);
    
    const newSchool = new School({ name, shortName, location, imageName });
    const savedSchool = await newSchool.save();
    res.status(201).json(savedSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getSchools = async(req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getSchool = async(req, res) => {
  try {
    const { schoolName } = req.params;
    const school = await School.find({ name: schoolName });
    res.status(200).json(school);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
