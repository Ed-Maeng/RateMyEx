import {
  Box,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as InitialSchema from "./InitialSchema";

const ReviewForm = () => {
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  // All Path Types
  const isInternship = location.pathname === "/internships/review";
  const isDorm = location.pathname === "/dorms/review";
  const isProfessor = location.pathname === "/Professors/review";

  const saveReview = async (values, onSubmitProps) => {    
    const savedReviewResponse = await fetch(
      `http://localhost:4000/internship/${_id}/64532269581c4972867914a9`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    await savedReviewResponse.json();
    onSubmitProps.resetForm();
    navigate("/");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await saveReview(values, onSubmitProps);
  };

  const handleSchema = () => {
    switch(location.pathname) {
      case "/internships/review":
        return InitialSchema.internshipSchema;
      case "/dorms/review":
        return InitialSchema.dormSchema;
      case "/professors/review":
        return InitialSchema.professorSchema;
      case "/clubs/review":
        return InitialSchema.clubSchema;
      // Find a better way to handle default (error)
      default:
        return "No Schema"
    }
  }

  const handleInitialValues = () => {
    switch(location.pathname) {
      case "/internships/review":
        return InitialSchema.initialValuesInternship;
      case "/dorms/review":
        return InitialSchema.initialValuesDorm;
      case "/professors/review":
        return InitialSchema.initialValuesProfessor;
      case "/clubs/review":
        return InitialSchema.initialValuesClub;
      // Find a better way to handle default (error)
      default:
        return "No Initial Values"
    }
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={handleInitialValues()}
      validationSchema={handleSchema()}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              label="Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
            />

            {isInternship && (
              <>
                <TextField
                  label="Role"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.role}
                  name="role"
                  error={Boolean(touched.role) && Boolean(errors.role)}
                  helperText={touched.role && errors.role}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            {(isInternship || isDorm) && (
              <>
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            {isProfessor && (
              <>
                <TextField
                  label="Class"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.className}
                  name="className"
                  error={Boolean(touched.className) && Boolean(errors.className)}
                  helperText={touched.className && errors.className}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            <TextField
              label="Rating"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.rating}
              name="rating"
              error={Boolean(touched.rating) && Boolean(errors.rating)}
              helperText={touched.rating && errors.rating}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Comment"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.comment}
              name="comment"
              error={Boolean(touched.comment) && Boolean(errors.comment)}
              helperText={touched.comment && errors.comment}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Submit Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {"SUBMIT"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ReviewForm;
