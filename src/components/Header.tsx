// Importing React Icons
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

import React, { useContext, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { ThemeContext } from "../ThemeContext";
import { ReactComponent as Logo } from "../../public/vite.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { resetTokens, logoutUser } from "../store/reducers/authReducer";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  // useSelector
  const authData = useAppSelector((store) => store.auth);

  const dispatch = useAppDispatch();

  // Context API
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext must be used within a ThemeContextProvider");
  }

  // useState
  const { toggleTheme, mode } = themeContext;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string>("user");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // useEffect
  useEffect(() => {
    if (authData.accessToken && authData.name) {
      setUsername(authData.name || "user");
      handleAuthentication(true);
    } else handleAuthentication(false);
  }, [authData]);

  // Functions
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAuthentication = (bool: boolean) => {
    setIsAuthenticated(bool);
  };

  const handleLogout = () => {
    dispatch(resetTokens());
    dispatch(logoutUser());
    handleAuthentication(false);
  };

  return (
    <AppBar position="static" color={mode === "light" ? "default" : "primary"}>
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "15px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Logo width={30} height={30} />
          </motion.div>
          <Typography variant="h6">My Project</Typography>
        </Link>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {isAuthenticated ? (
            <div>
              <Button color="inherit" onClick={handleMenuClick}>
                Hi, {username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link to="/profile" style={{ margin: "0 auto" }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/login" color="inherit">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signup" color="inherit">
                  Signup
                </Link>
              </motion.div>
            </>
          )}

          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button variant="contained" onClick={toggleTheme}>
              {mode === "light" ? (
                <MdSunny size={20} color={"yellow"} />
              ) : (
                <FaMoon size={20} color={"#ffffff"} />
              )}
            </Button>
          </motion.div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;