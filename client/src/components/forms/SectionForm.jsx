import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ImageIcon from '@mui/icons-material/Image';
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
import { useLocation } from "react-router-dom";

// Components & Schema
import {
  initialValuesSectionForm,
  sectionFormSchema,
} from "../../constants/InitialSchema";
import FlexBetween from "../FlexBetween";

const SectionForm = (props) => {
  const { palette } = useTheme();

  // State of User, Token & Current Section
  const token = useSelector((state) => state.token);
  const school = useSelector((state) => state.school);

  // Review Types
  const reviewType = useLocation().pathname.split("/")[2];

  const saveSection = async (values) => {
    const formData = new FormData();
    formData.append("name", values["name"]);
    formData.append("file", values["file"][0]);

    const savedSectionResponse = await fetch(
      `http://localhost:4000/${reviewType}/${school._id}`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData,
      }
    );
    await savedSectionResponse.json();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await saveSection(values);
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
              label="Name"
              variant="standard"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
            />

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
              <Typography variant="h3b">SUBMIT</Typography>
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SectionForm;
