// src/components/LoadingPage.tsx
import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.paper",
      }}
    >
      <CircularProgress sx={{ marginBottom: 2 }} />
      <Typography variant="h6" color="text.secondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default LoadingPage;
