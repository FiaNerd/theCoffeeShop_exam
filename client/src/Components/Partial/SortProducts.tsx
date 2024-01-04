const SortProducts = () => {
  const sortOptions = [
    { value: 'name', label: 'Sortera: a - ö' },
    { value: 'priceDesc', label: 'Högsta pris' },
    { value: 'price', label: 'Lägsta pris' },
  ];
  
  return (
    <div className='main gap-4 w-full md:max-w-[70%] flex-col md:flex-row mx-auto flex border rounded overflow-hidden m-4 select-none'>
      <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold md:mr-3'>
        Sortera
      </div>
      {sortOptions.map(({ value, label }) => (
        <div key={value} className='flex items-center'>
          <input
            className='my-auto transform scale-125'
            type='radio'
            name='sort'
            value={value}
          />
          <label className='radio p-2 cursor-pointer text-white'>{label}</label>
        </div>
      ))}
    </div>
  )
}

export default SortProducts
