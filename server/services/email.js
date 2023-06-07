import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  }
});

/* Send Email Verification (Confirm User Email Exists) */
export async function emailVerification(email, emailToken, host) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Sign In to RateMyEx.com",
      html: host === "localhost:4000" ? '<p>Click: <a href="http://localhost:3000/verifyemail/' + emailToken + '">here</a></p>' 
      : '<p>Click: <a href="https://ratemyexschool.com/verifyemail/' + emailToken + '">here</a></p>',
    });
    return info;
  } catch (err) {
    console.log(err);
  }
};

/* Receive Support Feedback From Users */
export async function emailSupport(name, feedback) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL,
      subject: `Feedback from ${name}`,
      text: feedback,
    });
    return info;
  } catch (err) {
    console.log(err);
  }
};

/* Send Reset Password (Confirm User Email Exists) */
export async function emailResetPassword(email, emailToken, host) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Reset Password from RateMyEx.com",
      html: host === "localhost:4000" ? '<p>Click: <a href="http://localhost:3000/reset/' + emailToken + '">here</a></p>' 
      : '<p>Click: <a href="https://ratemyexschool.com/reset/' + emailToken + '">here</a></p>',
    });
    return info;
  } catch (err) {
    console.log(err);
  }
};
