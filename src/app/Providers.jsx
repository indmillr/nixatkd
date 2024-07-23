"use client";

import React from "react";

import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <div>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className="dark:bg-dark dark:text-lighter text-darker bg-lighter transition-colors duration-300 min-h-screen select-none">
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}
