import * as yup from "yup";

// INTERNSHIP SCHEMA
export const internshipSchema = yup.object().shape({
  industry: yup.string().required("Required"),
  jobTitle: yup.string().required("Required"),
  term: yup.string().nullable(),
  location: yup.string().nullable(),
  employmentType: yup.string().nullable(),
  rating: yup.number().required("Required"),
  comment: yup.string().required("Required").test('len', `Must be more than 100 characters`, val => val.length > 100),
});

export const initialValuesInternship = {
  industry: null,
  jobTitle: null,
  term: null,
  location: null,
  employmentType: null,
  rating: 0,
  comment: "",
};

// DORM SCHEMA
export const dormSchema = yup.object().shape({
  campus: yup.string().nullable(),
  rooms: yup.string().nullable(),
  rating: yup.number().required("Required"),
  comment: yup.string().required("Required").test('len', `Must be more than 100 characters`, val => val.length > 100),
  files: yup.array().max(3, 'Cannot be more than 3 images'),
});

export const initialValuesDorm = {
  campus: null,
  rooms: null,
  rating: 0,
  comment: "",
  files: [],
};

// CLUB SCHEMA
export const clubSchema = yup.object().shape({
  category: yup.string().nullable(),
  term: yup.string().nullable(),
  rating: yup.number().required("Required"),
  comment: yup.string().required("Required").test('len', `Must be more than 100 characters`, val => val.length > 100),
  files: yup.array().max(3, 'Cannot be more than 3 images'),
});

export const initialValuesClub = {
  category: null,
  term: null,
  rating: 0,
  comment: "",
  files: [],
};

// PROFESSOR SCHEMA
export const professorSchema = yup.object().shape({
  term: yup.string().nullable(),
  className: yup.string().required("Required"),
  rating: yup.number().required("Required"),
  comment: yup.string().required("Required").test('len', `Must be more than 100 characters`, val => val.length > 100),
  files: yup.array().max(3, 'Cannot be more than 3 images'),
});

export const initialValuesProfessor = {
  term: null,
  className: "",
  rating: 0,
  comment: "",
  files: [],
};

// REGISTER SCHEMA
export const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
});

export const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

// LOGIN SCHEMA
export const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("Required"),
  password: yup.string().required("Required"),
});

export const initialValuesLogin = {
  email: "",
  password: "",
};

// SECTION FORM SCHEMA
export const sectionFormSchema = yup.object().shape({
  name: yup.string().required("Required"),
  file: yup.mixed(),
});

export const initialValuesSectionForm = {
  name: "",
  file: "",
};
