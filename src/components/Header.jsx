"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MdOutlineMenu, MdClose } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HiHome,
  HiCube,
  HiCalendar,
  HiNewspaper,
  HiQuestionMarkCircle,
} from "react-icons/hi2";
import DarkModeSwitch from "./DarkModeSwitch";

export const navData = [
  { name: "home", path: "/", icon: <HiHome /> },
  { name: "about", path: "/about", icon: <HiQuestionMarkCircle /> },
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
];

export default function Header() {
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
    <div className="fixed shadow-sm bg-white dark:bg-black top-0 z-50 w-full flex items-center justify-between h-[50px] px-3 pt-3 pb-2">
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
      <div className="flex items-center">
        <MdOutlineMenu
          className="text-2xl mb-1 mr-1 cursor-pointer"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="w-[100vw] h-[100vh] z-50 top-0 right-0 fixed backdrop-filter backdrop-blur(10px) bg-opacity-75 bg-black">
            <div
              ref={menuRef}
              className="bg-white dark:bg-black shadow-md fixed top-0 right-0 z-50 w-[50%] pt-8 flex justify-center pb-3 my-0 text-2xl rounded-bl-3xl"
            >
              <div className="flex flex-col justify-between">
                {/* <div className="mt-8 flex w-full justify-center mb-2">
                  <button className="border border-gray-500 rounded-full px-4 py-2">
                    Sign In
                  </button>
                </div> */}
                <MdClose
                  className="fixed top-3 right-3 text-2xl cursor-pointer"
                  onClick={toggleMenu}
                />
                {navData.map((link, index) => {
                  return (
                    <Link
                      className={`${
                        link.path === pathname && "text-primary"
                      } flex relative group hover:text-primary transition-all duration-300 ease-in-out dark:hover:text-secondary  focus:text-secondary dark:focus:text-primary`}
                      href={link.path}
                      key={index}
                      onClick={toggleMenu}
                    >
                      <div className="flex gap-x-3 mt-2 items-center">
                        {link.icon}{" "}
                        <span className="capitalize">{link.name}</span>
                      </div>
                    </Link>
                  );
                })}

                <div className="mt-8 mb-2">
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
