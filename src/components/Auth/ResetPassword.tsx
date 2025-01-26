// ResetPassword.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useResetPasswordMutation } from "../../services/auth.api";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Extract the token from the query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token");
    }
  }, [token]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Token is missing");
      return;
    }

    try {
      setError(null);

      const response = await resetPassword({
        token: token,
        password: newPassword,
      });

      if (response.data.success) {
        navigate("/login"); // Redirect to login page on success
      } else {
        setError("Password reset failed");
      }
    } catch (error) {
      setError("An error occurred while resetting the password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">Reset Password</Typography>
        {error && (
          <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
