import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as InitialDialog from "../../constants/InitialDialog";

const Dialogs = (props) => {
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
    case "no-user-found":
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
    /* --- Section --- */
    case "section-found":
      dialog = InitialDialog.sectionAlreadyFoundDialog;
      if (props.name) {
        dialog.title = `Have you searched for "${props.name}"?`;
        dialog.content = `Please use the search bar, we already have "${props.name}".`;
      }
      break;
    /* --- Support --- */
    case "support":
      dialog = InitialDialog.sentSupport;
      break;
    /* --- Reset Password --- */
    case "sent-reset-password":
      dialog = InitialDialog.sentResetPassword;
      break;
    case "no-email-found":
      dialog = InitialDialog.emailNotFound;
      break;
    case "reset-password":
      dialog = InitialDialog.resetPassword;
      break;
    case "not-reset-password":
      dialog = InitialDialog.notResetPassword;
      break;
    case "same-password":
      dialog = InitialDialog.samePassword;
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
      <Alert 
        severity={dialog.severity} 
        sx={{ p: "1rem" }}
      >
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <AlertTitle>
              <Typography variant="h2b">{dialog.title}</Typography>
            </AlertTitle>
          </Grid>

          <Grid item px="1rem" pb="0.5rem">
            <Typography variant="h2r">
              {dialog.content}
            </Typography>
          </Grid>

          <Grid item pr="1.5rem">
            <Grid container direction="row-reverse">
              <Button 
                variant="outlined"
                onClick={() => {
                  dialog.path && navigate(dialog.path);
                  props.setOpen(false);
                }}
                sx={{
                  width: "100px",
                  borderRadius: "0.25rem",
                }}
              >
                <Typography variant="h6b">{dialog.buttonName}</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Alert>
    </Dialog>
  );
}
 
export default Dialogs;
