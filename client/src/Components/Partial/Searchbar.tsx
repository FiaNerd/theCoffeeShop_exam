import { useRef } from 'react'
import Button from './Button'
import useClickOutside from '../../hooks/useClickoutside'
import SortProducts from './SortProducts'

interface IProps {
  openSearchbar: boolean
  onCloseSearchbar: () => void
}

const SearchBar = ({ openSearchbar, onCloseSearchbar }: IProps) => {
  const searchRef = useRef<HTMLDivElement | null>(null)

  useClickOutside({ ref: searchRef, callback: onCloseSearchbar })
  return (
    <div
      ref={searchRef}
      className={`fixed top-0 mt-[30px] left-0 w-full flex items-center justify-center z-50 transition-opacity ${
        openSearchbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      <div className='bg-deep-red p-4 shadow-md w-full'>
        <div className='w-full md:max-w-[70%] flex items-center mx-auto'>
          <input
            type='text'
            placeholder='Hitta ditt kaffe...'
            className='flex-1 py-3 px-3 border rounded focus:outline-none focus:ring focus:border-orange'
          />
          <Button
            buttonType='search'
            typeAction='button'
            onClick={onCloseSearchbar}
            >
            Sök nu
          </Button>
        </div>
      </div>
      <SortProducts />
    </div>
  )
}

export default SearchBar
