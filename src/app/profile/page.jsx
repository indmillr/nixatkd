"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@material-tailwind/react";
import { LuBadgeAlert } from "react-icons/lu";

const Profile = () => {
  const { user } = useAuth();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPasswordMatch(newPassword === confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError("");
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/updateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          currentPassword,
          newPassword: newPassword || undefined, // Only send newPassword if it's not empty
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Update failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      // Update the user context or handle successful update
      // updateUser(data.user);
    } catch (error) {
      console.error("Update error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col w-[90%] justify-center h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Hi,{" "}
          <span className="text-secondary dark:text-primary">
            {user.firstName}!
          </span>
        </h1>

        <div className="flex flex-col w-full mt-4">
          <div className="bg-white dark:bg-black rounded-xl p-6 shadow-md flex flex-col items-start">
            <form onSubmit={handleUpdateProfile} className="w-full">
              <div className="flex gap-x-2">
                <div>
                  <p className="mb-2 text-sm text-left font-semibold">
                    First Name <span className="text-secondary">*</span>
                  </p>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full dark:border dark:border-gray-600 p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                    required
                  />
                </div>
                <div>
                  <p className="text-left mb-2 text-sm font-semibold">
                    Last Name <span className="text-secondary">*</span>
                  </p>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full dark:border dark:border-gray-600 p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                    required
                  />
                </div>
              </div>
              <p className="h-4 flex items-center mt-1"></p>

              <p className="mb-2 mt-2 text-sm text-left font-semibold">
                Email <span className="text-secondary">*</span>
              </p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full dark:border dark:border-gray-600 p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                required
              />
              <p className="h-4 flex items-center mt-1 text-red-500 text-xs italic font-semibold">
                {error.includes("Email") && (
                  <>
                    <LuBadgeAlert className="mr-1 text-base" />
                    {error}
                  </>
                )}
              </p>

              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                Username <span className="text-secondary">*</span>
              </p>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark dark:border dark:border-gray-600"
                required
              />
              <p className="h-4 flex items-center mt-1 text-red-500 text-xs italic font-semibold">
                {error.includes("Username") && (
                  <>
                    <LuBadgeAlert className="mr-1 text-base" />
                    {error}
                  </>
                )}
              </p>

              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                Current Password <span className="text-secondary">*</span>
              </p>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                required
              />
              <p className="h-4 flex items-center mt-1"></p>

              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                New Password (optional)
              </p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
              />
              <p className="h-4 flex items-center mt-1"></p>
              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                Confirm New Password
              </p>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-2 text-dark dark:border dark:border-gray-600  dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
              />
              <p className="h-4 flex items-center mt-1 text-red-500 text-xs italic font-semibold">
                {!passwordMatch && (
                  <>
                    <LuBadgeAlert className="mr-1 text-base" />
                    Passwords do not match!
                  </>
                )}
              </p>

              <div className="flex items-center justify-center w-full mt-8">
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
                    type="submit"
                    className="border border-gray-500 px-4 py-2 rounded-lg shadow-md shadow-secondary dark:shadow-primary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl items-center font-semibold flex justify-center"
                  >
                    Update Profile
                  </button>
                )}
              </div>
              <p className="h-4 flex items-center mt-1 text-red-500 text-xs italic font-semibold">
                {error && (
                  <>
                    <LuBadgeAlert className="mr-1 text-base" />
                    {error}
                  </>
                )}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
