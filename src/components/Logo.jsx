import React from "react";

// IMAGE
import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwitch";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="w-full flex translate-all duration-1000 items-center justify-between h-max-200 pl-5 pr-5 pt-2">
      <Link href="/">
        <Image
          className="cursor-pointer"
          src="/NTAlogo.png"
          width={200}
          height={75}
        ></Image>
      </Link>
      <div className="flex items-center">
        <DarkModeSwitch />
      </div>
    </div>
  );
}
