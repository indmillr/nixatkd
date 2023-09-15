import GallerySlider from "@/components/GallerySlider";
import React from "react";

export default function Gallery() {
  return (
    <div className="w-full h-full flex flex-col translate-all duration-1000 items-center justify-center mt-5">
      <div className="container h-full w-full text-center flex flex-col justify-center xl:text-left mx-auto">
        {/* slider */}
        <div className="ml-[5%] mr-[5%] mt-6">
          <GallerySlider />
        </div>
      </div>
    </div>
  );
}
