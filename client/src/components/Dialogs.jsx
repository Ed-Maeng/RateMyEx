import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as InitialDialog from "../constants/InitialDialog";

const Dialogs = (props) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  let dialog = {};

  switch(props.type) {
    /* --- Register --- */
    case "sent-verify":
      dialog = InitialDialog.sentVerifyDialog;
      break;
    case "user-found":
      dialog = InitialDialog.userAlreadyFoundDialog;
      break;
    case "no-school-email":
      dialog = InitialDialog.schoolEmailNotFoundDialog;
      break;
    /* --- Log In --- */
    case "no-user":
      dialog = InitialDialog.userNotFoundDialog;
      break;
    case "need-verify":
      dialog = InitialDialog.needVerifyDialog;
      break;
    case "wrong-password":
      dialog = InitialDialog.wrongPasswordDialog;
      break;
    /* --- Email Verification --- */
    case "verified":
      dialog = InitialDialog.verifiedDialog;
      break;
    case "not-verified":
      dialog = InitialDialog.notVerifiedDialog;
      break;
    /* --- Review Access --- */
    case "not-signin":
      dialog = InitialDialog.needSignInDialog;
      break;
    case "no-review":
      dialog = InitialDialog.needReviewDialog;
      break;
    /* --- Support --- */
    case "support":
      dialog = InitialDialog.sentSupport;
      break;
    default:
      dialog = InitialDialog.defaultDialog;
      break;
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => {
        dialog.path && navigate(dialog.path);
        props.setOpen(false);
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {dialog.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialog.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
            onClick={() => {
              dialog.path && navigate(dialog.path);
              props.setOpen(false);
            }}
            variant="contained" 
            sx={{
              backgroundColor: palette.button.signup,
              width: "90px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "&:hover": {
                backgroundColor: palette.button.alt,
              }
            }}
          >
            <Typography variant="h6b">{dialog.buttonName}</Typography>
          </Button>
      </DialogActions>
    </Dialog>
  );
}
 
export default Dialogs;
