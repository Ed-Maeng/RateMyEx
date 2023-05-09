import School from "../models/School.js";

/* CREATE UNIVERSITY */
export const createSchool = async(req, res) => {
  try {
    const { name, shortName, location } = req.body;

    const school = await School.findOne({ name: name });
    if (school) return res.status(409).json({ msg: "Duplicate School Name." });

    const newSchool = new School({ name, shortName, location });
    const savedSchool = await newSchool.save();
    res.status(201).json(savedSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
