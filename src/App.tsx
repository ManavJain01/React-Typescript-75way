import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

// Importing Layouts
import Basic from "./layouts/Basic";

// Importing Components
import PrivateRoute from "./components/Auth/PrivateRoute";
import PublicRoute from "./components/Auth/PublicRoute";
import RoleAuthRoute from "./components/Auth/RoleAuthRoute";
import { useAppSelector } from "./store/store";

// Importing Pages
import Home from "./pages/homepage";
import ResetPassword from "./components/Auth/ResetPassword";
import SignUp from "./pages/signup";
import Login from "./pages/loginpage";
import NotFoundPage from "./pages/notfoundpage";
import LazyComponent from "./components/LazyComponent";

const App: React.FC = () => {
  // useSelector
  const authData = useAppSelector((store) => store.auth);

  // useState
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect
  useEffect(() => {
    setIsAuthenticated(authData.isAuthenticated || false);
  }, [authData]);

  return (
    <Routes>
      <Route element={<Basic />}>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Public Routes */}
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>

        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
