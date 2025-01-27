import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useAppSelector } from "../../store/store";
import { useUpdateUserMutation } from "../../services/user.api";
import { motion } from "framer-motion";

interface ProfileData {
  name: string;
  email: string;
  role: string;
}

interface ProfileFormProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ profile, setProfile }) => {
  const authData = useAppSelector((store) => store.auth);
  const [updateProfile] = useUpdateUserMutation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<ProfileData>({
    defaultValues: profile, // Initialize with profile data
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ id: authData.id, data: profile });
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const handleCancel = () => {
    reset(profile); // Reset form to original profile data
    setIsEditing(false);
  };

  const handleEdit = () => {
    reset(profile); // Pre-fill form with existing profile data
    setIsEditing(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            disabled={!isEditing}
            value={profile.name}
            {...register("name", { required: "Name is required" })}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            disabled={!isEditing}
            value={profile.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <FormControl fullWidth margin="normal" error={!!errors.role}>
            <Select
              labelId="role-label"
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
              disabled={!isEditing}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
              <MenuItem value="MANAGER">MANAGER</MenuItem>
            </Select>
            <FormHelperText>{errors.role?.message}</FormHelperText>
          </FormControl>
        </motion.div>

        <Box mt={2}>
          {isEditing ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                fullWidth
                style={{ marginTop: "10px" }}
              >
                Cancel
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEdit}
                fullWidth
              >
                Edit Profile
              </Button>
            </motion.div>
          )}
        </Box>
      </form>
    </motion.div>
  );
};

export default ProfileForm;