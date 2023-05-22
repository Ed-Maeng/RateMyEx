import { Box, CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  
  return (
    <CircularProgress size="5rem"
      sx={{
        position: "absolute",
        top: "50%",
        left: "49%", // TODO: Might need to figure out why 50% looks off?
        // alignItems: "center",
      }}
    />
  );
}

export default LoadingComponent;
