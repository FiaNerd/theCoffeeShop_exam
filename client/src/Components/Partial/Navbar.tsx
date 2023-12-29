import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import logo from '../../assets/images/coffeebean_logo.png'
import { NavLink } from 'react-router-dom'
import Hamburger from './Hamburger'
import { menuItems } from '../../router/Navigation'
import Dropdown from './Dropdown'
import Basket from '../Basket'
import useClickOutside from '../../hooks/useClickoutside'
import SearchBar from './Searchbar'
import { Transition } from '@headlessui/react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const [openBasket, setOpenBasket] = useState(false)
  const [openSearchbar, setOpenSearchbar] = useState(false)

  const navRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    setMenuOpen(!menuOpen)
    setDropdownOpen(false)
  }

  const handleToggleBasket = () => {
    setOpenBasket(!openBasket)
  }

  const handleToggleSearchbar = () => {
    setOpenSearchbar(!openSearchbar)
  }

  const handleClick = (event: React.MouseEvent) => {
    if (event.currentTarget.id === 'searchIcon') {
      event.stopPropagation()
      handleToggleSearchbar()
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      navRef.current &&
      !navRef.current.contains(event.target as Node) &&
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false)
      setDropdownOpen(false)
      setOpenSearchbar(false)
    }
  }

  useClickOutside({ ref: navRef, callback: handleOutsideClick })
  useClickOutside({ ref: searchRef, callback: handleOutsideClick })

  const handleLinkClick = () => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  const handleMouseEnter = (title: string) => {
    setDropdownOpen(true)
    setActiveMenuItem(title)
  }

  const handleMouseLeave = () => {
    setDropdownOpen(false)
  }

  useEffect(() => {
    if (menuOpen || dropdownOpen || openBasket || openSearchbar) {
      document.addEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [menuOpen, dropdownOpen, openBasket, openSearchbar])

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  const portalRoot = document.getElementById('nav-root')

  if (!portalRoot) {
    throw new Error('Portal root element not found')
  }

  return (
    <>
      <div className='bg-deep-red flex align-middle items-center justify-between px-2 md:px-[2em] pt-4 '>
        <button
          onClick={(e) => handleToggleMenu(e)}
          className='hover:text-light-tan md:hidden'>
          <Hamburger />
        </button>
        <NavLink to='/' className='cursor-pointer'>
          <img src={logo} alt='coffebean logo' className='w-40' />
        </NavLink>
        <div className={`hidden gap-4 md:flex ${menuOpen ? 'visible' : ''} `}>
          <ul className='flex md:gap-8'>
            {menuItems.map((menu, index) => (
              <li
                key={index}
                className='relative'
                onMouseEnter={() => handleMouseEnter(menu.title)}
                onMouseLeave={handleMouseLeave}>
                <NavLink
                  to={menu.url}
                  end
                  style={{
                    color: 'text-light-tan',
                  }}
                  className='text-white font-heading text-3xl font-bold tracking-wider cursor-pointer hover:text-light-tan hover:underline hover:underline-offset-8 focus:text-light-tan'
                  onClick={handleLinkClick}>
                  {menu.title}
                </NavLink>

                {menu.subMenu && dropdownOpen && activeMenuItem === 'KAFFE' && (
                  <div className='bg-deep-red absolute top-full transform -translate-x-1/2 left-1/2 z-50 pt-8 pb-8 px-12'>
                    <Dropdown
                      subMenuItems={menu.subMenu}
                      onCloseDropdown={closeDropdown}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex gap-2 md:gap-6 items-center'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            id='searchIcon'
            className='text-white text-4xl cursor-pointer items-center hover:opacity-80'
            onClick={handleClick}
          />

          {openSearchbar && (
            <Transition
              show={openSearchbar}
              enter='transition-opacity ease-in-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-in-out duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              {openSearchbar && (
                <SearchBar
                  openSearchbar={openSearchbar}
                  onCloseSearchbar={handleToggleSearchbar}
                />
              )}
            </Transition>
          )}

          <button
            className='py-4 px-1 relative border-2 border-transparent text-white rounded-full hover:opacity-80 focus:outline-none focus:opacity-80 transition duration-150 ease-in-out'
            aria-label='Cart'
            onClick={handleToggleBasket}>
            <svg
              className='h-[40px] w-[38px]'
              fill='none'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
            </svg>
            <span className='absolute inset-0 object-right-top -mr-6'>
              <div className='inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-orange text-white hover:bg-light-tan hover:text-deep-brown'>
                6
              </div>
            </span>
          </button>
        </div>
      </div>

      {openBasket && <Basket />}

      <div>
        {menuOpen &&
          ReactDOM.createPortal(
            <div
              ref={navRef}
              className={`md:hidden gap-4 ${
                menuOpen ? 'visible' : ''
              } bg-deep-red h-8/12 mt-8 text-white font-bold w-8/12 fixed top-0 left-0 z-10 px-4 text-xl`}
              style={{
                marginTop: '104.641px',
                height: '100vh',
              }}>
              <div className='flex flex-col items-end gap-4 cursor-pointer hover:text-light-tan focus:text-light-tan'>
                <button type='button' onClick={handleToggleMenu}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className='flex text-4xl pl-2 pt-8'
                  />
                  <p className='text-end pr-4 pb-8'>close</p>
                </button>
              </div>

              <ul className=' relative flex flex-col gap-8'>
                {menuItems.map((menu, index) => (
                  <li key={index} onClick={handleToggleMenu}>
                    <NavLink
                      to={menu.url}
                      end
                      style={{
                        color: 'text-light-tan',
                      }}
                      className='font-heading text-3xl hover:text-light-tan hover:underline hover:underline-offset-8 focus:text-light-tan'
                      onClick={handleLinkClick}>
                      {menu.title}
                    </NavLink>
                    {menu.subMenu && (
                      <div className='ml-4 z-100'>
                        <Dropdown
                          subMenuItems={menu.subMenu}
                          onCloseDropdown={closeDropdown}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>,
            portalRoot
          )}
      </div>
    </>
  )
}

export default Navbar
