"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@material-tailwind/react";
import { LuBadgeAlert } from "react-icons/lu";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for re-entered password
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true); // State to check password match
  const [allFieldsFilled, setAllFieldsFilled] = useState(false); // State to check if all fields are filled
  const [error, setError] = useState(""); // State to store error message
  const { signIn } = useAuth();

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
    setAllFieldsFilled(
      firstName !== "" &&
        lastName !== "" &&
        email !== "" &&
        username !== "" &&
        password !== "" &&
        confirmPassword !== "" &&
        role !== ""
    );
  }, [firstName, lastName, email, username, password, confirmPassword, role]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          username,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      signIn(data.token, data.user); // Use the signIn function from the Auth Context
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col w-[90%] justify-center h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Nice to <span className="text-secondary dark:text-primary">meet</span>{" "}
          you.
        </h1>

        <div className="flex flex-col w-full mt-4">
          <div className="bg-white dark:bg-black rounded-xl p-6 shadow-md flex flex-col items-start">
            <form onSubmit={handleRegister} className="w-full">
              <div className="flex gap-x-2">
                <div>
                  <p className="mb-2 text-sm text-left font-semibold">
                    First Name <span className="text-secondary">*</span>
                  </p>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=""
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
                    placeholder=""
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
                placeholder=""
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
                placeholder=""
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
                Password <span className="text-secondary">*</span>
              </p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                required
              />
              <p className="h-4 flex items-center mt-1"></p>
              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                Confirm Password
              </p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder=""
                className="w-full p-2 text-dark dark:border dark:border-gray-600  dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                required
              />
              <p className="h-4 flex items-center mt-1 text-red-500 text-xs italic font-semibold">
                {!passwordMatch && (
                  <>
                    <LuBadgeAlert className="mr-1 text-base" />
                    Passwords do not match!
                  </>
                )}
              </p>

              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                Current Belt Rank <span className="text-secondary">*</span>
              </p>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 text-dark dark:border dark:border-gray-600 dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                required
              >
                <option disabled value="">
                  Select Belt Rank
                </option>
                <option value="white">White</option>
                <option value="loyellow">Low Yellow</option>
                <option value="hiyellow">High Yellow</option>
                <option value="logreen">Low Green</option>
                <option value="higreen">High Green</option>
                <option value="loblue">Low Blue</option>
                <option value="hiblue">High Blue</option>
                <option value="purple">Purple</option>
                <option value="lored">Low Red</option>
                <option value="hired">High Red</option>
                <option value="lobrown">Low Brown</option>
                <option value="hibrown">High Brown</option>
                <option value="black">Black Recommended</option>
                <option value="black1">Black 1</option>
                <option value="black2">Black 2</option>
                <option value="black3">Black 3</option>
                <option value="black4">Black 4</option>
                <option value="black5">Black 5</option>
                <option value="black6">Black 6</option>
              </select>
              <div className="flex items-center justify-center w-full mt-8">
                {!passwordMatch || !allFieldsFilled ? (
                  <button
                    type="button"
                    className="border border-light dark:border-gray-600  text-gray-400 dark:text-gray-600 px-4 py-2 rounded-lg mr-2 text-xl font-semibold"
                  >
                    Sign Up
                  </button>
                ) : loading ? (
                  <button
                    type="submit"
                    disabled
                    className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl font-semibold flex"
                  >
                    <Spinner className="h-4 w-4 dark:text-primary text-secondary font-bold mr-3" />{" "}
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-xl font-semibold"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
