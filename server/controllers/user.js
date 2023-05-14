import User from "../models/User.js";
import InternshipReview from "../models/InternshipReview.js";
import DormReview from "../models/DormReview.js";
import ClubReview from "../models/ClubReview.js";

export const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const _id = userId;
        const user = await User.findById({ _id });
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserInternshipReviews = async (req, res) => {
    try {
        const { internshipId, userId } = req.params;
        const internshipReviews = await InternshipReview.find({ internshipId, userId });
        res.status(200).json(internshipReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserClubReviews = async (req, res) => {
    try {
        const { clubId, userId } = req.params;
        const clubReviews = await ClubReview.find({ clubId, userId });
        res.status(200).json(clubReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserDormReviews = async (req, res) => {
    try {
        const { dormId, userId } = req.params;
        const dormReviews = await DormReview.find({ dormId, userId });
        res.status(200).json(dormReviews);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

