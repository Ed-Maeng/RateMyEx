import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// Components & Schema
import * as InitialSchema from "../../constants/InitialSchema";
import FlexBetween from "../FlexBetween";

const ReviewForm = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();

  // State of User, Token & Current Section
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const currentSection = useSelector((state) => state.currentSection);

  // Review Types
  const reviewType = useLocation().pathname.split("/")[2];
  const isInternship = reviewType === "internships";
  const isDorm = reviewType === "dorms";
  const isProfessor = reviewType === "professors";
  const isClub = reviewType === "clubs";

  const saveReview = async (values) => {  
    const savedReviewResponse = await fetch(
      `http://ec2-3-239-251-252.compute-1.amazonaws.com:4000/${reviewType}/${currentSection._id}/${user._id}`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }
    );
    await savedReviewResponse.json();
  };

  const saveReviewWithImage = async (values) => {  
    const formData = new FormData();
    for (let value in values) {
      if (value !== "files") {
        formData.append(value, values[value]);
      }
    }
    // Append all files
    for (let file of values["files"]) {
      formData.append("files[]", file);
    }

    const savedReviewResponse = await fetch(
      `http://ec2-3-239-251-252.compute-1.amazonaws.com:4000/${reviewType}/${currentSection._id}/${user._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      }
    );
    await savedReviewResponse.json();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isInternship || isDorm || isClub) {
      await saveReviewWithImage(values);
    } else {
      await saveReview(values);
    }
    onSubmitProps.resetForm();
    navigate(`/school/${reviewType}/reviews`);
  };

  const handleSchema = () => {
    switch(reviewType) {
      case "internships":
        return InitialSchema.internshipSchema;
      case "dorms":
        return InitialSchema.dormSchema;
      case "professors":
        return InitialSchema.professorSchema;
      case "clubs":
        return InitialSchema.clubSchema;
      // Find a better way to handle default (error)
      default:
        return "No Schema";
    };
  }

  const handleInitialValues = () => {
    switch(reviewType) {
      case "internships":
        return InitialSchema.initialValuesInternship;
      case "dorms":
        return InitialSchema.initialValuesDorm;
      case "professors":
        return InitialSchema.initialValuesProfessor;
      case "clubs":
        return InitialSchema.initialValuesClub;
      // Find a better way to handle default (error)
      default:
        return "No Initial Values"
    };
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
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
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

            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                onDrop={(acceptedFiles) =>
                  setFieldValue("files", acceptedFiles)
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    textAlign="center"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {values.files.length === 0 ? (
                      <Typography alignItems="center">Add Picture Here</Typography>
                    ) : (
                      <FlexBetween>
                        <Box>
                          {values.files.map((file) => (
                            <Typography key={file.name} display="block">
                              {file.name}
                            </Typography>
                          ))}
                        </Box>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
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
