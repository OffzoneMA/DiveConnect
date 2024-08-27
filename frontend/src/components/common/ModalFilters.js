import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import Filters from "./Filters";
import { useRef } from "react";

function ModalFilters() {
  const [visible, setVisible] = useState(false);

  const childRef = useRef();
  const callClearFunction = () => {
    if (childRef.current) {
      childRef.current.clear();
    }
  };

  const headerElement = (
    <div className="flex items-center justify-between w-2/3">
      <button onClick={callClearFunction} className="text-base text-[#374151]">
        Clear
      </button>
      <span className="text-base text-[#374151]">Filter</span>
    </div>
  );

  const footerContent = (
    <div>
      <Button
        icon="pi pi-arrow-right"
        label="Show 200 results"
        iconPos="right"
        onClick={() => setVisible(false)}
        className="bg-[#9795B5] mt-4 rounded-lg w-[100%] font-bold mx-auto p-3 text-white justify-center"
      />
    </div>
  );

  return (
    <div className="card flex sm:hidden justify-content-center">
      {/* <Button
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      /> */}
      <button
        onClick={() => setVisible(true)}
        className="flex sm:hidden w-full p-2 gap-1 items-center justify-center rounded-lg bg-[#4E9FFF] cursor-pointer"
      >
        <img className="h-4 w-[1.25rem]" src="/image/filtersWhite.svg" alt="" />
        <span className="font-bold text-base leading-5  text-white">
          Filter
        </span>
      </button>
      <Dialog
        visible={visible}
        modal
        header={headerElement}
        footer={footerContent}
        style={{ width: "90%" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <Filters ref={childRef} />
      </Dialog>
    </div>
  );
}

export default ModalFilters;
