import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, IconButton, Typography, } from "@mui/material";
import { useLocation } from "react-router-dom";
import SectionForm from "../../components/forms/SectionForm";

const SectionFormPage = (props) => {
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
            sx={{ textTransform: 'capitalize' }}
          >
            <Typography
              variant="h1b"
              color="primary"
            >
              {`Write Your ${reviewType}!`}
            </Typography>
          </Box>

          <Box m="auto" width="50%">
            <SectionForm open={props.open} setOpen={props.setOpen} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SectionFormPage;
