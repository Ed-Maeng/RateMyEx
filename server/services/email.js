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
export async function emailVerification(email, emailToken) {
  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Sign In to RateMyEx.com",
      // html: '<p>Click: <a href="http://localhost:3000/verifyemail/' + emailToken + '">here</a></p>',
      html: '<p>Click: <a href="https://ratemyexschool.com/verifyemail/' + emailToken + '">here</a></p>',
    });
    return info;
  } catch (err) {
    console.log(err);
  }
};
