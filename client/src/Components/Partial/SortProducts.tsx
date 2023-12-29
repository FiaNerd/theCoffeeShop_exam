const SortProducts = () => {
  return (
    <div className='main w-full md:max-w-[70%] flex-col md:flex-row mx-auto flex border rounded overflow-hidden m-4 select-none'>
      <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold md:mr-3'>
        Sortera
      </div>
      <label className='flex radio p-2 cursor-pointer text-white'>
        <input
          className='my-auto transform scale-125'
          type='radio'
          name='sfg'
        />
        <div className='title px-2'>Alfabetiskt</div>
      </label>

      <label className='flex radio p-2 cursor-pointer text-white'>
        <input
          className='my-auto transform scale-125'
          type='radio'
          name='sfg'
        />
        <div className='title px-2'>Lägsta pris</div>
      </label>

      <label className='flex radio p-2 cursor-pointer text-white'>
        <input
          className='my-auto transform scale-125'
          type='radio'
          name='sfg'
        />
        <div className='title px-2'>Högsta pris</div>
      </label>
    </div>
  )
}

export default SortProducts
