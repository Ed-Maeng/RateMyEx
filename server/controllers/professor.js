import Professor from "../models/Professor.js";
import ProfessorReview from "../models/ProfessorReview.js";
import School from "../models/School.js";
import User from "../models/User.js";

export const createProfessor = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const { name } = req.body;
    const identifier = name.toLowerCase().replace(/[., ]+/g, "");

    const professor = await Professor.findOne({ schoolId, identifier });
    if (professor) {
      return res.status(409).json({ msg: "Duplicate Professor Name in Same School.", name: professor.name });
    }

    const newProfessor = new Professor({ 
      schoolId, 
      name,
      identifier,
      color: '#' + Math.floor(Math.random()*16777215).toString(16), 
    });
    const savedProfessor = await newProfessor.save();
    res.status(201).json(savedProfessor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const createProfessorReview = async(req, res) => {
  try {
    const { professorId, userId, schoolId } = req.params;
    const { name, term, className, rating, comment } = req.body;

    const newProfessorReview = new ProfessorReview({ 
      professorId, 
      userId,
      name,
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
    
    res.status(201).json(savedProfessorReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getProfessors = async(req, res) => {
  try {
    const { schoolId } = req.params;
    const professors = await Professor.find({ schoolId }).sort('-totalRatings');
    res.status(200).json(professors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getProfessor = async(req, res) => {
  try {
    const { professorId } = req.params;
    const professor = await Professor.findById({ _id: professorId });
    res.status(200).json(professor);
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

export const getProfessorReviewsData = async(req, res) => {
  try {
    const { professorId } = req.params;
    // Group by `rooms` and get sum
    const classNames = await ProfessorReview.aggregate([{$match: { "professorId": professorId }}]).sortByCount("className");
    // Group by `campus` and get sum
    const terms = await ProfessorReview.aggregate([{$match: { "professorId": professorId }}]).sortByCount("term");
    res.status(200).json({ "Class Names": classNames, "Terms": terms });
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
