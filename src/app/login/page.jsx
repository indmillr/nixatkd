"use client";

import { Card, Input } from "@material-tailwind/react";
import Link from "next/link";

export default function Login() {
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
            <p className="mb-2">Username</p>
            <input
              type="text"
              placeholder=""
              className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            />
            <p className="mb-2 mt-4">Password</p>
            <input
              type="password"
              placeholder=""
              className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            />
            <div className="flex items-center justify-center w-full mt-8">
              <button className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none">
                Sign In
              </button>
            </div>
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
}
