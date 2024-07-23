"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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
            className="flex items-center cursor-pointer transition-all duration-300 ease-in-out hover:text-primary"
            onClick={() => setTheme("light")}
          >
            <MdLightMode className="text-lg" />
            <span className="text-lg ml-3">Lights On</span>
          </div>
        ) : (
          <div
            className="flex items-center cursor-pointer hover:text-secondary duration-300 ease-in-out transition-all"
            onClick={() => setTheme("dark")}
          >
            <BsMoonFill className="text-lg" />
            <span className="text-lg ml-3">Lights Off</span>
          </div>
        ))}
    </>
  );
}
