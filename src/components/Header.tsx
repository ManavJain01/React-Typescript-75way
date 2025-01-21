import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { ThemeContext } from "../ThemeContext";
import { ReactComponent as Logo } from '../../public/vite.svg';

const Header: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeContextProvider");
  }

  const { toggleTheme, mode } = themeContext;

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "30px",
        padding: "10px 20px",
        background: mode === "light" ? "#f4f6f8" : "#1e1e1e",
      }}
    >
      <Logo width={30} height={30} />
      <Typography variant="h6" sx={{ flexGrow: 1 }}>My Application</Typography>
      <Button variant="contained" onClick={toggleTheme}>
        Toggle {mode === "light" ? "Dark" : "Light"} Mode
      </Button>
    </header>
  );
};

export default Header;
