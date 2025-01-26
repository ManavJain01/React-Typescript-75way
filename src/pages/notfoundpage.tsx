import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: "5rem", fontWeight: "bold" }}
      >
        404
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Go Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
