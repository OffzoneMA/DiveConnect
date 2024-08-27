import React from "react";
import { Checkbox } from "primereact/checkbox";
function CheckBoxFilter({ items, onItemsChange, selectedItems, title }) {
  return (
    <div className="flex flex-col border-b-[1px] gap-3 border-[#ADABC3] bg-white px-4 py-5">
      <p>{title}</p>
      <div className="card flex">
        <div className="flex flex-column gap-3">
          {items.map((item) => {
            return (
              <div key={item.key} className="flex align-items-center">
                <Checkbox
                  inputId={item.key}
                  name="category"
                  value={item}
                  className="border rounded-md  bg-white"
                  onChange={onItemsChange}
                  checked={selectedItems.some(
                    (element) => element.key === item.key
                  )}
                />
                <label htmlFor={item.key} className="ml-2">
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CheckBoxFilter;
