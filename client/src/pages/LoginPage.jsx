import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const LoginPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 1.5rem, 1.5rem)"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            RateMyEx
          </Typography>
      </Box>

      <Box
        width="50%"
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome Students!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
