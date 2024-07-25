"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MdOutlineMenu, MdClose, MdOutlineSettings } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import {
  HiHome,
  HiCube,
  HiCalendar,
  HiNewspaper,
  HiQuestionMarkCircle,
} from "react-icons/hi2";
import { FaWrench } from "react-icons/fa";
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
  const profileRef = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isAuthenticated, user, signOut } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuRef, profileRef]);

  const handleSignOut = () => {
    signOut();
    setIsProfileOpen(false);
  };

  return (
    <div className="fixed shadow-sm bg-white dark:bg-black top-0 z-50 w-full flex items-center justify-between h-[50px] p-3">
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
      <div className="flex items-center gap-x-5 justify-center">
        {isAuthenticated ? (
          <div className="relative">
            <HiUserCircle
              className="text-2xl cursor-pointer"
              onClick={toggleProfile}
            />
            {isProfileOpen && (
              <div className="w-[100vw] h-[100vh] z-50 top-0 right-0 fixed backdrop-filter backdrop-blur(10px) bg-opacity-75 bg-black dark:bg-white dark:bg-opacity-30">
                <div
                  ref={profileRef}
                  className="bg-white dark:bg-black shadow-md fixed top-0 right-0 z-50 pt-8 px-10 flex justify-center pb-3 my-0 text-2xl rounded-bl-3xl"
                >
                  <div className="flex flex-col justify-between pb-8">
                    <MdClose
                      className="fixed top-3 right-3 text-2xl cursor-pointer"
                      onClick={toggleProfile}
                    />
                    <div className="text-base mb-2">Hi, {user.name}!</div>
                    <div className="flex flex-col justify-between">
                      <Link
                        href="/" // TODO: Change to Settings page
                        className="flex relative group hover:text-primary transition-all duration-300 ease-in-out dark:hover:text-secondary  focus:text-secondary dark:focus:text-primary"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <div className="flex gap-x-3 mt-2 items-center">
                          <MdOutlineSettings />
                          <span className="capitalize">Profile</span>
                        </div>{" "}
                      </Link>
                      {user.roles.includes("admin") ? (
                        <Link
                          href="/" // TODO: Change to admin page
                          className="flex relative group hover:text-primary transition-all duration-300 ease-in-out dark:hover:text-secondary  focus:text-secondary dark:focus:text-primary"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <div className="flex gap-x-3 mt-2 items-center">
                            <FaWrench />
                            <span className="capitalize">Admin</span>
                          </div>
                        </Link>
                      ) : (
                        <div className="flex gap-x-3 mt-2 items-center dark:text-gray-500 text-gray-300">
                          <FaWrench />
                          <span className="capitalize">Admin</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="border border-gray-500 px-2 py-1 text-sm font-semibold rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none mt-10"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <button className="border border-gray-500 px-2 py-1 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none text-sm font-semibold">
              Sign In
            </button>
          </Link>
        )}
        <MdOutlineMenu
          className="text-2xl m-1 cursor-pointer"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="w-[100vw] h-[100vh] z-50 top-0 right-0 fixed backdrop-filter backdrop-blur(10px) bg-opacity-75 bg-black dark:bg-white dark:bg-opacity-30">
            <div
              ref={menuRef}
              className="bg-white dark:bg-black shadow-md fixed top-0 right-0 z-50 pt-8 px-10 flex justify-center pb-3 my-0 text-2xl rounded-bl-3xl"
            >
              <div className="flex flex-col justify-between">
                <MdClose
                  className="fixed top-3 right-3 text-2xl cursor-pointer"
                  onClick={toggleMenu}
                />
                {navData.map((link, index) => (
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
                ))}
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
