import React, { useState } from "react";

interface IProps {
  items: string[];
  checked?: string[];
  onChange: (selectedItems: string[]) => void;
}

const FilterCheckGroup = ({ items, checked, onChange }: IProps) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const handleCheckedChange = (value: string) => {
    const currentIndex = checkedItems.indexOf(value);
    let newChecked: string[] = [];

    if (currentIndex === -1) {
      newChecked = [...checkedItems, value];
    } else {
      newChecked = checkedItems.filter((item) => item !== value);
    }

    setCheckedItems(newChecked);
    onChange(newChecked);
  };

  return (
    <>
      {items &&
        items.map((item, index) => (
          <label key={index} className="flex checkbox p-2 cursor-pointer font-extralight text-white">
            <input
              type="checkbox"
              checked={checkedItems.indexOf(item) !== -1}
              onChange={() => handleCheckedChange(item)}
            />
            <div className="title px-2 my-auto">{item}</div>
          </label>
        ))}
    </>
  );
};

export default FilterCheckGroup;
