"use client";

import { useState, useEffect } from "react";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";
import { FaWrench } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";
import { rolesOrder } from "../../lib/data";

const getPrecedingRoles = (selectedRole) => {
  const index = rolesOrder.indexOf(selectedRole);
  if (index === -1) return [];
  return rolesOrder.slice(0, index + 1);
};

const UserCard = ({
  user,
  fetchUsers,
  isEditing,
  onEditUser,
  onCancelEdit,
  onDeleteUser,
  isAnyUserEditing,
}) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [selectedRole, setSelectedRole] = useState(
    user.roles[user.roles.length - 1]
  );
  const [roles, setRoles] = useState(user.roles);
  const [isAdmin, setIsAdmin] = useState(user.roles.includes("admin"));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setUsername(user.username);
      setSelectedRole(user.roles[user.roles.length - 1]);
      setRoles(user.roles);
      setIsAdmin(user.roles.includes("admin"));
    }
  }, [isEditing, user]);

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    const rolesToAdd = getPrecedingRoles(selectedRole);
    setSelectedRole(selectedRole);
    setRoles((prevRoles) => {
      const updatedRoles = rolesToAdd.concat(
        prevRoles.includes("admin") ? ["admin"] : []
      );
      return [...new Set(updatedRoles)];
    });
  };

  const handleAdminChange = (e) => {
    const isChecked = e.target.checked;
    setIsAdmin(isChecked);

    setRoles((prevRoles) => {
      if (isChecked) {
        if (!prevRoles.includes("admin")) {
          return [...prevRoles, "admin"];
        }
        return prevRoles;
      } else {
        return prevRoles.filter((role) => role !== "admin");
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);

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
          roles,
        }),
      });

      if (response.ok) {
        fetchUsers();
        onCancelEdit();
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDeleteConfirm = () => {
    setShowDeleteConfirm(!showDeleteConfirm);
  };

  if (!isEditing && isAnyUserEditing) {
    return null; // Hide this user card if another user is being edited
  }

  return (
    <div className="relative mb-4 bg-white dark:bg-black p-4 w-full rounded-xl shadow-md hover:shadow-lg">
      {user.roles.includes("admin") && (
        <FaWrench className="absolute top-3 right-5 text-primary text-2xl" />
      )}
      {isEditing ? (
        <div className="flex flex-col min-w-full mb-4">
          <div className="flex gap-x-2">
            <div>
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
            </div>
            <div>
              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                Last Name
              </p>
              <input
                className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>
          <p className="mb-2 mt-4 text-left text-sm font-semibold">Email</p>
          <input
            className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <p className="mb-2 mt-4 text-left text-sm font-semibold">Username</p>
          <input
            className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <div className="flex gap-x-2 mb-4">
            <div className="w-[60%] mb-6">
              <p className="mb-2 mt-4 text-left text-sm font-semibold">
                Belt Rank
              </p>
              <select
                className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                value={selectedRole}
                onChange={handleRoleChange}
              >
                {rolesOrder.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-center w-[40%]">
              <div className="flex items-center gap-x-1">
                <input
                  type="checkbox"
                  checked={isAdmin}
                  onChange={handleAdminChange}
                  className="mr-2 form-checkbox h-6 w-6 text-primary"
                />
                <label className="text-base font-semibold h-4 w-4">
                  Admin?
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            {loading ? (
              <button
                type="button"
                disabled
                className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl justify-center font-semibold flex items-center"
              >
                <Spinner className="h-4 w-4 dark:text-primary text-secondary font-bold mr-3" />{" "}
                Loading...
              </button>
            ) : (
              <button
                className="border border-gray-500 px-4 py-2 rounded-lg shadow-md shadow-secondary dark:shadow-primary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                onClick={handleSave}
              >
                SAVE
              </button>
            )}
            <div className="flex gap-x-5 mt-10">
              {showDeleteConfirm ? (
                <div className="w-[100vw] h-[100vh] z-50 flex justify-center items-center top-0 right-0 fixed backdrop-filter backdrop-blur(10px) bg-opacity-75 bg-black dark:bg-white dark:bg-opacity-30">
                  <div className="bg-white dark:bg-black shadow-md z-50 flex justify-center pb-3 my-0 flex-col text-2xl rounded-xl p-10">
                    <p className="mb-2 text-xl font-semibold">
                      Delete {user.firstName} {user.lastName}?
                    </p>
                    <p className="text-lg mb-4 text-secondary">
                      This action cannot be reversed.
                    </p>
                    <div className="flex gap-x-4 pb-8 w-full items-center justify-center">
                      <button
                        onClick={onDeleteUser}
                        className="border border-gray-500 px-4 py-2 rounded-lg mr-2 transition-all duration-300 bg-secondary text-lighter dark:text-darker hover:brightness-125 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={toggleDeleteConfirm}
                        className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex w-full items-center justify-between">
                  <button
                    onClick={toggleDeleteConfirm}
                    className="border border-gray-500 px-4 py-2 rounded-lg mr-2 transition-all duration-300 bg-secondary text-lighter dark:text-darker hover:brightness-125 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                  >
                    <MdDelete className="text-2xl mr-3" />
                    Delete
                  </button>
                </div>
              )}
              <button
                onClick={onCancelEdit}
                className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
              >
                <MdClose className="text-2xl mr-3" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-3 border-b border-gray-500 pb-1">{`${firstName} ${lastName}`}</h3>
          <div className="flex flex-col w-full gap-y-3 mb-6">
            <div className="flex w-full gap-x-3">
              <p className="min-w-[100px] text-right font-semibold">Email:</p>
              <p className="truncate w-full text-left">{email}</p>
            </div>
            <div className="flex w-full gap-x-3">
              <p className="min-w-[100px] text-right font-semibold">
                Username:
              </p>
              <p>{username}</p>
            </div>
            <div className="flex w-full gap-x-3">
              <p className="min-w-[100px] text-right font-semibold">Roles:</p>
              <p className="text-left">{roles.join(", ")}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={onEditUser}
              className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
            >
              <MdEdit className="text-xl mr-3" /> Edit User
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
