import { CircularProgress } from '@mui/material';

const LoadingComponent = () => {
  return (
    <CircularProgress 
      size="5rem"
      sx={{
        position: "absolute",
        top: "50%",
        left: "49%",
      }}
    />
  );
}

export default LoadingComponent;
