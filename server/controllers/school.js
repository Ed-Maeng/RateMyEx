import School from "../models/School.js";

export const createSchool = async(req, res) => {
  try {
    const { name } = req.body;

    const school = await School.findOne({ name });
    if (school) {
      return res.status(409).json({ msg: "Duplicate School Name." });
    }

    const newSchool = new School({ name });
    const savedSchool = await newSchool.save();
    res.status(201).json(savedSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getSchools = async(req, res) => {
  try {
    const schools = await School.find({}).sort('-numberOfReviews');
    res.status(200).json(schools);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getSchool = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const school = await School.findById(schoolId);
    res.status(200).json(school);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
