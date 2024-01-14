import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef } from 'react'
import useClickOutside from '../../hooks/useClickoutside'
import SortProducts from '../searchbar/SortProducts'
import FilterProducts from './Forms/FilterProducts'
import SearchProducts from './SearchProducts'

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
      className={`fixed bg-deep-red shadow-md flex-col top-0 mt-[30px] left-0 w-full  items-center justify-center z-50 transition-opacity ${
        openSearchbar ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      <div className='bg-deep-red p-4 shadow-md w-full'>
        <SearchProducts onCloseSearch={onCloseSearchbar} onCloseEnterSearch={onCloseSearchbar}/>
        <SortProducts />
        <FilterProducts />

        <div className='flex flex-col items-center gap-4 cursor-pointer hover:text-light-tan focus:text-light-tan'>
          <button type='button' onClick={onCloseSearchbar}>
            <FontAwesomeIcon
              icon={faXmark}
              className='flex text-white text-4xl pt-8'
            />
            <p className='text-white'>Stäng</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBar
