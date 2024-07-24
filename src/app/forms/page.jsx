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
            <div className="text-center">
              <p className="mb-4">You must be logged in to view Forms.</p>
              <Link href="/login">Go to Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
