import CloseIcon from '@mui/icons-material/Close';
import { Box, Dialog, DialogContent, IconButton, Typography, } from "@mui/material";
import ReviewForm from "../../components/forms/ReviewForm";

const ReviewFormPage = (props) => {
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
            textAlign="center"
          >
            <Typography
              variant="h1b"
              color="primary"
            >
              {`Write Your Review!`}
            </Typography>
          </Box>

          <Box m="auto" width="50%">
            <ReviewForm open={props.open} setOpen={props.setOpen} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewFormPage;
