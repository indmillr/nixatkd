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
          <MdLightMode
            className="text-xl cursor-pointer hover:text-red-600 translate-all duration-500"
            onClick={() => setTheme("light")}
          />
        ) : (
          <BsMoonFill
            className="text-xl cursor-pointer hover:text-red-600 translate-all duration-500"
            onClick={() => setTheme("dark")}
          />
        ))}
    </>
  );
}
