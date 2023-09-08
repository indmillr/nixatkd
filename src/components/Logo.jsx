import React from "react";

// IMAGE
import Image from "next/image";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Logo() {
  return (
    <div className="w-full flex items-center justify-between h-max-200 pl-5 pr-5 pt-2">
      <Image src="/NTAlogo.png" width={200} height={75}></Image>
      <div className="flex items-center">
        <DarkModeSwitch />
      </div>
    </div>
  );
}
