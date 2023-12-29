import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import Button from './Button'
import useClickOutside from '../../hooks/useClickoutside'
import SortProducts from './SortProducts'
import FilterTypes from './FilterTypes'
import FilterRoastLevel from './FilterRoastLevel'

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
        <div className='w-full md:max-w-[70%] flex items-center mx-auto mb-8'>
          <input
            type='text'
            placeholder='Hitta ditt kaffe...'
            className='flex-1 py-3 px-3 border rounded focus:outline-none focus:ring focus:border-orange'
          />
          <Button
            buttonType='search'
            typeAction='button'
            onClick={onCloseSearchbar}>
            Sök nu
          </Button>
        </div>

        <SortProducts />
        <FilterTypes />
        <FilterRoastLevel />

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
