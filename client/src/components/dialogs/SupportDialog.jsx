import { useTheme } from "@emotion/react";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dialogs from "./Dialogs";

const SupportDialog = (props) => {
  const { palette } = useTheme();
  // State of User & Token
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  // Dialogs
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(false);
  const [sentSupport, setSentSupport] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

  const submitFeedback = async () => {
    const submitResponse = await fetch(
      isLocal ? `http://localhost:4000/users/support` 
      : `https://api.ratemyexschool.com:8443/users/support`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ user, feedback }),
      }
    );

    if (submitResponse.status === 200) {
      setSentSupport(true);
    } else if (submitResponse.status === 401) {
      setSignInOpen(true);
    } else {
      setDefaultOpen(true);
    }
  };

  return (
    <>
      <Dialog
        open={props.open}
        aria-labelledby="support-dialog-title"
        aria-describedby="support-dialog-description"
        scroll="paper"
        fullWidth
        maxWidth="md"
      >
        {/* TITLE */}
        <DialogTitle id="support-dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h2b">{"Help"}</Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                props.setOpen(false);
                setFeedback("");
              }}
              aria-label="close"
              sx={{
                "&:hover": { cursor: "pointer" },
                height: "40px",
                width: "40px",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>  
        </DialogTitle>
        {/* LEAVE FEEDBACK */}
        <DialogContent>
          <DialogContentText id="support-dialog-description" pb="1rem">
            {"Write any questions or concerns about the website here!"}
          </DialogContentText>
          <TextField
            label="Leave Feedback"
            multiline
            fullWidth
            rows={10}
            value={feedback}
            error={error}
            helperText={error ? "Must be more than 10 characters" : ""}
            onChange={(e) => {
              setFeedback(e.target.value);
              if (feedback.length > 10) {
                setError(false);
              }
            }}
          />
        </DialogContent>
        {/* SEND BUTTON */}
        <DialogActions>
          <Button
            onClick={() => {
              if (feedback.length > 10) {
                submitFeedback();
                props.setOpen(false);
                setFeedback("");
              } else {
                setError(true);
              }
            }}
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              backgroundColor: palette.button.signup,
              width: "100px",
              borderRadius: "0.25rem",
              p: "0.5rem",
              "&:hover": {
                backgroundColor: palette.button.alt,
              }
            }}
          >
            <Typography variant="h6b">{"SEND"}</Typography>
          </Button>
        </DialogActions>
      </Dialog>

      {/* WARNING DIALOGS */}
      <Dialogs open={sentSupport} setOpen={setSentSupport} type="support" />
      <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </>
  );
}

export default SupportDialog;
