"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "swiper/css/effect-cube";
import { Navigation, Pagination, EffectFlip, EffectCube } from "swiper";
import Image from "next/image";
import { formsData } from "../../lib/data";

const FormsSlider = () => {
  return (
    <Swiper
      effect={"cube"}
      navigation={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Navigation, Pagination, EffectCube]}
      className="h-full"
    >
      {formsData.map((pattern, index) => {
        return (
          <SwiperSlide key={index} className="mb-6">
            <div className="flex h-full flex-col items-center gap-x-2 px-8 mt-0">
              <div className="rounded-xl bg-white dark:bg-black shadow-md min-w-full flex flex-col items-center relative mx-auto mb-2 py-2">
                <div className="flex flex-col">
                  <div className="mb-1 flex items-center">
                    <Image
                      src={pattern.image}
                      width={60}
                      height={60}
                      alt=""
                      className="rounded-full border border-gray-300 dark:border-gray-700 shadow-md mr-2"
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

              <div className="w-full flex-1 flex flex-col items-center px-3 mt-1 before:w-[1px] mb-5 relative">
                <div className="my-1 text-blue-600 dark:text-red-600 text-2xl font-semibold uppercase tracking-widest">
                  {pattern.title}
                </div>

                <div className="text-left w-[300px] h-[375px] overflow-y-auto rounded-xl shadow-md p-3 bg-white dark:bg-black">
                  {pattern.meaning}
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default FormsSlider;
