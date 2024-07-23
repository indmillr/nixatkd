"use client";

import React, { useState } from "react";

import UTA from "public/UTAlogo.png";
import AMA from "public/AMAlogo.png";
import USA from "public/USA.png";
import Image from "next/image";

import { aboutData } from "../../../lib/data";

export default function About() {
  const [index, setIndex] = useState(0);
  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-between mx-auto bg-lighter dark:bg-dark">
        <div>
          <h1 className="text-[35px] leading-tight mb-6 font-semibold">
            What we are{" "}
            <span className="text-secondary dark:primary">about</span>.
          </h1>
          <div className="flex flex-col w-fit">
            <div className="flex gap-x-4 w-[365px] items-center justify-between mx-auto mb-3 text-primary dark:text-secondary">
              {aboutData.map((item, itemIndex) => {
                return (
                  <div
                    key={itemIndex}
                    className={`${
                      index === itemIndex &&
                      "text-secondary dark:text-primary after:w-[100%] after:bg-dark dark:after:bg-light after:transition-all after:duration-300"
                    } cursor-pointer capitalize mb-2 tracking-tight text-sm font-semibold relative after:w-0 after:h-[1px] after:bg-dark dark:after:bg-light after:absolute after:-bottom-1 after:left-0`}
                    onClick={() => setIndex(itemIndex)}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
            <div className="rounded-xl bg-white dark:bg-black shadow-md min-h-[350px] w-[400px] px-4 pt-4 pb-6">
              <div className="flex flex-col items-center w-full">
                {aboutData[index].info.map((item, itemIndex) => {
                  return (
                    <div
                      key={itemIndex}
                      className="flex-1 flex flex-col max-w-max items-center"
                    >
                      <div className="mx-2 mb-2 text-left text-lg">
                        {item.title}
                      </div>
                      <div className="mx-2 text-left text-lg mt-2">
                        {item.title2}
                      </div>
                      <div className="font-semibold text-md mt-2`">
                        {item.stage}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <p className="max-w-sm xl:max-w-xl mx-auto mb-2 mt-6">
          NTA is a member of the
          <br />
          <a
            href="https://www.amaalliance.us/"
            target="_blank"
            className="text-primary translate-all duration-300 ease-in-out hover:text-secondary dark:text-secondary dark:hover:text-primary"
          >
            American Martial Arts Alliance
          </a>
        </p>
      </div>
      <div className="flex items-center justify-between w-full mt-1">
        <Image src={UTA} width={100} height={100} alt="" className="relative" />
        <Image src={USA} width={100} height={100} alt="" className="relative" />
        <Image src={AMA} width={100} height={100} alt="" className="relative" />
      </div>
    </div>
  );
}
