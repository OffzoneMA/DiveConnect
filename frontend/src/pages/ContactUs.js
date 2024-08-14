import React from "react";
import { useState, useRef } from "react";
function ContactUs() {
  const [isEmpty, setIsEmpty] = useState(true);
  const textareaRef = useRef(null);

  const handleTextareaChange = () => {
    setIsEmpty(textareaRef.current.value === "");
  };
  return (
    <section className="bg-gray-700">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col  justify-center items-center  px-24 pt-24 pb-14">
          <h1 className="text-center text-[3.5rem] not-italic font-bold leading-[4.125rem] text-[#FBE080]">
            We’d Loved To Hear From you
          </h1>
          <img
            className="h-[30rem] rounded-[1.25rem] mt-14"
            src="/image/contactus.jpeg"
            alt=""
          />
        </div>
        <div className="flex px-24 h-auto gap-28">
          <div className="flex flex-col gap-12 mt-16">
            <div className="flex flex-col">
              <h4 className="text-[#E3EFFF] font-bold">CONTACT US</h4>
              <h2 className="text-[#F9F9FF] text-[2.75rem] font-bold">
                Get in touch today
              </h2>
              <p className="text-[#E3EFFF] text-lg">
                Lorem ipsum dolor sit amet consectetur adipiscing elit nulla
                adipiscing tincidunt interdum tellus du.
              </p>
            </div>
            <div className="flex flex-col text-lg gap-[1.5rem]">
              <div className="flex gap-1 items-center">
                <img
                  className="h-5 w-[1.25rem]"
                  src="/image/message.svg"
                  alt=""
                />
                <p className="text-[#E3EFFF]">contact@company.com</p>
              </div>
              <div className="flex gap-1 items-center">
                <img
                  className="h-5 w-[1.25rem]"
                  src="/image/phone.svg"
                  alt=""
                />
                <p className="text-[#E3EFFF]">(123) 456 - 789</p>
              </div>
              <div className="flex gap-1 items-center">
                <img
                  className="h-5 w-[1.25rem]"
                  src="/image/position.svg"
                  alt=""
                />
                <p className="text-[#E3EFFF] ">
                  794 Mcallister St San Francisco, 94102
                </p>
              </div>
            </div>
          </div>
          <form
            action=""
            className="flex w-[37.125rem] rounded-2xl flex-col justify-center items-start gap-4 px-[5.75rem] py-[4.2rem] bg-[#E3EFFF]"
          >
            <div className="flex flex-col gap-4">
              <div className="flex w-[24.5rem] bg-white rounded-lg h-10  items-center gap-2 shrink-0 px-2.5 py-2">
                <img className="h-4 w-[1rem]" src="/image/user.svg" alt="" />
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none focus:outline-none"
                  placeholder="Name"
                />
              </div>
              <div className="flex w-[24.5rem] bg-white rounded-lg  h-10 items-center gap-2 shrink-0 px-2.5 py-2">
                <img
                  className="h-4 w-[1.06rem]"
                  src="/image/email.svg"
                  alt=""
                />
                <input
                  type="email"
                  className="w-full h-full bg-transparent border-none focus:outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="flex w-[24.5rem] bg-white rounded-lg  h-10 items-center gap-2 shrink-0 px-2.5 py-2">
                <img
                  className="h-4 w-[1.06rem]"
                  src="/image/formPhone.svg"
                  alt=""
                />
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none focus:outline-none"
                  placeholder="Phone"
                />
              </div>
              <div className="flex w-[24.5rem] bg-white rounded-lg  h-10 items-center gap-2 shrink-0 px-2.5 py-2">
                <img
                  className="h-4 w-[1.06rem]"
                  src="/image/company.svg"
                  alt=""
                />
                <input
                  type="text"
                  className="w-full h-full bg-transparent border-none focus:outline-none"
                  placeholder="Company"
                />
              </div>
              <div className=" relative flex ">
                {isEmpty && (
                  <img
                    className="h-4 w-[1.06rem] absolute top-3 left-3 "
                    src="/image/openMail.svg"
                    alt=""
                  />
                )}
                <textarea
                  ref={textareaRef}
                  className=" w-[24.5rem] bg-white rounded-lg focus:outline-none h-[7.5rem] items-center gap-2 shrink-0 px-2.5 py-2"
                  placeholder="      Message"
                  onChange={handleTextareaChange}
                ></textarea>
              </div>

              <button className=" flex h-10 justify-center items-center gap-2 rounded-lg bg-[#4A3AFF] shrink-0 p-2.5 self-start">
                <span className="font-bold text-white">Send Message</span>
                <img
                  className="h-3 w-[0.75rem]"
                  src="/image/arrowRigth.svg"
                  alt=""
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
