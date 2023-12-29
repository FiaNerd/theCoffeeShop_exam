const SearchBar = () => {
  return (
    <div className='fixed top-0 mt-[30px] left-0 w-full flex items-center justify-center z-50'>
      <div className='bg-deep-red p-4 shadow-md w-full'>
        <div className='w-full md:max-w-[70%] flex items-center mx-auto'>
          <input
            type='text'
            placeholder='Hitta ditt kaffe...'
            className='flex-1 p-2 border rounded focus:outline-none focus:ring focus:border-orange'
          />
          <button className='ml-2 px-6 py-2 font-bold bg-orange border-2 uppercase border-orange text-white rounded cursor-pointer hover:border-white'>
            Sök kaffe
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
