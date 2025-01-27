import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  user?: Record<string, any>;
  onSave: (data: Record<string, any>) => void;
}

const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, user, onSave }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
  });

  // Sync user data to the form when `user` changes
  useEffect(() => {
    if (user) {
      reset({ ...user, password: '' }); // Reset form with user data, keeping additional fields
    } else {
      reset({ name: '', email: '', password: '', role: '' }); // Clear form
    }
  }, [user, reset]);

  // Form submission
  const onSubmit = (data: Record<string, any>) => {
    const formData = { ...user, ...data }; // Merge user with form data, preserving additional fields
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} autoFocus margin="dense" label="Name" fullWidth />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} margin="dense" label="Email" type="email" fullWidth />
            )}
          />
          {!user && (
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField {...field} margin="dense" label="Password" type="password" fullWidth />
              )}
            />
          )}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="dense">
                <InputLabel>Role</InputLabel>
                <Select {...field} label="Role">
                  <MenuItem value="ADMIN">ADMIN</MenuItem>
                  <MenuItem value="USER">USER</MenuItem>
                  <MenuItem value="MANAGER">MANAGER</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDialog;