"use client";

import FormsSlider from "@/components/FormsSlider";
import { useAuth } from "../../context/AuthContext"; // Adjust the import path as necessary
import Link from "next/link";

export default function Forms() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="container h-full w-full text-center flex flex-col justify-center mx-auto mb-6">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Form{" "}
          <span className="text-secondary dark:text-primary">meanings</span>.
        </h1>
        <div className="h-full">
          {isAuthenticated ? (
            <FormsSlider />
          ) : (
            <div className="flex flex-col w-full mt-4">
              <div className="bg-white dark:bg-black rounded-xl py-3 px-3 shadow-md">
                <p className="mb-8">You must be logged in to view Forms.</p>
                <Link href="/login">
                  <button className="border border-gray-500 px-4 py-3 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none font-semibold">
                    Sign In
                  </button>
                </Link>
                <p className="mt-6">Don&rsquo;t have an account?</p>
                <Link
                  href="/signup"
                  className="ml-2 font-semibold text-secondary dark:text-primary hover:text-primary dark:hover:text-secondary transition-all duration-300 ease-in-out active:underline active:underline-offset-4 text-sm"
                >
                  Click here to sign up.
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
