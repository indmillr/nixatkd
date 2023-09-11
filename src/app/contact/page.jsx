"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

// icons
import { BsArrowRight } from "react-icons/bs";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kbavyqc",
        "template_oib19lw",
        form.current,
        "iC7Fva3covAMd6Kef"
      )
      .then(
        (result) => {
          console.log(result.text);
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="w-full h-full flex flex-col translate-all duration-1000 items-center justify-center mt-5 px-5">
      <div className="w-full text-center flex flex-col justify-center xl:text-left h-full mx-auto">
        <h1 className="text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-6 font-semibold">
          Need <span className="text-red-600 dark:text-blue-600">more</span>{" "}
          info?
        </h1>
        {/* text & form */}
        <div className="flex flex-col w-full">
          <p className="text-center mx-auto mb-8 shadow-xl shadow-gray-500 rounded-xl py-3 px-3">
            <span className="text-blue-600 dark:text-red-600 font-semibold tracking-wider">
              Nixa TaeKwon-Do Academy
            </span>
            <br />

            <span className="text-red-600 dark:text-blue-600 font-semibold">
              <a href="tel:417-860-5220">(417) 860-5220</a>
            </span>
          </p>
          {/* form */}
          <form
            className="flex-1 flex flex-col gap-3 mx-auto"
            ref={form}
            onSubmit={sendEmail}
          >
            {/* input group */}
            <div className="flex gap-x-3">
              <input
                type="text"
                placeholder="Name"
                className="input"
                name="user_name"
              />
              <input
                type="text"
                placeholder="Email"
                className="input"
                name="user_email"
              />
            </div>
            <textarea
              placeholder="Message"
              className="textarea"
              name="user_message"
            ></textarea>
            <button
              type="submit"
              className="btn rounded-full border border-black dark:border-white max-w-[170px] px-8 transition-all duration-300 hover:bg-blue-600 flex items-center justify-center overflow-hidden uppercase tracking-widest group"
            >
              <span className="group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500">
                Send
              </span>
              <BsArrowRight className="-translate-y-[120%] text-white opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
