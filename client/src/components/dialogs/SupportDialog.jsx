import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dialogs from "../dialogs/Dialogs";
// Icons
import SendIcon from '@mui/icons-material/Send';

const SupportDialog = (props) => {
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
      console.log("Response Issue in SupportDialog in submitFeedback");
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
        <Alert 
          severity="info" 
          onClose={() => {
            props.setOpen(false);
            setError(false);
            setFeedback("");
          }}
          sx={{ p: "2rem" }}
        >
          {/* TITLE */}
          <Grid container direction="column" spacing={0.5}>
            <Grid item>
              <AlertTitle>
                <Typography variant="h2b">Help</Typography>
              </AlertTitle>
            </Grid>

            <Grid item>
              <Typography variant="h2r">
                Write any <strong>questions</strong> or <strong>concerns</strong> about the website here!
              </Typography>
            </Grid>
            
            <Grid item width="750px">
              <DialogContent>
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
            </Grid>

            <Grid item>
              <DialogActions>
                <Button
                  variant="outlined"
                  endIcon={<SendIcon />}
                  onClick={() => {
                    if (feedback.length > 10) {
                      submitFeedback();
                      props.setOpen(false);
                      setFeedback("");
                    } else {
                      setError(true);
                    }
                  }}
                  sx={{
                    width: "100px",
                    borderRadius: "0.25rem",
                  }}
                >
                  <Typography variant="h6b">{"SEND"}</Typography>
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
          
          {/* <DialogContent>
            <Typography variant="h2r">
              Write any <strong>questions</strong> or <strong>concerns</strong> about the website here!
            </Typography>
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
          </DialogActions> */}
        </Alert>
      </Dialog>

      {/* WARNING DIALOGS */}
      <Dialogs open={sentSupport} setOpen={setSentSupport} type="support" />
      <Dialogs open={signInOpen} setOpen={setSignInOpen} type="not-signin" />
      <Dialogs open={defaultOpen} setOpen={setDefaultOpen} type="default" />
    </>
  );
}

export default SupportDialog;
