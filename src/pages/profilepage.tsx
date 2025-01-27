// src/pages/ProfilePage.tsx

import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../store/store";
import LazyComponent from "../components/LazyComponent";
const ProfileForm = React.lazy(() => import("../components/ProfileForm/ProfileForm"));

interface FormData {
  name: string;
  email: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  // uaseSelector
  const authData = useAppSelector((store) => store.auth);

  // useState
  const [profile, setProfile] = useState<FormData>({
    name: "",
    email: "",
    role: "",
  });

  // useEffect
  useEffect(() => {
    if (authData.name || authData.email || authData.role) {
      setProfile({
        name: authData.name,
        email: authData.email,
        role: authData.role,
      });
    }
    // fetchProfile(); // Fetch profile data when component mounts
  }, []);

  if (!profile)
    return (
      <Stack direction="column" gap="20px">
        <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
          Profile
        </Typography>

        <Typography variant="h6">
          No profile found. Create a new one.
        </Typography>
      </Stack>
    );
  else
    return (
      <Box marginTop={10} marginX="auto" width={500}>
        <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
          Edit Profile
        </Typography>
        
        <LazyComponent><ProfileForm profile={profile} setProfile={setProfile} /></LazyComponent>
      </Box>
    );
};

export default ProfilePage;
