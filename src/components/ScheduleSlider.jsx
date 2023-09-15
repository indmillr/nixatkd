"use client";

// swiper
import { Swiper, SwiperSlide } from "swiper/react";

// swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// required modules
import { FreeMode, Pagination } from "swiper";

// data
const scheduleData = [
  {
    title: "Monday",
    time1: "5:00",
    description1: "Green - Purple",
    time2: "5:45",
    description2: "White - Yellow",
    time3: "6:30",
    description3: "Red - Black",
  },
  {
    title: "Tuesday",
    time1: "5:00",
    description1: "White - Yellow",
    time2: "5:45",
    description2: "Green - Purple",
    time3: "6:30",
    description3: "Red - Black",
  },
  {
    title: "Wednesday",
    time1: "5:00",
    description1: "KIDS ONLY (ages 5-8)",
    time2: "6:00",
    description2: "Red - Black",
  },
  {
    title: "Thursday",
    time1: "5:15",
    description1: "White - Black",
    time2: "6:15",
    description2: "Green - Black",
  },
  {
    title: "Friday",
    time1: "6:00",
    description1: "FORMS (All Ranks)",
    time2: "7:00",
    description2: "SPARRING",
  },
];
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
            <div className="h-max rounded-xl border border-gray-500 shadow-lg shadow-gray-500 px-4 pt-4 pb-1 flex gap-x-6 group cursor-pointer dark:hover:shadow-white hover:shadow-black transition-all duration-300 flex-col">
              {/* icons */}
              <div className="text-xl uppercase dark:text-red-600 text-blue-600 mb-2 font-bold">
                {item.title}
              </div>
              {/* title & desc */}
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
