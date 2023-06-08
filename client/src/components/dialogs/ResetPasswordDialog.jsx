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
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import Dialogs from "./Dialogs";
// Icons
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

const SupportDialog = (props) => {
  const { palette } = useTheme();
  // Dialogs
  const [email, setEmail] = useState("");
  const [sentReset, setSentReset] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [needVerifyDialog, setNeedVerifyDialog] = useState(false);
  const [defaultOpen, setDefaultOpen] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

  const sendResetPassword = async () => {
    const submitResponse = await fetch(
      isLocal ? `http://localhost:4000/auth/send/reset` 
      : `https://api.ratemyexschool.com:8443/auth/send/reset`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (submitResponse.status === 200) {
      setSentReset(true);
    } else if (submitResponse.status === 404) {
      setEmailNotFound(true);
    } else if (submitResponse.status === 403) {
      setNeedVerifyDialog(true);
    } else {
      setDefaultOpen(true);
    }
  };

  return (
    <>
      <Dialog
        open={props.open}
        aria-labelledby="reset-password-dialog-title"
        aria-describedby="reset-password-dialog-description"
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        {/* TITLE */}
        <DialogTitle id="reset-password-dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h2b">{"Forgot Password?"}</Typography>
            <IconButton
              color="inherit"
              onClick={() => {
                props.setOpen(false);
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
            {"Please provide your email to reset your password"}
          </DialogContentText>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        {/* SEND BUTTON */}
        <DialogActions>
          <Button
            onClick={() => {
              sendResetPassword();
              props.setOpen(false);
              setEmail("");
            }}
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              bgcolor: palette.button.signup,
              width: "100px",
              borderRadius: "0.25rem",
              p: "0.5rem",
              "&:hover": {
                bgcolor: palette.button.alt,
              }
            }}
          >
            <Typography variant="h6b">{"SEND"}</Typography>
          </Button>
        </DialogActions>
      </Dialog>

      {/* WARNING DIALOGS */}
      <Dialogs open={sentReset} setOpen={setSentReset} type="sent-reset-password" />
      <Dialogs open={emailNotFound} setOpen={setEmailNotFound} type="no-email-found" />
      <Dialogs open={needVerifyDialog} setOpen={setNeedVerifyDialog} type="need-verify" />
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </>
  );
}

export default SupportDialog;
