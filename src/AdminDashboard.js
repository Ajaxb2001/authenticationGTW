import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setUpdatedUser({ username: user.username, email: user.email });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${editingUser}`,
        updatedUser
      );
      setUsers(
        users.map((user) => (user._id === editingUser ? response.data : user))
      );
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>User Management</h2>
      <table className="admin-user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                {editingUser === user._id ? (
                  <input
                    type="text"
                    value={updatedUser.username}
                    onChange={(e) =>
                      setUpdatedUser({
                        ...updatedUser,
                        username: e.target.value,
                      })
                    }
                    className="admin-edit-input"
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUser === user._id ? (
                  <input
                    type="email"
                    value={updatedUser.email}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, email: e.target.value })
                    }
                    className="admin-edit-input"
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user._id ? (
                  <button className="admin-save-button" onClick={handleUpdate}>
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="admin-edit-button"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="admin-delete-button"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
