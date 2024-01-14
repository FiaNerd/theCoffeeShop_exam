import { useState } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

interface IProps extends UseControllerProps {
  label: string;
  items: string[];
}

const SelectProductList = ({ label, items, ...props }: IProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="flex flex-col">
      <label className="text-deep-brown uppercase text-sm font-bold mb-2">{label}</label>
      <div className="relative w-full svelte-1l8159u">
        <div className=" bg-gray-200 p-1 flex border border-deep-brown rounded svelte-1l8159u relative">
          <div className="flex flex-auto flex-wrap"></div>
          <div
            onClick={toggleDropdown}
            className="p-1 px-2 outline-none w-full text-gray-800 cursor-pointer relative z-10"
          >
            {field.value || 'Välj ett alternativ'}
          </div>
          <div>
            <button
              onClick={toggleDropdown}
              className="cursor-pointer w-6 h-full flex items-center text-gray-400 outline-none focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-x w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div
            className={`text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u absolute top-full transform -translate-y-full ${
              isDropdownVisible ? 'block' : 'hidden'
            }`}
          >
            <button
              onClick={toggleDropdown}
              className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-chevron-up w-4 h-4"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`absolute shadow top-full z-40 w-full left-0 rounded max-h-select overflow-y-auto svelte-5uyqqj ${
            isDropdownVisible ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col w-full">
            {items.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  field.onChange(item);
                  toggleDropdown();
                }}
                className={`cursor-pointer w-full border-gray-200 ${
                  index === 0 ? 'rounded-t' : index === items.length - 1 ? 'rounded-b' : ''
                } border-b hover:bg-deep-brown`}
              >
                <div className="flex w-full items-center p-2 pl-2 border-transparent bg-white border-l-2 relative hover:bg-deep-brown hover:text-white hover:border-orange">
                  <div className="w-full items-center flex">
                    <div className="mx-2 leading-6 ">{item}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {fieldState.error && <span className="text-red-800">{fieldState.error.message}</span>}
    </div>
  );
};

export default SelectProductList;
