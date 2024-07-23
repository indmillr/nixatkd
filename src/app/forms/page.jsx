import FormsSlider from "@/components/FormsSlider";

export default function Forms() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="container h-full w-full text-center flex flex-col justify-center xl:text-left mx-auto mb-6">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Form{" "}
          <span className="text-secondary dark:text-primary">meanings</span>.
        </h1>
        <div className="h-full">
          <FormsSlider />
        </div>
      </div>
    </div>
  );
}
