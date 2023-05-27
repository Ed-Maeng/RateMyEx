import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ImageIcon from '@mui/icons-material/Image';
import {
  Autocomplete,
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Components & Schema
import LoadingComponent from "../../components/LoadingComponent";
import * as Constants from "../../constants/Constants";
import * as InitialSchema from "../../constants/InitialSchema";
import FlexBetween from "../FlexBetween";

const ReviewForm = (props) => {
  const { palette } = useTheme();
  // Loading & States
  const [loading, setLoading] = useState(false);
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
      `http://localhost:4000/${reviewType}/${currentSection._id}/${user._id}`,
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
      `http://localhost:4000/${reviewType}/${currentSection._id}/${user._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      }
    );
    await savedReviewResponse.json();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    if (isDorm || isClub) {
      await saveReviewWithImage(values);
    } else {
      await saveReview(values);
    }
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    
    onSubmitProps.resetForm();
    window.location.reload(false);
    props.setOpen(false);
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
            {/* RATING */}
            <Box sx={{ gridColumn: "span 4" }}>
              <Typography variant="h4b" component="legend">{`Rating (${values.rating}/5)`}</Typography>
              <Rating
                label="Rating"
                variant="standard"
                onBlur={handleBlur}
                onChange={(event, rating) => {
                  if (rating) {
                    setFieldValue("rating", rating);
                  }
                }}
                value={values.rating}
                max={5}
                sx={{ fontSize: "2rem" }}
              />
            </Box>

            {/* INDUSTRY, JOB TITLE, LOCATION, EMPLOYMENT TYPE */}
            {isInternship && (
              <>
                <Autocomplete
                  id="industries"
                  options={Constants.INDUSTRIES}
                  noOptionsText={"No Industry Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.industry}
                  onChange={(event, industry) => {
                    setFieldValue("industry", industry);
                  }}
                  sx={{ gridColumn: "span 4" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Industry"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  id="jobTitles"
                  options={Constants.JOB_TITLES}
                  noOptionsText={"No Job Title Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.jobTitle}
                  onChange={(event, jobTitle) => {
                    setFieldValue("jobTitle", jobTitle);
                  }}
                  sx={{ gridColumn: "span 4" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Job Title"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  id="locations"
                  options={Constants.CITIES}
                  noOptionsText={"No Location Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.location}
                  onChange={(event, location) => {
                    setFieldValue("location", location);
                  }}
                  sx={{ gridColumn: "span 4" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  id="employmentTypes"
                  options={Constants.EMPLOYMENT_TYPES}
                  noOptionsText={"No Employment Type Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.employmentType}
                  onChange={(event, employmentType) => {
                    setFieldValue("employmentType", employmentType);
                  }}
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Employment Type"
                      variant="standard"
                    />
                  )}
                />
              </>
            )}

            {/* TERM */}
            {(isInternship || isClub || isProfessor) && (
                <Autocomplete
                  id="terms"
                  options={Constants.TERMS}
                  noOptionsText={"No Term Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.term}
                  onChange={(event, term) => {
                    setFieldValue("term", term);
                  }}
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Term"
                      variant="standard"
                    />
                  )}
                />
              )
            }

            {/* CAMPUS & ROOM OPTIONS */}
            {isDorm && (
              <>
                <Autocomplete
                  id="campus"
                  options={Constants.CAMPUS_OPTIONS}
                  noOptionsText={"No Campus Option Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.campus}
                  onChange={(event, campus) => {
                    setFieldValue("campus", campus);
                  }}
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="On/Off Campus"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  id="rooms"
                  options={Constants.ROOMS_OPTIONS}
                  noOptionsText={"No Room Option Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.rooms}
                  onChange={(event, rooms) => {
                    setFieldValue("rooms", rooms);
                  }}
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Rooms"
                      variant="standard"
                    />
                  )}
                />
              </>
            )}

            {/* CATEGORY */}
            {isClub && (
                <Autocomplete
                  id="categories"
                  options={Constants.CLUB_CATEGORIES}
                  noOptionsText={"No Category Found"}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  value={values.category}
                  onChange={(event, category) => {
                    setFieldValue("category", category);
                  }}
                  sx={{ gridColumn: "span 2" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Category"
                      variant="standard"
                    />
                  )}
                />
              )
            }

            {/* CLASS */}
            {isProfessor && (
              <>
                <TextField
                  label="Class"
                  variant="standard"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.className}
                  name="className"
                  error={Boolean(touched.className) && Boolean(errors.className)}
                  helperText={touched.className && errors.className}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}
            
            {/* COMMENTS */}
            <TextField
              label="Comment"
              multiline
              rows={6}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.comment}
              name="comment"
              error={Boolean(touched.comment) && Boolean(errors.comment)}
              helperText={touched.comment && errors.comment}
              sx={{ gridColumn: "span 4" }}
            />

            {/* IMAGE UPLOADS */}
            {(isDorm || isClub) && (
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                padding="1rem"
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
                      padding="1rem"
                      textAlign="center"
                      sx={{ "&:hover": { cursor: "pointer" } }}
                    >
                      <input {...getInputProps()} />
                      {values.files.length === 0 ? (
                        <FlexBetween>
                          <Typography variant="h3r" alignItems="center">Add Picture Here</Typography>
                          <ImageIcon />
                        </FlexBetween>
                      ) : (
                        <FlexBetween>
                          <Box>
                            {values.files.map((file) => (
                              <Typography variant="h3r" key={file.name} display="block">
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
            )}
          </Box>

          {/* Submit Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.button.default,
                color: palette.background.alt,
                "&:hover": { 
                  backgroundColor: palette.button.alt,
                },
              }}
            >
              {loading ? <LoadingComponent /> : <Typography variant="h3b">SUBMIT</Typography>}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ReviewForm;
