"use client";

import React from "react";

// THEME
import { ThemeProvider } from "next-themes";

export default function Providers({ children }) {
  return (
    <div>
      <ThemeProvider enableSystem={true} attribute="class">
        <div className="dark:bg-black/80 dark:text-white text-gray-900 transition-colors duration-300 min-h-screen select-none">
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
}
