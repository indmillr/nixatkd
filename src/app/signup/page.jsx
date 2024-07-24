"use client";

export default function Signup() {
  return (
    <div className="w-full min-h-full flex flex-col justify-center pt-[10px] px-5 bg-lighter dark:bg-dark">
      <div className="text-center flex flex-col justify-center xl:text-left h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Nice to <span className="text-secondary dark:text-primary">meet</span>{" "}
          you.
        </h1>
        <div className="flex flex-col w-full mt-4">
          <div className="bg-white dark:bg-black rounded-xl p-6 shadow-md flex flex-col items-start">
            <p className="mb-2">Name</p>
            <input
              type="text"
              placeholder=""
              className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            />
            <p className="mt-4 mb-2">Username</p>
            <input
              type="text"
              placeholder=""
              className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            />
            <p className="mb-2 mt-4">Password</p>
            <input
              type="password"
              placeholder=""
              className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark"
            />
            <p className="mb-2 mt-4">Current Belt Rank</p>

            <select className="w-full p-2 text-dark dark:text-light bg-light dark:bg-dark rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:bg-lighter dark:focus:bg-dark">
              <option disabled value="" className="text-gray-500">
                Select Belt Rank
              </option>
              <option value="white" className="text-darker dark:text-lighter">
                White
              </option>
              <option
                value="loyellow"
                className="text-darker dark:text-lighter"
              >
                Low Yellow
              </option>
              <option
                value="hiyellow"
                className="text-darker dark:text-lighter"
              >
                High Yellow
              </option>
              <option value="logreen" className="text-darker dark:text-lighter">
                Low Green
              </option>
              <option value="higreen" className="text-darker dark:text-lighter">
                High Green
              </option>
              <option value="loblue" className="text-darker dark:text-lighter">
                Low Blue
              </option>
              <option value="hiblue" className="text-darker dark:text-lighter">
                High Blue
              </option>
              <option value="purple" className="text-darker dark:text-lighter">
                Purple
              </option>
              <option value="lored" className="text-darker dark:text-lighter">
                Low Red
              </option>
              <option value="hired" className="text-darker dark:text-lighter">
                High Red
              </option>
              <option value="lobrown" className="text-darker dark:text-lighter">
                Low Brown
              </option>
              <option value="hibrown" className="text-darker dark:text-lighter">
                High Brown
              </option>
              <option value="black" className="text-darker dark:text-lighter">
                Black Recommended
              </option>
              <option value="black1" className="text-darker dark:text-lighter">
                Black 1
              </option>
              <option value="black2" className="text-darker dark:text-lighter">
                Black 2
              </option>
              <option value="black3" className="text-darker dark:text-lighter">
                Black 3
              </option>
              <option value="black4" className="text-darker dark:text-lighter">
                Black 4
              </option>
              <option value="black5" className="text-darker dark:text-lighter">
                Black 5
              </option>
              <option value="black6" className="text-darker dark:text-lighter">
                Black 6
              </option>
            </select>
            <div className="flex items-center justify-center w-full mt-8">
              <button className="border border-gray-500 px-4 py-2 rounded-lg shadow-sm shadow-secondary dark:shadow-primary mr-2 hover:text-secondary dark:hover:text-primary transition-all duration-300 ease-in-out hover:shadow-none">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
