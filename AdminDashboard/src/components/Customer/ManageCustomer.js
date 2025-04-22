import React, { useState } from "react";
import "./ManageCustomer.css";

const initialUsers = [
  { id: 1, username: "john_doe", email: "john@example.com" },
  { id: 2, username: "jane_smith", email: "jane@example.com" },
  { id: 3, username: "mike_ross", email: "mike@example.com" },
];

const ManageCustomer = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-container">
      <h2>User Details</h2>
      <table className="user-table">
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
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="remove-btn" onClick={() => handleRemove(user.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCustomer;
