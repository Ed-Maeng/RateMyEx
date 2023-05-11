import User from "../models/User.js";

export const getUser = async(req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.find({ userId });
        console.log(user);
        res.status(200).json(user);
        } catch (err) {
        res.status(404).json({ message: err.message });
        }
} 