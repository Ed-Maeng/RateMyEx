import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
// Components & Schema
import {
  initialValuesSectionForm,
  sectionFormSchema,
} from "../../constants/InitialSchema";
import FlexBetween from "../wrappers/FlexBetween";
// Icons
import CheckIcon from '@mui/icons-material/Check';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ImageIcon from '@mui/icons-material/Image';
import Dropzone from "react-dropzone";

const SectionForm = (props) => {
  const { palette } = useTheme();
  // State of User, Token & Current Section
  const token = useSelector((state) => state.token);
  const school = useSelector((state) => state.school);
  // Review Types
  const reviewType = window.location.pathname.split("/")[2];
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Loading
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const saveSection = async (values) => {
    const formData = new FormData();
    formData.append("name", values["name"]);
    if (values["file"]) {
      formData.append("file", values["file"][0]);
    }

    await fetch(
      isLocal ? `http://localhost:4000/${reviewType}/${school._id}` : `https://api.ratemyexschool.com:8443/${reviewType}/${school._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      }
    );
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    await saveSection(values);
    await new Promise(r => setTimeout(r, 250));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 500));
    onSubmitProps.resetForm();
    window.location.reload(false);
    props.setOpen(false);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesSectionForm}
      validationSchema={sectionFormSchema}
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
            <TextField
              label="Name*"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
            />
            
            {!(window.location.pathname.split("/")[2] === "professors") &&
              <Box
                gridColumn="span 4"
                border={`1px solid ${palette.neutral.medium}`}
                borderRadius="5px"
                padding="1rem"
              >
                <Dropzone
                  acceptedFile=".jpg,.jpeg,.png"
                  onDrop={(acceptedFile) =>
                    setFieldValue("file", acceptedFile)
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
                      {!values.file ? (
                        <FlexBetween>
                          <Typography variant="h3r" alignItems="center">Add Picture Here</Typography>
                          <ImageIcon />
                        </FlexBetween>
                      ) : (
                        <FlexBetween>
                          <Box>
                            <Typography variant="h3r" key={values.file[0].name} display="block">
                              {values.file[0].name}
                            </Typography>
                          </Box>
                          <EditOutlinedIcon />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            }
          </Box>

          {/* Submit Button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                color: palette.background.alt,
                bgcolor: (success ? "green" : palette.button.default),
                "&:hover": { 
                  bgcolor: (success ? "green" : palette.button.alt)
                },
              }}
            >
              <FlexBetween>
                <Typography variant="h3b" >SUBMIT</Typography>
                {loading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
                {success && (
                  <CheckIcon />
                )}
              </FlexBetween>
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SectionForm;
