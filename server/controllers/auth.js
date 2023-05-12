import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import swot from "swot-node";
import School from "../models/School.js";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // Verify if email already exists in our DB
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: "Account already exists. Please login in." });
    }

    // Verify if email is school email address 
    const schoolEmailResponse = await swot.isAcademic(email);
    if (!schoolEmailResponse) {
      return res.status(400).json({ msg: "The email does not belong to an educational institution" });
    }

    const schoolName = await swot.getSchoolNames(email);
    const school = await School.findOne({ name: schoolName[0] });
    // Create new school if we don't already have one in DB
    if (!school) {
      const newSchool = new School({ name: schoolName[0] });
      await newSchool.save();
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      schoolName: schoolName[0],
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Send Email Verification (Confirm User) */
export const emailVerification = async (req, res) => {
  
};

/* LOGGING IN USER */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
