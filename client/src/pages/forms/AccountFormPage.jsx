import { Box } from "@mui/material";
import Logo from '../../components/Logo';
import Form from "../../components/forms/Form";
import ResetPasswordForm from "../../components/forms/ResetPasswordForm";

const AccountFormPage = (props) => {
  return (
    <Box pt="3rem">
      {/* LOGO */}
      <Logo />
      
      {/* FORM */}
      <Box m="2rem auto" width="50%">
        {(props.page === "signin") ? <Form /> : <ResetPasswordForm/>}
      </Box>
    </Box>
  );
};

export default AccountFormPage;
