"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { scheduleData } from "../../lib/data";

const ScheduleSlider = () => {
  return (
    <Swiper
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        641: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
      }}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className="h-[200px] sm:h-[340px] mb-2"
    >
      {scheduleData.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="h-max rounded-xl border border-gray-500 shadow-sm shadow-gray-500 px-4 pt-4 pb-1 flex gap-x-6 group cursor-pointer dark:hover:shadow-white hover:shadow-black transition-all duration-300 flex-col">
              <div className="text-xl uppercase dark:text-red-600 text-blue-600 mb-2 font-bold">
                {item.title}
              </div>
              <div className="mb-3">
                <div className="pl-3 mb-1 text-left dark:text-blue-600 text-red-600 font-mono font-bold">
                  {item.time1} {""}
                  <span className="max-w-[350px] ml-2 mr-0 text-black dark:text-white">
                    {item.description1}
                  </span>
                </div>

                <div className="pl-3 mb-1 text-left dark:text-blue-600 text-red-600 font-mono font-bold">
                  {item.time2} {""}
                  <span className="max-w-[350px] ml-2 mr-0 text-black dark:text-white">
                    {item.description2}
                  </span>
                </div>
                <div className="pl-3 mb-1 text-left dark:text-blue-600 text-red-600 font-mono font-bold">
                  {item.time3} {""}
                  <span className="max-w-[350px] ml-2 mr-0 text-black dark:text-white">
                    {item.description3}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ScheduleSlider;
