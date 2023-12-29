const FilterRoastLevel = () => {
  return (
    <div className='main w-full md:max-w-[70%] flex-col md:flex-row mx-auto flex border rounded overflow-hidden m-4 select-none'>
    <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold md:mr-3'>
        Rostning
      </div>
      <label className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>Lättrost</div>
      </label>

      <label className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>Mellanrost</div>
      </label>

      <label className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>Mörkrost</div>
      </label>
    </div>
  )
}

export default FilterRoastLevel
