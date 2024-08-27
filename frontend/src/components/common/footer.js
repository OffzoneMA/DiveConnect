import React from "react";
import { Link } from "react-router-dom";
function footer() {
  return (
    <section className="pt-4 sm:pt-0 bg-gray-700 ">
      <div className="container mx-auto sm:px-6 sm:py-20">
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row mb-14 text-[#F9F9FF] sm:px-24 items-center justify-between">
          <h2 className="sm:mb-0">LOGO</h2>
          <div className="flex gap-3  sm:gap-10 items-center text-sm justify-between text-[#F9F9FF] ">
            <Link>Home</Link>
            <Link>Diving Centers</Link>
            <Link>Contact Us</Link>
            <Link>Requests</Link>
          </div>
          <div className="flex gap-4 items-center justify-between">
            <Link>
              <img src="/image/facebook.svg" alt="" />
            </Link>
            <Link>
              <img src="/image/twitter.svg" alt="" />
            </Link>
            <Link>
              <img src="/image/instagram.svg" alt="" />
            </Link>
            <Link>
              <img src="/image/linkedIn.svg" alt="" />
            </Link>
          </div>
        </div>
        <div className="h-[2px] w-3/4 mx-auto bg-[#D4D2E3]"></div>
        <div className="text-[#F9F9FF] mx-auto text-center mt-6 ">
          Copyright © 2023 BRIX Templates | All Rights Reserved{" "}
        </div>
      </div>
    </section>
  );
}

export default footer;
