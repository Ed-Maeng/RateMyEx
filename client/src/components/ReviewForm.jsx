import {
  Box,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import setReviews from "../state/auth";

const reviewSchema = yup.object().shape({
  companyName: yup.string().required("required"),
  role: yup.string().required("required"),
  location: yup.string(),
  rating: yup.string().required("required"),
  comment: yup.string().required("required"),
});

const initialValuesReview = {
  companyName: "",
  role: "",
  location: "",
  rating: "",
  comment: "",
};

const ReviewForm = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const review = async (values, onSubmitProps) => {    
    const savedReviewResponse = await fetch(
      `http://localhost:4000/internship/6451cad57524f79d85ee8413/64532269581c4972867914a9`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const savedReview = await savedReviewResponse.json();
    onSubmitProps.resetForm();
    navigate("/internships");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await review(values, onSubmitProps);
  };


  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesReview}
      validationSchema={reviewSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              label="Company Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.companyName}
              name="companyName"
              error={Boolean(touched.companyName) && Boolean(errors.companyName)}
              helperText={touched.companyName && errors.companyName}
              sx={{ gridColumn: "span 4" }}
            />
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
