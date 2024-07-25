"use client";

import { useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaWrench } from "react-icons/fa";

const rolesOrder = [
  "white",
  "loyellow",
  "hiyellow",
  "logreen",
  "higreen",
  "loblue",
  "hiblue",
  "purple",
  "lored",
  "hired",
  "lobrown",
  "hibrown",
  "black",
  "black1",
  "black2",
  "black3",
  "black4",
  "black5",
  "black6",
];

const getPrecedingRoles = (selectedRole) => {
  const index = rolesOrder.indexOf(selectedRole);
  if (index === -1) return [];
  return rolesOrder.slice(0, index + 1);
};

const UserCard = ({ user, fetchUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [selectedRole, setSelectedRole] = useState(
    user.roles[user.roles.length - 1]
  );
  const [roles, setRoles] = useState(user.roles.join(", "));
  const [isAdmin, setIsAdmin] = useState(user.roles.includes("admin"));

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    const rolesToAdd = getPrecedingRoles(selectedRole);
    if (isAdmin) {
      rolesToAdd.push("admin");
    }
    setSelectedRole(selectedRole);
    setRoles(rolesToAdd.join(", "));
  };

  const handleAdminChange = (e) => {
    const isChecked = e.target.checked;
    setIsAdmin(isChecked);

    const rolesToAdd = getPrecedingRoles(selectedRole);
    if (isChecked) {
      rolesToAdd.push("admin");
    } else {
      const adminIndex = rolesToAdd.indexOf("admin");
      if (adminIndex > -1) {
        rolesToAdd.splice(adminIndex, 1);
      }
    }
    setRoles(rolesToAdd.join(", "));
  };

  const handleSave = async () => {
    const rolesToAdd = getPrecedingRoles(selectedRole);
    if (isAdmin) {
      rolesToAdd.push("admin");
    }

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          firstName,
          lastName,
          email,
          username,
          roles: rolesToAdd,
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  return (
    <div className="bg-white dark:bg-black p-4 rounded-xl shadow-md relative">
      {user.roles.includes("admin") && (
        <FaWrench className="absolute top-4 right-4 text-primary text-xl" />
      )}
      {isEditing ? (
        <>
          <p className="mb-2 mt-2 text-left text-sm font-semibold">
            First Name
          </p>
          <input
            className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <p className="mb-2 mt-4 text-left text-sm font-semibold">Last Name</p>
          <input
            className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <p className="mb-2 mt-4 text-left text-sm font-semibold">Email</p>
          <input
            className="mb-2 p-2 border rounded w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <p className="mb-2 mt-4 text-left text-sm font-semibold">Username</p>
          <input
            className="mb-2 p-2 border rounded w-full"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <p className="mb-2 mt-4 text-left text-sm font-semibold">Belt Rank</p>
          <select
            className="mb-2 p-2 border rounded w-full"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            {rolesOrder.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={handleAdminChange}
              className="mr-2"
            />
            <label className="text-sm font-semibold">Admin</label>
          </div>
          <div className="flex flex-col gap-y-2">
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded"
            >
              <MdDelete className="text-xl mr-3" /> Delete User
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
            >
              <MdEdit className="text-xl mr-3" /> Cancel
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-1">{`${firstName} ${lastName}`}</h3>
          <div className="flex flex-col w-full gap-y-3 mb-6">
            <div className="flex w-full gap-x-3">
              <p className="min-w-[100px] text-right">Email:</p>
              <p className="truncate w-full">{email}</p>
            </div>
            <div className="flex w-full gap-x-3">
              <p className="min-w-[100px] text-right">Username:</p>
              <p>{username}</p>
            </div>
            <div className="flex w-full gap-x-3">
              <p className="min-w-[100px] text-right">Roles:</p>
              <p className="text-left">{roles}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsEditing(true)}
              className="border border-gray-500 px-4 py-2 w-[50%] rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
            >
              <MdEdit className="text-xl mr-3" />
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
