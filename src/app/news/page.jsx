import NewsSlider from "@/components/NewsSlider";
import React from "react";

export default function News() {
  return (
    <div className="w-full h-full flex flex-col translate-all duration-1000 items-center justify-center mt-5">
      <div className="container h-full w-full text-center flex flex-col justify-center xl:text-left mx-auto mb-6">
        <div className="flex flex-col xl:flex-row gap-x-8">
          {/* text */}
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
              NTA <span className="text-red-600 dark:text-blue-600">News</span>.
            </h1>
            <p className="mb-4 mx-auto">For now, no news is good news.</p>
          </div>

          {/* slider */}
          <div className="">
            <NewsSlider />
          </div>
        </div>
      </div>
    </div>
  );
}
