import FormsSlider from "@/components/FormsSlider";

export default function Forms() {
  return (
    <div className="w-full h-full flex flex-col translate-all duration-1000 items-center justify-center mt-5">
      <div className="container h-full w-full text-center flex flex-col justify-center xl:text-left mx-auto mb-6">
        {/* title */}
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Form <span className="text-red-600 dark:text-blue-600">meanings</span>
          .
        </h1>
        {/* slider */}
        <div className="h-full">
          <FormsSlider />
        </div>
      </div>
    </div>
  );
}
