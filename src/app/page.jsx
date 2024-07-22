import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-[85vh] flex flex-col justify-center mt-5 px-5">
      <div className="text-center flex flex-col justify-between h-full mx-auto">
        <div className="flex flex-col">
          <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
            Becoming a <br />
            Future Black Belt
            <br /> Starts{" "}
            <span className="text-red-600 dark:text-blue-600">Here</span>.
          </h1>

          <p className="max-w-sm mx-auto mb-4 text-left">
            Nixa TaeKwon-Do Academy has been in business for over 20 years. We
            specialize in TaeKwon-Do and Tactical Self-Defense for individuals
            of all ages.{" "}
            <Link
              href="/about"
              className="ml-2 font-semibold text-red-600 dark:text-blue-600 active:underline active:underline-offset-4"
            >
              Learn More Here
            </Link>
          </p>
          <p className="border-l border-r border-gray-500 p-2 max-w-sm mx-8 mb-4">
            <span className="text-blue-600 font-semibold dark:text-red-600">
              Chief Instructor and Owner
            </span>
            <br />
            Bill Taylor, 4<sup>th</sup> Degree Black Belt
          </p>
          <div className="flex flex-col w-full mt-6">
            <div className="border-b border-t border-gray-500 rounded-xl py-3 px-3">
              <h3 className="text-[24px] leading-tight md:text-[60px] md:leading-[1.3] mb-2 font-semibold">
                Need{" "}
                <span className="text-red-600 dark:text-blue-600">more</span>{" "}
                info?
              </h3>
              <p className="font-semibold mb-1">Nixa TaeKwon-Do Academy</p>
              <p className="mb-3">
                <a
                  href="tel:417-860-5220"
                  className="text-blue-600 dark:text-red-600 font-semibold tracking-wider"
                >
                  <button className="border border-gray-500 px-2 py-1 rounded-lg shadow-sm shadow-red-500 dark:shadow-blue-500 mr-2 hover:brightness-150">
                    (417) 860-5220
                  </button>
                </a>
                M-F After 4:30p
              </p>
              <p>
                <a
                  className="text-blue-600 dark:text-red-600 font-semibold tracking-wider"
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
