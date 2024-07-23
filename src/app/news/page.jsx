export default function News() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-center xl:text-left h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          NTA <span className="text-secondary dark:text-primary">News</span>.
        </h1>

        <div className="flex flex-col w-full"></div>
        <p className="max-w-sm xl:max-w-xl mx-auto mb-2 mt-6">
          Check here for updates about upcoming NTA events.
        </p>
      </div>
    </div>
  );
}
