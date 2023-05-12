import User from "../models/User.js";

export const getUser = async(req, res) => {
    try {
        const { userId } = req.params;
        const _id = userId;
        const user = await User.findById({ _id });
        res.status(200).json(user);
        } catch (err) {
        res.status(404).json({ message: err.message });
        }
} 