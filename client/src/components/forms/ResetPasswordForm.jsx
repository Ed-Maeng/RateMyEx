import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  CircularProgress,
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
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FlexBetween from "../wrappers/FlexBetween";

const ResetPasswordForm = () => {
  const { palette } = useTheme();
  // State of Email Token for verification
  const { emailToken } = useParams();
  // Types of Open Dialogs
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [notResetOpen, setNotResetOpen] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";
  // Loading
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    if (resetPasswordResponse.status === 200) {
      setLoading(false);
      setSuccess(true);
      await new Promise(r => setTimeout(r, 500));
      setResetOpen(true);
    } else if (resetPasswordResponse.status === 400) {
      setSamePassword(true);
    } else {
      setNotResetOpen(true);
    }
    
    onSubmitProps.resetForm();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    await resetPassword(values, onSubmitProps);
    setLoading(false);
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
          
          {/* Warning Dialogs */}
          <Dialogs open={resetOpen} setOpen={setResetOpen} type="reset-password" />
          <Dialogs open={notResetOpen} setOpen={setNotResetOpen} type="not-reset-password" />
          <Dialogs open={samePassword} setOpen={setSamePassword} type="same-password" />
        </form>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
