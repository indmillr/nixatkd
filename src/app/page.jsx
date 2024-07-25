import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-between mx-auto bg-lighter dark:bg-dark">
        <div className="flex flex-col bg-lighter dark:bg-dark">
          <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
            Becoming a <br />
            Future Black Belt
            <br /> Starts{" "}
            <span className="text-secondary dark:text-primary">Here</span>.
          </h1>

          <p className="max-w-sm mx-auto mb-2 text-left">
            Nixa TaeKwon-Do Academy has been in business for over 20 years. We
            specialize in TaeKwon-Do and Tactical Self-Defense for individuals
            of all ages.{" "}
            <Link
              href="/about"
              className="ml-2 font-semibold text-secondary dark:text-primary hover:text-primary dark:hover:text-secondary transition-all duration-300 ease-in-out active:underline active:underline-offset-4 text-sm"
            >
              Learn More Here!
            </Link>
          </p>
          <p className="p-2 max-w-sm mx-8">
            <span className="text-primary font-semibold dark:text-secondary">
              Chief Instructor and Owner
            </span>
            <br />
            Bill Taylor, 4<sup>th</sup> Degree Black Belt
          </p>
          <div className="flex flex-col w-full mt-4">
            <div className="bg-white dark:bg-black rounded-xl py-3 px-3 shadow-md">
              <h3 className="text-[24px] leading-tight md:text-[60px] md:leading-[1.3] mb-2 font-semibold">
                Need{" "}
                <span className="text-secondary dark:text-primary">more</span>{" "}
                info?
              </h3>
              <p className="font-semibold mb-1">Nixa TaeKwon-Do Academy</p>
              <p className="mb-3">
                <a
                  href="tel:417-860-5220"
                  className="text-primary dark:text-secondary font-semibold tracking-wider"
                >
                  <button className="border border-gray-500 px-2 py-1 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none">
                    (417) 860-5220
                  </button>
                </a>
                M-F After 4:30p
              </p>
              <p>
                <a
                  className="text-primary dark:text-secondary hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out font-semibold tracking-wider"
                  href="https://www.google.com/maps/place/1001+Hawk's+Perch,+Nixa,+MO+65714/"
                  target="_blank"
                >
                  1001B Hawks Perch Ave
                  <br />
                  Nixa, MO 65714
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="justify-center relative flex items-center space-x-3 mt-2">
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
