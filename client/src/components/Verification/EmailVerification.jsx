import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLogin } from "../../state/auth";
import Dialogs from "../dialogs/Dialogs";

import LoadingComponent from "../LoadingComponent";

const EmailVerification = () => {
  const dispatch = useDispatch();
  // State of Email Token for verification
  const { emailToken } = useParams();
  // Types of Open Dialogs
  const [verifiedOpen, setVerifiedOpen] = useState(false);
  const [notVerifiedOpen, setNotVerifiedOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // Check if it is in local or production
  const isLocal = window.location.href.split("/")[2] === "localhost:3000";

  const verifyEmail = async () => {  
    setLoading(true);
    const verifyEmailResponse = await fetch(
      isLocal ? "http://localhost:4000/auth/verifyemail" : "https://api.ratemyexschool.com:8443/auth/verifyemail",
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${emailToken}` },
      }
    );
    const verifiedUser = await verifyEmailResponse.json();
    await new Promise(r => setTimeout(r, 3000)); // TODO: For testing purposes - remove later

    if (verifyEmailResponse.status === 200) {
      dispatch(
        setLogin({
          user: verifiedUser.user,
          token: verifiedUser.token,
        })
      );
      setVerifiedOpen(true);
    } else {
      setNotVerifiedOpen(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyEmail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ?? <LoadingComponent />}
      {/* Warning Dialogs */}
      <Dialogs open={verifiedOpen} setOpen={setVerifiedOpen} type="verified" />
      <Dialogs open={notVerifiedOpen} setOpen={setNotVerifiedOpen} type="not-verified" />
    </>
  );
}
 
export default EmailVerification;
