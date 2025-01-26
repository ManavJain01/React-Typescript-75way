import React, { useState } from "react";
import { useSignUpMutation } from "../services/auth.api";
import { setTokens, setUser } from "../store/reducers/authReducer";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../store/store";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // Default role is USER
  const [signUp, { isLoading, error }] = useSignUpMutation();
  const dispatch = useAppDispatch();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signUp({ name, email, password, role }).unwrap();

      dispatch(
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );

      dispatch(
        setUser({
          id: data.data.user._id,
          name: data.data.user.name,
          email: data.data.user.email,
          role: data.data.user.role,
        })
      );

      toast.success("Sign Up Successful");
    } catch (err) {
      toast.error("Sign Up Failed");
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "50px auto", padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSignUp}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
            required
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="MANAGER">MANAGER</MenuItem>
            <MenuItem value="USER">USER</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ marginTop: "16px" }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
        </Button>
      </form>
      {error && (
        <Typography color="error" variant="body2">
          error
        </Typography>
      )}
    </Box>
  );
};

export default SignUp;
