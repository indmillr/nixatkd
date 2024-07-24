"use client";

import { useState } from "react";

const UserCard = ({ user, fetchUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [roles, setRoles] = useState(user.roles.join(", "));

  const handleSave = async () => {
    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          name,
          email,
          username,
          roles: roles.split(",").map((role) => role.trim()),
        }),
      });

      if (response.ok) {
        fetchUsers();
        setIsEditing(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      {isEditing ? (
        <>
          <input
            className="mb-2 p-2 border rounded w-full"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="mb-2 p-2 border rounded w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="mb-2 p-2 border rounded w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="mb-2 p-2 border rounded w-full"
            type="text"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p>Email: {email}</p>
          <p>Username: {username}</p>
          <p>Roles: {roles}</p>
          <button
            className="bg-yellow-500 text-white p-2 rounded mt-2"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;
