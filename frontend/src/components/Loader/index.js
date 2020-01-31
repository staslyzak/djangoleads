import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { isNegative } from "@utils";

const Loader = ({
  loading,
  error,
  children,
  minHeight = "calc(100vh - 64px)"
}) => {
  if (error) return null;
  return isNegative(loading) ? (
    children
  ) : (
    <Box
      h={100}
      w={100}
      minHeight={minHeight}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={70} />
    </Box>
  );
};

export default Loader;
