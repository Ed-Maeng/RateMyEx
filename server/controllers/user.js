import User from "../models/User.js";
import InternshipReview from "../models/InternshipReview.js";
import DormReview from "../models/DormReview.js";
import ClubReview from "../models/ClubReview.js";

export const getUser = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await User.findById({ _id });
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserInternshipReviews = async (req, res) => {
    try {
        const { internshipId, _id } = req.params;
        const internshipReviews = await InternshipReview.find({ internshipId, userId: _id });
        res.status(200).json(internshipReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserClubReviews = async (req, res) => {
    try {
        const { clubId, _id } = req.params;
        const clubReviews = await ClubReview.find({ clubId, userId: _id });
        res.status(200).json(clubReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserDormReviews = async (req, res) => {
    try {
        const { dormId, _id } = req.params;
        const dormReviews = await DormReview.find({ dormId, userId: _id });
        res.status(200).json(dormReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

