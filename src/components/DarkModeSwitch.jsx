"use client";

import React, { useEffect, useState } from "react";

// THEMES
import { useTheme } from "next-themes";

// ICONS
import { MdLightMode } from "react-icons/md";
import { BsMoonFill } from "react-icons/bs";

export default function DarkModeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {mounted &&
        (currentTheme === "dark" ? (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setTheme("light")}
          >
            <MdLightMode className="text-2x cursor-pointer hover:text-blue-600 animate-pulse" />
            <span className="text-lg ml-3">Lights On</span>
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            <BsMoonFill className="text-2xl cursor-pointer hover:text-red-600 animate-pulse" />
            <span className="text-lg ml-3">Lights Off</span>
          </div>
        ))}
    </>
  );
}
