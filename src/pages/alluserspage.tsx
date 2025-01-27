import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useCreateUserMutation, useDeleteUserMutation, useShowUsersMutation, useUpdateUserMutation } from "../services/user.api";
import UserDialog from "../components/AllUsers/UserDialog";
// import { getUsers, deleteUser } from '../api/users';

const AllUsersPage: React.FC = () => {
  // Api Calls
  const [showAllUsers] = useShowUsersMutation();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [users, setUsers] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await showAllUsers("");

      if (!response || !response.data) {
        return;
      }

      const allUsers = response.data.data as [Object];
      setUsers(allUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleAddUser = async () => {
    setSelectedUser(null);
    setOpenDialog(true);
  };

  const handleCreateUser = async (user) => {
    await createUser({name: user.name, email: user.email, password: user.password, role: user.role});
    await fetchUsers();
    setOpenDialog(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveUser = async (user) => {    
    await updateUser({id: user._id, name: user.name, email: user.email, role: user.role});
    setOpenDialog(false);
    setUsers((prevUsers) => [...prevUsers]); // Fetch or update the user list
  };

  return (
    <Container sx={{ marginTop: 10 }}>
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UserDialog
        open={openDialog}
        onClose={handleDialogClose}
        user={selectedUser}
        onSave={selectedUser ? handleSaveUser : handleCreateUser}
      />
    </Container>
  );
};

export default AllUsersPage;
