"use client";

import { news } from "../../../lib/news";

const News = () => {
  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-center xl:text-left h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          NTA <span className="text-secondary dark:text-primary">News</span>.
        </h1>

        <p className="max-w-sm text-lg mx-auto font-semibold mb-2">
          Nothing to see here. Yet...
          {/* Check here for updates
          <br />
          about upcoming NTA events. */}
        </p>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {news.map((item, index) => {
            const date = new Date(item.date);
            const dayOfWeek = date.toLocaleDateString("en-US", {
              weekday: "short",
            });
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const formattedTime = date.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={index}
                className="bg-white dark:bg-black p-4 rounded-xl shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>

                <p className="text-base">{item.content}</p>
                <p className="mb-2 text-left text-sm text-gray-500">
                  {item.author} on {dayOfWeek}, {formattedDate} at{" "}
                  {formattedTime}
                </p>
              </div>
            );
          })}
        </div> */}
      </div>
    </div>
  );
};

export default News;
