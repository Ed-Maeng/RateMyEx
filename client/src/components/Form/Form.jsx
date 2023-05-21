import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  initialValuesLogin,
  initialValuesRegister,
  loginSchema,
  registerSchema
} from "../../constants/InitialSchema";
import { setLogin } from "../../state/auth";
import Dialogs from "../Dialogs";

const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Types of Pages (Login or Register)
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // Types of Open Dialogs
  const [sentVerifyOpen, setSentVerifyOpen] = useState(false);
  const [userAlreadyFoundOpen, setUserAlreadyFoundOpen] = useState(false);
  const [schoolEmailNotFoundOpen, setschoolEmailNotFoundOpen] = useState(false);
  const [userNotFoundOpen, setUserNotFoundOpen] = useState(false);  
  const [needVerifyOpen, setNeedVerifyOpen] = useState(false);
  const [wrongPasswordOpen, setWrongPasswordOpen] = useState(false);
  const [defaultOpen, setDefaultdOpen] = useState(false);

  const register = async (values, onSubmitProps) => {    
    const registerResponse = await fetch(
      "http://localhost:4000/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    await registerResponse.json();
    onSubmitProps.resetForm();

    if (registerResponse.status === 201) {
      setSentVerifyOpen(true);
    } else if (registerResponse.status === 409) {
      setUserAlreadyFoundOpen(true);
      setPageType("login");
    } else if (registerResponse.status === 400) {
      setschoolEmailNotFoundOpen(true);
    } else {
      setDefaultdOpen(true);
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      "http://localhost:4000/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();

    if (loggedInResponse.status === 200) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/");
    } else if (loggedInResponse.status === 404) {
      setUserNotFoundOpen(true);
      setPageType("register");
    } else if (loggedInResponse.status === 401) {
      setNeedVerifyOpen(true);
    } else if (loggedInResponse.status === 400) {
      setWrongPasswordOpen(true);
    } else {
      setDefaultdOpen(true);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const onSuccess = (res) => {
    console.log('Login Success:', res);
    dispatch(
      setLogin({
        user: 'test', // leave as email for now until we add user
        token: 'test', // leave 'test' for now until we add token
      })
    );
    navigate("/");
  };

  const onFailure = (res) => {
    console.log('Login failed:', res);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
            sx={{
              "& > div": { gridColumn: undefined },
            }}
          >
            {/* TODO: Add Google OAuth for Sign In*/}
            <GoogleLogin
              clientId={'980561439678-8dkln531dm56ljkn8jcvbmslabo246ps.apps.googleusercontent.com'}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              style={{ marginTop: '100px' }}
              isSignedIn={true}
            />

            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName || ""}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName || ""}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* Login Button */}
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
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>

            { /* Click to Change from Logging In to Register (vice versa) */ }
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.button.default,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.button.alt,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here!"
                : "Already have an account? Login here!"}
            </Typography>
          </Box>
          
          {/* Warning Dialogs */}
          { /* REGISTER */ }
          <Dialogs open={sentVerifyOpen} setOpen={setSentVerifyOpen} type="sent-verify" />
          <Dialogs open={userAlreadyFoundOpen} setOpen={setUserAlreadyFoundOpen} type="user-found" />
          <Dialogs open={schoolEmailNotFoundOpen} setOpen={setschoolEmailNotFoundOpen} type="no-school-email" />

          { /* LOG IN */ }
          <Dialogs open={userNotFoundOpen} setOpen={setUserNotFoundOpen} type="no-user" />
          <Dialogs open={needVerifyOpen} setOpen={setNeedVerifyOpen} type="need-verify" />
          <Dialogs open={wrongPasswordOpen} setOpen={setWrongPasswordOpen} type="wrong-password" />

          { /* DEFAULT */ }
          <Dialogs open={defaultOpen} setOpen={setDefaultdOpen} type="default" />
        </form>
      )}
    </Formik>
  );
};

export default Form;
