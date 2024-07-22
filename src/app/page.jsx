import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-5 px-5">
      <div className="text-center flex flex-col justify-center h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Becoming a <br />
          Future Black Belt
          <br /> Starts{" "}
          <span className="text-red-600 dark:text-blue-600">Here</span>.
        </h1>

        <p className="max-w-sm mx-auto mb-6 text-left">
          Nixa TaeKwon-Do Academy has been in business for over 20 years. We
          specialize in TaeKwon-Do and Tactical Self-Defense for individuals of
          all ages.
        </p>
        <p className="shadow-lg shadow-gray-500 rounded-xl px-3 py-3 max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-8 xl:mb-14">
          <span className="text-blue-600 font-semibold dark:text-red-600">
            Chief Instructor and Owner
          </span>
          <br />
          Bill Taylor, 4<sup>th</sup> Degree Black Belt
        </p>
        <div className="justify-center relative flex items-center space-x-3">
          <Image
            src="/USA.png"
            width={100}
            height={100}
            className=""
            alt="USA Flag"
          ></Image>
          <Image
            src="/ntabadge.png"
            width={125}
            height={125}
            className="animate-spin-slow"
            alt="NTA Badge"
          ></Image>
          <Image
            src="/Korea.png"
            width={100}
            height={100}
            className=""
            alt="Korea Flag"
          ></Image>
        </div>
      </div>
    </div>
  );
}
