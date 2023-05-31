import School from "../models/School.js";
import User from "../models/User.js";

// Imports for JWT and Verification
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import swot from "swot-node";
import { v4 as uuidv4 } from "uuid";
import { emailVerification } from "../services/email.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // Check if email already exists in our DB
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: "Account already exists. Please login in." });
    }

    // Check if email is school email address 
    const schoolEmailResponse = await swot.isAcademic(email);
    if (!schoolEmailResponse) {
      return res.status(400).json({ msg: "The email does not belong to an educational institution." });
    }

    const schoolName = await swot.getSchoolNames(email);
    const school = await School.findOne({ name: schoolName[0] });
    // Create new school if we don't already have one in DB
    if (!school) {
      const newSchool = new School({ name: schoolName[0] });
      await newSchool.save();
      console.log("Created New School: " + schoolName[0]);
    }
    
    // Send Email Verification
    const host = req.get('host');
    const emailToken = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h'});
    const verify = await emailVerification(email, emailToken, host);
    if (!verify) {
      return res.status(500).json({ msg: "Couldn't send email verification. Please try again." });
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

/* VERIFY EMAIL TOKEN */
export const verifyEmail = async (req, res) => {
  try {
    let emailToken = req.header("Authorization");

    if (!emailToken) {
      return res.status(403).send("Access Denied");
    }

    if (emailToken.startsWith("Bearer ")) {
      emailToken = emailToken.slice(7, emailToken.length).trimLeft();
    }

    const verified = jwt.verify(emailToken, process.env.JWT_SECRET);
    
    // Update verified user 'isVerified' to true
    const user = await User.findOneAndUpdate(
      { email: verified.email }, 
      { isVerified: true }
    );

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN USER */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    // Check if email doesn't exist in our DB
    if (!user) {
      return res.status(404).json({ msg: "User does not exist." });
    }
    // Check if user has verified email
    if (!user.isVerified) {
      return res.status(401).json({ msg: "Please verify email before logging in." });
    }

    // Check if password is valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GOOGLE OAUTH */
export const oauth = async (req, res) => {
  try {
    const {
      given_name,
      family_name,
      email,
    } = req.body;

    // Check if email already exists in our DB
    const user = await User.findOne({ email });
    if (user) {
      // Update verified user 'isVerified' to true
      const user = await User.findOneAndUpdate(
        { email: email }, 
        { isVerified: true }
      );

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      return res.status(200).json({ token, user });
    }

    // Check if email is school email address 
    const schoolEmailResponse = await swot.isAcademic(email);
    if (!schoolEmailResponse) {
      return res.status(400).json({ msg: "The email does not belong to an educational institution." });
    }

    const schoolName = await swot.getSchoolNames(email);
    const school = await School.findOne({ name: schoolName[0] });
    // Create new school if we don't already have one in DB
    if (!school) {
      const newSchool = new School({ name: schoolName[0] });
      await newSchool.save();
      console.log("Created New School: " + schoolName[0]);
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(uuidv4(), salt);

    const newUser = new User({
      firstName: given_name,
      lastName: family_name,
      email,
      password: passwordHash,
      schoolName: schoolName[0],
      isVerified: true,
    });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ token, user: savedUser});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
