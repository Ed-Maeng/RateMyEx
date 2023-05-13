import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLogin } from "../state/auth";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailToken } = useParams();

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
    } else {
      console.log(verifiedUser.msg);
    }
    navigate("/");
  };

  useEffect(() => {
    verifyEmail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <></>
  );
}
 
export default EmailVerification;
