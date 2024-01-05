import { ChangeEvent } from "react";

interface IProps {
    options: { value: string; label: string }[];
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    selectedValue: string;
  }

const SortButtonGroup = ({ options, selectedValue, onChange }: IProps) => {

  return (
    <>
      {options.map(({ value, label }) => (
        <div key={value} className='flex items-center'>
          <input
            className='my-auto transform scale-125'
            type='radio'
            name='sort'
            value={value}
            checked={selectedValue === value}
            onChange={onChange}
          />
          <label className='radio p-2 cursor-pointer text-white'>{label}</label>
        </div>
      ))}
    </>
  );
};

export default SortButtonGroup;
