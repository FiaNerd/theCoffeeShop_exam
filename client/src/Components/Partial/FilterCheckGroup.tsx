interface IProps {
    types: string[]
    checked: string[]
    onChange: (type: string[]) => void
}

const FilterCheckGroup = ({types, checked, onChange}: IProps) => {
    return(
        <>
            {types && (
            types.map((type, index) => (
                <label key={index} className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
                <input
                    type='checkbox'
                    // onChange={() => handleFilterChange(type)}
                    // checked={selectFilter.includes(type)}
                    />


                <div className='title px-2 my-auto'>{type}</div>
                </label>
            ))
            )  }

        </>
    )
}

export default FilterCheckGroup