import * as yup from "yup";

// INTERNSHIP SCHEMA
export const internshipSchema = yup.object().shape({
  role: yup.string().required("required"),
  location: yup.string().required("required"),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
  files: yup.array().required("required"),
});

export const initialValuesInternship = {
  role: "",
  location: "",
  rating: "",
  comment: "",
  files: [],
};

// DORM SCHEMA
export const dormSchema = yup.object().shape({
  location: yup.string().required("required"),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
  files: yup.array().required("required"),
});

export const initialValuesDorm = {
  location: "",
  rating: "",
  comment: "",
  files: [],
};

// PROFESSOR SCHEMA
export const professorSchema = yup.object().shape({
  className: yup.string().required("required"),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
  files: yup.array().required("required"),
});

export const initialValuesProfessor = {
  className: "",
  rating: "",
  comment: "",
  files: [],
};

// CLUB SCHEMA
export const clubSchema = yup.object().shape({
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
  files: yup.array().required("required"),
});

export const initialValuesClub = {
  rating: "",
  comment: "",
  files: [],
};

// REGISTER SCHEMA
export const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

export const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// LOGIN SCHEMA
export const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

export const initialValuesLogin = {
  email: "",
  password: "",
};

// SECTION FORM SCHEMA
export const sectionFormSchema = yup.object().shape({
  name: yup.string().required("required"),
  file: yup.mixed().required("required"),
});

export const initialValuesSectionForm = {
  name: "",
  file: null,
};
