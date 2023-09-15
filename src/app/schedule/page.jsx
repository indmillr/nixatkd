// components
import ScheduleSlider from "../../components/ScheduleSlider";

const Schedule = () => {
  return (
    <div className="h-full w-full flex translate-all duration-1000 items-center justify-center mt-5 px-5">
      <div className="container w-full">
        <div className="flex flex-col w-full">
          {/* text */}
          <div className="text-center flex flex-col mb-0 w-full">
            <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
              Class{" "}
              <span className="text-red-600 dark:text-blue-600">Schedule</span>.
            </h1>
            <div className="w-full">
              <ScheduleSlider />
            </div>
            <p className="mb-2 mx-auto text-left">
              There will be no regularly scheduled classes on Thursday and
              Friday of Testing weeks.
            </p>
            <p className="mb-2 mx-auto text-left">
              <span className="font-semibold">Belt Promotion</span> will be held
              in place of the regularly scheduled class on Thursday of the week
              following Testing week.
            </p>
            <p className="animate-pulse mb-2 mt-2 mx-auto font-bold">
              If Nixa Schools are closed due to bad weather, we will also be
              closed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
