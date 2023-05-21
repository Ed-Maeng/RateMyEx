import { TextField } from "@mui/material";
import { styled } from "@mui/system";

const SearchText = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    legend: {
      marginLeft: "30px"
    }
  },
  "& .MuiAutocomplete-inputRoot": {
    paddingLeft: "20px !important",
    borderRadius: "50px"
  },
  "& .MuiInputLabel-outlined": {
    paddingLeft: "20px"
  },
  "& .MuiInputLabel-shrink": {
    marginLeft: "20px",
    paddingLeft: "10px",
    paddingRight: 0,
    background: "white"
    },
});

export default SearchText;
