import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, IconButton, Typography, } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SectionForm from "../../components/forms/SectionForm";

const SectionFormPage = (props) => {
  const navigate = useNavigate();

  // Review Types
  const reviewType = useLocation().pathname.split("/")[2];

  return (
    <Dialog
      open={props.open}
      onClose={() => props.setOpen(false)}
      fullScreen
    >
      <DialogContent>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => props.setOpen(false)}
          aria-label="close"
          sx={{
            "&:hover": { cursor: "pointer" },
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
        <Box>
          <Box
            width="100%"
            padding="1rem 6%"
            textAlign="center"
            pt="10rem"
          >
            <Typography
              fontWeight="bold"
              fontSize="clamp(1rem, 1.5rem, 1.5rem)"
              color="primary"
              onClick={() => navigate(`/school/${reviewType}/reviews`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {`Write your ${reviewType} here!`}
            </Typography>
          </Box>

          <Box m="auto" width="50%">
            <SectionForm />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SectionFormPage;
