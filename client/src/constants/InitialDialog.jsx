/* --- REGISTER --- */

// USER ALREADY FOUND DIALOG
export const userAlreadyFoundDialog = {
  title: "Have you registered already?",
  content: "If you already have an account, please loggin in.",
  buttonName: "Login",
  path: null,
  severity: "info",
};

// SCHOOL EMAIL NOT FOUND DIALOG
export const schoolEmailNotFoundDialog = {
  title: "Are you using a school email?",
  content: "This email does not belong to an educational institution.",
  buttonName: "Close",
  path: null,
  severity: "warning",
};

// SENT VERIFY EMAIL DIALOG
export const sentVerifyDialog = {
  title: "Sent verification email!",
  content: "Please check your email for verification.",
  buttonName: "Close",
  path: "/",
  severity: "success",
};

/* --- LOG IN --- */

// USER NOT FOUND DIALOG
export const userNotFoundDialog = {
  title: "Have you registered yet?",
  content: "Please register an account before logging in.",
  buttonName: "Register",
  path: null,
  severity: "info",
};

// NEED TO VERIFY EMAIL DIALOG
export const needVerifyDialog = {
  title: "Have you verified your email?",
  content: "Please verify email before logging in.",
  buttonName: "Close",
  path: null,
  severity: "info",
};

// WRONG PASSWORD DIALOG
export const wrongPasswordDialog = {
  title: "Did you type in the correct password?",
  content: "Please enter in a correct password for this email.",
  buttonName: "Close",
  path: null,
  severity: "warning",
};

/* --- EMAIL VERIFICATION --- */

// SUCCESSFULLY VERIFIED DIALOG
export const verifiedDialog = {
  title: "Successful!",
  content: "Thank you for verifying your email.",
  buttonName: "Close",
  path: "/",
  severity: "success",
};

// FAILED TO VERIFY DIALOG
export const notVerifiedDialog = {
  title: "Please Try Again",
  content: "Make sure you are using the link from your email.",
  buttonName: "Close",
  path: "/",
  severity: "error",
};

/* --- ACCESS REVIEWS --- */

// NEED TO SIGN IN DIALOG
export const needSignInDialog = {
  title: "Are you signed in?",
  content: "Please sign in before viewing and writing reviews.",
  buttonName: "Sign In",
  path: "/signin",
  severity: "warning",
};

// NEED TO WRITE ONE REVIEW DIALOG
export const needReviewDialog = {
  title: "Have you written a review?",
  content: "Please write one review before viewing more reviews.",
  buttonName: "Close",
  path: null,
  severity: "info",
};

/* --- SECTION --- */
export const sectionAlreadyFoundDialog = {
  title: "Have you searched for this?",
  content: "Please use the search bar, we already have this.",
  buttonName: "Close",
  path: null,
  severity: "info",
};

/* --- SUPPORT FEEDBACK --- */
export const sentSupport = {
  title: "Successful!",
  content: "Thank you for sending us feedback.",
  buttonName: "Close",
  path: null,
  severity: "success",
};

/* --- RESET PASSWORD --- */

// SENT RESET PASSWORD EMAIL
export const sentResetPassword = {
  title: "Sent email to reset password!",
  content: "Please check your email to reset password.",
  buttonName: "Close",
  path: null,
  severity: "success",
};

// EMAIL IS NOT FOUND IN DB
export const emailNotFound = {
  title: "Did you type in the correct email?",
  content: "Please enter in a email that has been registered.",
  buttonName: "Close",
  path: null,
  severity: "warning",
};

// NEW PASSWORD MATCHES OLD PASSWORD
export const samePassword = {
  title: "Did you type in your old password?",
  content: "New password is matching your old password.",
  buttonName: "Login",
  path: "/signin",
  severity: "warning",
};

// SUCCESSFULLY RESET PASSWORD
export const resetPassword = {
  title: "Succesful!",
  content: "Your password has been reset.",
  buttonName: "Login",
  path: "/signin",
  severity: "success",
};

// UNSUCCESSFUL IN RESETTING PASSWORD
export const notResetPassword = {
  title: "Please Try Again",
  content: "Make sure you are using the link from your email.",
  buttonName: "Login",
  path: "/signin",
  severity: "error",
};

/* --- DEFAULT --- */

// DEFAULT DIALOG
export const defaultDialog = {
  title: "Please Try Again",
  content: "Sorry, something went wrong.",
  buttonName: "Close",
  path: null,
  severity: "error",
};
