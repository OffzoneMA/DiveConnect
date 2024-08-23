import React from "react";

export default function CancelFilterButton({ title }) {
  return (
    <div className="flex">
      <button className="hidden px-3 py-2 sm:flex justify-center items-center gap-2 rounded-lg bg-[#F2F1FA] text-sm">
        <p className="capitalize text-black">{title}</p>
        <img src="/image/close.svg" className="h-5 w-[1.25rem]" alt="" />
      </button>
    </div>
  );
}
