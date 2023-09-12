"use client";

import React, { useState } from "react";

// IMAGES
import UTA from "public/UTAlogo.png";
import AMA from "public/AMAlogo.png";
import Image from "next/image";

//  DATA
const aboutData = [
  {
    title: "patterns",
    info: [
      {
        title:
          "Students learn a new pattern at each belt rank, starting at our beginning pattern, Chon-Ji, and progressing through ranks up to our highest black-belt patterns.",
        title2:
          "Our primary patterns are traditional TaeKwon-Do patterns, known as the Chang Hun Kwan style. We also teach a set of secondary patterns known as Choong Sil Kwan.",
        icons: [],
      },
    ],
  },
  {
    title: "self-defense",
    info: [
      {
        title:
          "Self-Defense is incorporated into our classes with a curriculum designed for each belt level. As students progress through the ranks, we teach a variety of self-defense, adding to the skill, technique, and difficulty.",
      },
    ],
  },
  {
    title: "tenets",
    info: [
      {
        stage: "Courtesy",
      },
      {
        stage: "Integrity",
      },
      {
        stage: "Perseverance",
      },
      {
        stage: "Self-Control",
      },
      {
        stage: "Indomitable Spirit",
      },
    ],
  },
  {
    title: "student's oath",
    info: [
      {
        stage: "I shall observe the Tenets of TaeKwon-Do.",
      },
      {
        stage: "I shall respect Instructors and Seniors.",
      },
      {
        stage: "I shall never misuse TaeKwon-Do.",
      },
      {
        stage: "I will be a champion of freedom and justice.",
      },
      {
        stage: "I will build a more peaceful world.",
      },
    ],
  },
];

export default function About() {
  const [index, setIndex] = useState(0);
  return (
    <div className="w-full h-full flex flex-col translate-all duration-1000 items-center justify-center mt-5 px-5">
      <div className="text-center flex flex-col justify-center xl:text-left h-full mx-auto">
        {/* title */}
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          What we are
          <br />
          <span className="text-red-600 dark:text-blue-600">all</span> about.
        </h1>

        {/* subtitle */}

        <div className="flex flex-col w-full h-[260px] xs:h-[350px]">
          <div className="flex gap-x-4 mx-auto mb-3 text-blue-600 dark:text-red-600">
            {aboutData.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className={`${
                    index === itemIndex &&
                    "text-red-600 dark:text-blue-600 after:w-[100%] after:bg-black dark:after:bg-white after:transition-all after:duration-300"
                  } cursor-pointer capitalize text-xs sm:text-lg font-semibold relative after:w-0 after:h-[1px] after:bg-black dark:after:bg-white after:absolute after:-bottom-1 after:left-0`}
                  onClick={() => setIndex(itemIndex)}
                >
                  {item.title}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center">
            {aboutData[index].info.map((item, itemIndex) => {
              return (
                <div
                  key={itemIndex}
                  className="flex-1 flex flex-col max-w-max items-center"
                >
                  {/* title */}
                  <div className="mx-2 mb-2 text-left">{item.title}</div>
                  <div className="mx-2 text-left">{item.title2}</div>
                  <div className="font-semibold">{item.stage}</div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="max-w-sm xl:max-w-xl mx-auto mb-2 mt-4 text-sm">
          NTA is a member of the{" "}
          <a
            href="https://www.amaalliance.us/"
            target="_blank"
            className="text-blue-600 translate-all duration-300 hover:text-red-600 dark:text-red-600 dark:hover:text-blue-600"
          >
            American Martial Arts Alliance
          </a>
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <Image src={UTA} width={100} height={100} alt="" className="relative" />{" "}
        <Image src={AMA} width={100} height={100} alt="" className="relative" />
      </div>
    </div>
  );
}
