const FilterProducts = () => {
  return (
    <div className='main w-fit mx-auto flex border rounded-full overflow-hidden m-4 select-none'>
      <div className='title py-3 my-auto px-5 bg-orange text-white text-sm font-semibold mr-3'>
        Typer
      </div>
      <label className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>Bryggkaffe</div>
      </label>

      <label className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>Hela bönor</div>
      </label>

      <label className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>Presskaffe</div>
      </label>
      <label className='flex checkbox p-2 cursor-pointer font-extralight text-white'>
        <input
          className='my-auto transform scale-125'
          type='checkbox'
          name='sfg'
          checked
        />
        <div className='title px-2 my-auto'>Ekologiskt</div>
      </label>
    </div>
  )
}

export default FilterProducts
