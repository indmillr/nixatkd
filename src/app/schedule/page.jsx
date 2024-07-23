import ScheduleSlider from "../../components/ScheduleSlider";

const Schedule = () => {
  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="container w-full h-full">
        <div className="flex flex-col w-full">
          <div className="text-center h-full flex flex-col mb-0 w-full justify-between">
            <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
              Class{" "}
              <span className="text-secondary dark:primary">Schedule</span>.
            </h1>
            <div className="w-full my-6">
              <ScheduleSlider />
            </div>
            <div>
              <p className="mb-3 mx-auto text-left">
                There will be no regularly scheduled classes on Thursday and
                Friday of Testing weeks.
              </p>
              <p className="mb-2 mx-auto text-left">
                <span className="font-semibold">Belt Promotion</span> will be
                held in place of the regularly scheduled class on Thursday of
                the week following Testing week.
              </p>
              <p className="mb-2 mt-4 mx-auto font-semibold text-sm rounded-xl px-4 py-2 bg-white dark:bg-black shadow-sm">
                If Nixa Schools are closed due to bad weather, <br />
                we will also be closed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
