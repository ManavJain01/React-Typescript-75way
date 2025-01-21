import { Box, Stack, Theme, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { createStyles } from "@mui/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import React from "react";

const useStyle = (theme: Theme) => createStyles({
  root: {
    backgroundColor: "lightgrey",
    height: '100vh',
    width: '100vw',
    [theme.breakpoints.up('md')]: {
      backgroundColor: 'lightblue',
    },
  },
});

const Basic: React.FC = () => {
  const theme = useTheme();
  const styles = useStyle(theme);
  return (
    <Stack sx={styles.root} direction={"column"} justifyContent={"space-between"}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
};

export default Basic;
