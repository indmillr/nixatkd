export default function News() {
  return (
    <div className="w-full h-full flex flex-col translate-all duration-1000 items-center justify-center mt-5 px-5">
      <div className="text-center flex flex-col justify-center xl:text-left h-full mx-auto">
        {/* title */}
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          NTA <span className="text-red-600 dark:text-blue-600">News</span>.
        </h1>

        {/* subtitle */}

        <div className="flex flex-col w-full"></div>
        <p className="max-w-sm xl:max-w-xl mx-auto mb-2 mt-6">
          Check here for updates about upcoming NTA events.
        </p>
      </div>
    </div>
  );
}
