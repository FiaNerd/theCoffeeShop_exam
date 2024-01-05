import { useState } from "react";

interface IProps {
    types: string[];
    checked?: string[];
    onChange: (type: string[]) => void;
}

const FilterCheckGroup = ({ types, checked, onChange }: IProps) => {
    const [checkedTypes, setCheckedTypes] = useState(checked || []);

    const handleCheckedChange = (value: string) => {
        const currentIndex = checkedTypes.findIndex(type => type === value);
        let newChecked: string[] = [];

        if (currentIndex === -1) {
            newChecked = [...checkedTypes, value];
        } else {
            newChecked = checkedTypes.filter(type => type !== value);
        }

        setCheckedTypes(newChecked);
        onChange(newChecked);
    };

    console.log(checkedTypes);
    console.log("Types", types);

    return (
        <>
            {types && (
                types.map((type, index) => (
                    <label key={index} className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
                        <input
                            type='checkbox'
                            checked={checkedTypes.indexOf(type) !== -1}
                            onClick={() => handleCheckedChange(type)}
                        />

                        <div className='title px-2 my-auto'>{type}</div>
                    </label>
                ))
            )}
        </>
    );
};

export default FilterCheckGroup;
