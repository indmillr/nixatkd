import React from "react";
// IMAGE

import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="w-full flex translate-all duration-1000 items-center justify-between h-[50px] px-3 py-2">
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
      <div className="flex items-center -mt-3">
        <DarkModeSwitch />
      </div>
    </div>
  );
}
