import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useContext } from "react";
import styles from "./Basic.module.css";
import { ThemeContext } from "../ThemeContext";

const Basic: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeContextProvider");
  }

  const { mode } = themeContext;

  return (
    <Stack
      className={
        styles.basicLayout && mode === "light" ? styles.light : styles.dark
      }
      direction={"column"}
      justifyContent={"space-between"}
    >
      <Header />
      <Box sx={{ minHeight: "80vh", flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
};

export default Basic;
