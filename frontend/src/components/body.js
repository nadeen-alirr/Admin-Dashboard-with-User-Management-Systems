import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "./Modal";

const Body = () => {
  const styletitle = {
    marginRight: "3%",
  };
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const[newPassword,setpassword]=useState("");

  useEffect(() => {
    // Fetch data from the backend API
    axios
      .get("http://localhost:1336/api/allUser")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching users:", error);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = () => {
    axios
      .get("http://localhost:1336/api/allUser")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching users:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:1336/api/delete/${id}`)
      .then((response) => {
        console.log(response.data.message); // Should show "User deleted successfully"
        fetchUsers(); // Refresh the user list after deletion
      })
      .catch((error) => {
        console.error("Error while deleting user:", error);
      });
  };
  //

  const handleSaveADD = () => {
    const newUser = {
      username: newUsername,
      email: newEmail,
      password: newPassword, // Make sure to include the password here
      role: newRole,
    };
  
    axios
      .post("http://localhost:1336/api//user/createUser", newUser)
      .then((response) => {
        console.log(response.data.message); // Should show "User created successfully"
        fetchUsers(); // Refresh the user list after creating a new user
        toggleAddUserPopup(); // Close the add user popup
      })
      .catch((error) => {
        console.error("Error while creating user:", error);
      });
  };
  const handleAdd = () => {
    toggleAddUserPopup();
  };

  const toggleAddUserPopup = () => {
    setShowAddUserPopup((prevState) => !prevState);
  };

  // edit filed handlle

  const handleEditPopup = (user) => {
    setSelectedUser(user);
  };

  const handleUsernameChange = (event) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      username: event.target.value,
    }));
  };

  const handleEmailChange = (event) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      email: event.target.value,
    }));
  };

  const handleRoleChange = (event) => {
    setSelectedUser((prevUser) => ({
      ...prevUser,
      role: event.target.value,
    }));
  };
  const handleSaveChanges = () => {
    axios
      .patch(`http://localhost:1336/api/edit/${selectedUser._id}`, selectedUser)
      .then((response) => {
        console.log(response.data.message); // Should show "User updated successfully"
        fetchUsers(); // Refresh the user list after update
        setSelectedUser(null); // Close the edit popup
      })
      .catch((error) => {
        console.error("Error while updating user:", error);
      });
  };

  return (
    <div>
      <div className=" d-flex justify-content-between mb-4 mt-3">
        <h1>Users</h1>
        <button
          variant="primary"
          style={styletitle}
          onClick={handleAdd}
          className="btn-with-icon"
          type="button"
          class="btn btn-primary"
        >
          <FontAwesomeIcon icon={faPlus} /> Add user
        </button>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <th scope="row">{user._id}</th>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => handleEditPopup(user)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                   Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedUser && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedUser(null)}
          // Add any styling and configuration for the popup here
        >
          <h2>Edit User</h2>
          <lable>update Username</lable>
          <input
            type="text"
            value={selectedUser.username}
            onChange={handleUsernameChange}
          />
          <label>update email</label>
          <input
            type="email"
            value={selectedUser.email}
            onChange={handleEmailChange}
          />
          <label>update Role</label>
          <input
            type="text"
            value={selectedUser.role}
            onChange={handleRoleChange}
          />
          <button
            type="button"
            class="btn btn-primary mt-4"
            onClick={handleSaveChanges}
          >
            Save Edit
          </button>
        </Modal>
      )}
      {/* Add user popup */}
      {showAddUserPopup && (
        <Modal
          isOpen={true} // You can customize this to control the visibility of the popup
          onRequestClose={toggleAddUserPopup}
          // Add any styling and configuration for the popup here
        >
          <h2>Add User</h2>
          <lable>Username</lable>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <label>email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <label>password</label>
          <input
          type="password"
          value={newPassword}
          onChange={(e)=> setpassword(e.target.value) }
          />
          
          <label>Role</label>
      <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
          <button
            type="button"
            class="btn btn-primary mt-4"
            onClick={handleSaveADD}
          >
            Add User
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Body;
