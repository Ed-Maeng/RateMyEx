import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Components
import {
  initialValuesReset,
  resetSchema
} from "../../constants/InitialSchema";
import Dialogs from "../dialogs/Dialogs";

// Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const ResetPasswordForm = () => {
  const { palette } = useTheme();
  // State of Email Token for verification
  const { emailToken } = useParams();
  // Types of Open Dialogs
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [notResetOpen, setNotResetOpen] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

  const resetPassword = async (values, onSubmitProps) => {  
    const resetPasswordResponse = await fetch(
      isLocal ? "http://localhost:4000/auth/reset" : "https://api.ratemyexschool.com:8443/auth/reset",
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${emailToken}` 
        },
        body: JSON.stringify(values),
      }
    );

    onSubmitProps.resetForm();

    if (resetPasswordResponse.status === 200) {
      setResetOpen(true);
    } else {
      setNotResetOpen(true);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await resetPassword(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesReset}
      validationSchema={resetSchema}
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
              label="New Password"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.newPassword}
              name="newPassword"
              error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              sx={{ gridColumn: "span 4" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle newPassword visibility'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              name="confirmPassword"
              error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              sx={{ gridColumn: "span 4" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle confirmPassword visibility'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                backgroundColor: palette.button.default,
                color: palette.background.alt,
                "&:hover": { 
                  backgroundColor: palette.button.alt,
                },
              }}
            >
              <Typography variant="h2b">RESET PASSWORD</Typography>
            </Button>
          </Box>
          
          {/* Warning Dialogs */}
          <Dialogs open={resetOpen} setOpen={setResetOpen} type="reset" />
          <Dialogs open={notResetOpen} setOpen={setNotResetOpen} type="not-reset" />
        </form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
