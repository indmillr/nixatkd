import React from "react";
// IMAGE

import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="w-full flex translate-all duration-1000 items-center justify-between h-max-200 pl-3 pr-5 pt-2">
      <div className="flex flex-row -ml-2">
        <Link href="/">
          <Image
            className="cursor-pointer"
            src="/NTALOGO.png"
            width={100}
            height={75}
            alt=""
          ></Image>
        </Link>
        <div className="-ml-2 mt-1 text-left uppercase font-light  tracking-widest text-xs">
          <p>Nixa TaeKwon-Do</p>
          <p>Academy</p>
        </div>
      </div>
      <div className="flex items-center">
        <DarkModeSwitch />
      </div>
    </div>
  );
}
