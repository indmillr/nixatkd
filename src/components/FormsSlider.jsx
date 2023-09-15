"use client";

// FORMS DATA
const formsData = [
  {
    image: "/belts/white.png",
    title: "Chon Ji",
    belt: "White",
    moves: "19",
    foot: "LEFT",
    meaning: "Heaven and Earth.",
  },
  {
    image: "/belts/yellow.png",
    title: "Dan-Gun",
    belt: "Yellow",
    moves: "21",
    foot: "LEFT",
    meaning:
      "Dan-Gun is named after the Holy Dan-Gun, legendary founder of Korea in the year 2333 BC.",
  },
  {
    image: "/belts/hiyellow.png",
    title: "Do-San",
    belt: "High Yellow",
    moves: "24",
    foot: "RIGHT",
    meaning:
      "Do-San is the pseudonym of the patriot Ahn Chang-Ho (1876-1938). The 24 movements represents his entire life, which he devoted to furthering the education of Korea and its independence movements.",
  },
  {
    image: "/belts/green.png",
    title: "Won-Hyo",
    belt: "Green",
    moves: "28",
    foot: "RIGHT",
    meaning:
      "Won-Hyo was the noted monk who introduced Buddhism to the Silla Dynasty in the year 686 AD.",
  },
  {
    image: "/belts/higreen.png",
    title: "Yul-Gok",
    belt: "High Green",
    moves: "38",
    foot: "LEFT",
    meaning:
      "Yol-Gok is the pseudonym of a great philosopher and scholar Yi-i (pronounced 'Ye-e')(1536-1584) nicknamed the 'Confucius of Korea.' The 38 moves refer to his birthplace on the 38 latitude and the diagram + represents scholar.",
  },
  {
    image: "/belts/blue.png",
    title: "Joong-Gun",
    belt: "Blue",
    moves: "32",
    foot: "LEFT",
    meaning:
      "Joon-Gun is named after the patrios Ahn Joon-Gun, who assassinated Hiro-Bumi Ito, the first Japanese Governor General of Korea, known as the man who played the leading part in the Korea-Japan merger. The 32 moves represent Mr. Ahn's ago when he was executed at Lui-Shung prison in 1910.",
  },
  {
    image: "/belts/hiblue.png",
    title: "Toi-Gye",
    belt: "High Blue",
    moves: "37",
    foot: "RIGHT",
    meaning:
      "Toi-Gye is the pen name of the noted scholar Yi-Hwang (16th century), an authorite on Neo-Confucianism. The 37 moves refer to his birth place on the 37 latitude and the diagram + represents scholar.",
  },
  {
    image: "/belts/purple.png",
    title: "(Review)",
    belt: "Purple",
    moves: "",
    foot: "",
    meaning:
      "(This is a review of White Belt through High Blue Belt. OPTION 1: Give all the form meanings prior to belt testing to be eligible to test for Red 1. OPTION 2: Give part of the form meanings prior to belt testing to be eligible to test for High Purple.)",
  },
  {
    image: "/belts/red.png",
    title: "Hwa-Rang",
    belt: "Red 1 & 2",
    moves: "",
    foot: "",
    meaning: "(Form Meaning Coming Soon!)",
  },
  {
    image: "/belts/hired.png",
    title: "Choong-Moo",
    belt: "Red 3 & 4",
    moves: "",
    foot: "",
    meaning: "(Form Meaning Coming Soon!)",
  },
  {
    image: "/belts/brown.png",
    title: "Kwang-Gae",
    belt: "Brown",
    moves: "",
    foot: "",
    meaning: "(Form Meaning Coming Soon!)",
  },
  {
    image: "/belts/hibrown.png",
    title: "Po Eun",
    belt: "High Brown",
    moves: "",
    foot: "",
    meaning: "(Form Meaning Coming Soon!)",
  },
  {
    image: "/belts/lack.png",
    title: "Gae-Baek",
    belt: "Black",
    moves: "",
    foot: "",
    meaning: "(Form Meaning Coming Soon!)",
  },
];

// swiper
import { Swiper, SwiperSlide } from "swiper/react";

// swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// required modules
import { Navigation, Pagination } from "swiper";

// icons
import Image from "next/image";

const FormsSlider = () => {
  return (
    <Swiper
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      className="h-[450px]"
    >
      {formsData.map((pattern, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="flex h-full flex-col items-center gap-x-2 px-8 mt-0">
              <div className="rounded-xl shadow-lg shadow-gray-500 w-[75%] max-w-[350px] flex flex-col items-center relative mx-auto mb-2 pb-2">
                <div className="flex flex-col">
                  <div className="mb-1 flex items-center">
                    <Image
                      src={pattern.image}
                      width={60}
                      height={60}
                      alt=""
                      className="rounded-full border border-gray-300 dark:border-gray-700 shadow-md shadow-gray-300 dark:shadow-gray-700 mr-2"
                    />
                    <div className="ml-2 my-0 py-0 flex flex-col flex-1 text-left">
                      <div className="flex border-b border-gray-300 dark:border-gray-700 my-0 py-0 uppercase font-bold tracking-widest items-center">
                        {pattern.belt}
                      </div>
                      <div className="text-sm flex text-left py-0 my-0 items-center font-semibold tracking-widest">
                        <span className="font-light tracking-normal mr-1">
                          Moves:{" "}
                        </span>{" "}
                        {pattern.moves}{" "}
                      </div>
                      <div className="text-sm tracking-widest font-semibold flex text-left py-0 my-0 items-center -mt-1">
                        <span className="font-light tracking-normal mr-1">
                          Return Foot:{" "}
                        </span>{" "}
                        {pattern.foot}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex-1 flex flex-col items-center px-3 mt-1 before:w-[1px] lg:before:bg-black dark:lg:before:bg-white lg:before:absolute lg:before:left-0 mb-5 border-black lg:before:h-[200px] relative">
                <div className="my-1 text-blue-600 dark:text-red-600 text-2xl md:text-2xl font-bold lg:font-normal lg:text-3xl uppercase tracking-widest">
                  {pattern.title}
                </div>

                <div className="text-left h-full px-2">{pattern.meaning}</div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FormsSlider;
