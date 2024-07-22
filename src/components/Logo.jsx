"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HiHome,
  HiCube,
  HiEnvelope,
  HiCalendar,
  HiNewspaper,
} from "react-icons/hi2";
import DarkModeSwitch from "./DarkModeSwitch";

export const navData = [
  { name: "home", path: "/", icon: <HiHome /> },
  { name: "schedule", path: "/schedule", icon: <HiCalendar /> },
  {
    name: "forms",
    path: "/forms",
    icon: <HiCube />,
  },
  {
    name: "news",
    path: "/news",
    icon: <HiNewspaper />,
  },
  {
    name: "contact",
    path: "/contact",
    icon: <HiEnvelope />,
  },
];

export default function Logo() {
  const router = useRouter();
  const pathname = router.pathname;
  const menuRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef]);

  return (
    <div className="w-full flex items-center border border-blue-500 justify-between h-[50px] px-3 pt-3 pb-2">
      <div className="flex flex-row -ml-3">
        <Link href="/">
          <Image
            src="/img/NTALOGO.png"
            width={100}
            height={75}
            alt=""
            unoptimized
            className="cursor-pointer"
          ></Image>
        </Link>
        <div className="-ml-2 mt-1 text-left uppercase font-bold tracking-widest text-xs">
          <p>Nixa TaeKwon-Do</p>
          <p>Academy</p>
        </div>
      </div>
      <div className="flex items-center border border-red-500">
        <MdOutlineMenu className="text-2xl mb-1" onClick={toggleMenu} />
        {isMenuOpen && (
          <div className="w-[100vw] h-[100vh] z-50 top-0 right-0 fixed backdrop-filter backdrop-blur(10px) bg-opacity-75 bg-gray-500">
            <div
              ref={menuRef}
              className="bg-gray-100 dark:bg-black fixed top-0 right-0 z-50 h-[50%] w-[50%] pt-8 flex justify-center pb-3 my-0 text-2xl rounded-bl-3xl"
            >
              <div className="flex flex-col justify-between">
                <MdClose
                  className="fixed top-3 right-3 text-2xl"
                  onClick={toggleMenu}
                />
                {navData.map((link, index) => {
                  return (
                    <Link
                      className={`${
                        link.path === pathname && "text-blue-600"
                      } flex relative group hover:text-blue-600 dark:hover:text-red-600  focus:text-red-600 dark:focus:text-blue-600`}
                      href={link.path}
                      key={index}
                      onClick={toggleMenu}
                    >
                      {/* icon */}
                      <div className="flex gap-x-3 mt-2 items-center">
                        {link.icon}{" "}
                        <span className="capitalize">{link.name}</span>
                      </div>
                    </Link>
                  );
                })}
                <div className="mt-8 flex w-full justify-center">
                  <button>Sign In</button>
                </div>
                <div className="mt-8">
                  <DarkModeSwitch />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
