import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Define a type for the slice state
interface AuthState {
  id: string,
  name: string,
  email: string,
  role: string,
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  id: localStorage.getItem("id") || "",
  name: localStorage.getItem("name") || "",
  email: localStorage.getItem("email") || "",
  role: localStorage.getItem("role") || "",
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  isAuthenticated: localStorage.getItem("accessToken") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string, name: string; email: string; role: string; }>) => {
      if(!action.payload.id && !action.payload.name && !action.payload.email && !action.payload.role){
        toast.error("User Credentials not found");
        resetTokens();
        throw new Error("User Credentials not found!!!");
      }

      localStorage.setItem("id", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("role", action.payload.role);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    logoutUser: (state) => {
      state.id = "";
      state.name = "";
      state.email = "";
      state.role = "";
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
    },
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      if(!action.payload.accessToken && !action.payload.refreshToken){
        toast.error("Tokens not found");
        throw new Error("Tokens not found!!!");
      }

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    resetTokens: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { setTokens, resetTokens, setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;