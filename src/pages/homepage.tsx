import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/store";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  const authdata = useAppSelector((store) => store.auth);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 4,
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        {t("home page.welcome")}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {t("home page.description")}
      </Typography>

      {!authdata.isAuthenticated && (
        <Button variant="outlined" component={Link} to="/signup">
          Get Started
        </Button>
      )}
    </Box>
  );
};

export default HomePage;
