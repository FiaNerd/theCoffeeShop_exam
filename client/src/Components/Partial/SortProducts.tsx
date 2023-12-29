const SortProducts = () => {
  return (
    <div className='main w-fit mx-auto flex border rounded-full overflow-hidden m-4 select-none'>
      <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold mr-3'>
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

      <label className='flex radio p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>show public</div>
      </label>
    </div>
  )
}

export default SortProducts
