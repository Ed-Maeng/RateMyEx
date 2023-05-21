import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setLogin } from "../../state/auth";
import Dialogs from "../Dialogs";

const EmailVerification = () => {
  const dispatch = useDispatch();

  // State of Email Token for verification
  const { emailToken } = useParams();

  // Types of Open Dialogs
  const [verifiedOpen, setVerifiedOpen] = useState(false);
  const [notVerifiedOpen, setNotVerifiedOpen] = useState(false);

  const verifyEmail = async () => {  
    const verifyEmailResponse = await fetch(
      `http://localhost:4000/auth/verifyemail`,
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${emailToken}` },
      }
    );
    const verifiedUser = await verifyEmailResponse.json();

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
  };

  useEffect(() => {
    verifyEmail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* TODO: Create a loading page (if needed) */
  return (
    <>
      {/* Warning Dialogs */}
      <Dialogs open={verifiedOpen} setOpen={setVerifiedOpen} type="verified" />
      <Dialogs open={notVerifiedOpen} setOpen={setNotVerifiedOpen} type="not-verified" />
    </>
  );
}
 
export default EmailVerification;
