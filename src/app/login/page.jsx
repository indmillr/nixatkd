"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Spinner } from "@material-tailwind/react";
import { LuBadgeAlert } from "react-icons/lu";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State to store error message
  const { signIn } = useAuth();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        setLoading(false);
        return;
      }

      const data = await response.json();
      signIn(data.token, data.user); // Use the signIn function from the Auth Context
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col w-[85%] justify-center h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Enter your{" "}
          <span className="text-secondary dark:text-primary">details</span>
          <br /> to sign in.
        </h1>

        <div className="flex flex-col w-full mt-4">
          <div className="bg-white dark:bg-black rounded-xl p-6 shadow-md flex flex-col items-start">
            <form onSubmit={handleLogin} className="w-full">
              <p className="mb-2 mt-2 text-left text-sm font-semibold">
                Username
              </p>
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder=""
                className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md dark:border dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                required
              />
              <p className="h-4 flex items-center mt-2 text-red-500 text-xs italic font-semibold mb-3">
                {error.includes("User") && (
                  <>
                    <LuBadgeAlert className="mr-1 text-base" />
                    {error}
                  </>
                )}
              </p>
              <p className="mb-2 mt-4 text-left text-sm font-semibold">
                Password
              </p>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder=""
                className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark dark:border dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
                required
              />
              <p className="h-4 flex items-center mt-2 text-red-500 text-xs italic font-semibold">
                {error.includes("Password") && (
                  <>
                    <LuBadgeAlert className="mr-1 text-base" />
                    {error}
                  </>
                )}
              </p>
              <div className="flex items-center justify-center w-full mt-8">
                {loading ? (
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
                    className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none font-semibold text-xl"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </form>
          </div>

          <p className="mt-6">Don&rsquo;t have an account?</p>
          <Link
            href="/signup"
            className="ml-2 font-semibold text-secondary dark:text-primary hover:text-primary dark:hover:text-secondary transition-all duration-300 ease-in-out active:underline active:underline-offset-4 text-sm"
          >
            Click here to sign up.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
