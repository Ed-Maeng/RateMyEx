import * as yup from "yup";

// INTERNSHIP SCHEMA
export const internshipSchema = yup.object().shape({
  name: yup.string().required("required"),
  role: yup.string().required("required"),
  location: yup.string().required("required"),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
});

export const initialValuesInternship = {
  name: "",
  role: "",
  location: "",
  rating: "",
  comment: "",
};

// DORM SCHEMA
export const dormSchema = yup.object().shape({
  name: yup.string().required("required"),
  location: yup.string().required("required"),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
});

export const initialValuesDorm = {
  name: "",
  location: "",
  rating: "",
  comment: "",
};

// PROFESSOR SCHEMA
export const professorSchema = yup.object().shape({
  name: yup.string().required("required"),
  className: yup.string().required("required"),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
});

export const initialValuesProfessor = {
  name: "",
  className: "",
  rating: "",
  comment: "",
};

// CLUB SCHEMA
export const clubSchema = yup.object().shape({
  name: yup.string().required("required"),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
});

export const initialValuesClub = {
  name: "",
  rating: "",
  comment: "",
};

// REGISTER SCHEMA
export const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

// LOGIN SCHEMA
export const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const initialValuesLogin = {
  email: "",
  password: "",
};