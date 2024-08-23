import React from "react";
import { Dropdown } from "primereact/dropdown";

function DropDownFilter({
  selectedItems,
  setSelectedItem,
  name,
  options,
  defaultValue,
}) {
  return (
    <div className="card flex justify-content-center">
      <Dropdown
        value={selectedItems || { name: "Australlie", code: "AU" }} // to do the default value from filter URL
        // value={selectedItems || defaultValue} // to do the default value from filter URL
        onChange={(e) => setSelectedItem(e.value)}
        options={options}
        optionLabel="name"
        placeholder={`Select a ${name}`}
        className="w-full md:w-14rem border "
      />
    </div>
  );
}

export default DropDownFilter;
