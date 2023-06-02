import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { GoogleLogin } from '@react-oauth/google';
import { Formik } from "formik";
import jwt_decode from "jwt-decode";
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
import Dialogs from "../dialogs/Dialogs";

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
  const [defaultOpen, setDefaultOpen] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

  const register = async (values, onSubmitProps) => {    
    const registerResponse = await fetch(
      isLocal ? "http://localhost:4000/auth/register" : "https://api.ratemyexschool.com:8443/auth/register",
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
      setDefaultOpen(true);
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      isLocal ? "http://localhost:4000/auth/login" : "https://api.ratemyexschool.com:8443/auth/login",
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
      setDefaultOpen(true);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  const onSuccess = async (res) => {
    const values = jwt_decode(res.credential);
    
    const oauthResponse = await fetch(
      isLocal ? "http://localhost:4000/auth/oauth" :"https://api.ratemyexschool.com:8443/auth/oauth",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const oauth = await oauthResponse.json();
    if (oauthResponse.status === 200 || oauthResponse.status === 201) {
      dispatch(
        setLogin({
          user: oauth.user,
          token: oauth.token,
        })
      );
      navigate("/");
    } else if (oauthResponse.status === 400) {
      setschoolEmailNotFoundOpen(true);
    } else {
      setDefaultOpen(true);
    }
  };

  const onFailure = (res) => {
    setDefaultOpen(true);
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
          <Grid
            container
            direction="column"
            gap="30px"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              {/* Google OAuth */}
              <GoogleLogin
                fullWidth
                clientId={"980561439678-8dkln531dm56ljkn8jcvbmslabo246ps.apps.googleusercontent.com"}
                size="large"
                width="200"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
              />
            </Grid>

            <Grid item pb="1.5rem" style={{ alignSelf: "stretch" }}>
              <Divider>
                <Typography variant="h2b">OR</Typography>
              </Divider>
            </Grid>
          </Grid>

          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
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
              <Typography variant="h2b">
                {isLogin ? "LOGIN" : "REGISTER"}
              </Typography>
            </Button>

            { /* Click to Change from Logging In to Register (vice versa) */ }
            <Typography
              variant="h3b"
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
          <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
        </form>
      )}
    </Formik>
  );
};

export default Form;
