import '@fortawesome/fontawesome-svg-core/styles.css'
import {
  faMagnifyingGlass,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Transition } from '@headlessui/react'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'
import useClickOutside from '../../hooks/useClickoutside'
import { useAppDispatch, useAppSelector } from '../../redux/configureStore'
import { menuItems } from '../../router/Navigation'
import SignedInMenu from '../account/SignedInMenu'
import { fetchCurrentUser } from '../account/accountSlice'
import ShoppingCart from '../basket/ShoppingCart'
import { fetchBasketAsync } from '../basket/basketSlice'
import Dropdown from './Dropdown'
import Hamburger from './Hamburger'
import SearchBar from './Searchbar'

const Navbar = () => {
  const logo = '/images/coffeebean_logo.png'

  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownOpenProfile, setDropdownOpenProfile] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const [openBasket, setOpenBasket] = useState(false)
  const [openSearchbar, setOpenSearchbar] = useState(false)
  const [openProfile, setOpenProfile] = useState(false)

  const navRef = useRef<HTMLDivElement | null>(null)
  const searchRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()
  const { basket } = useAppSelector((state) => state.basket)
  const { user } = useAppSelector((state) => state.account)

  const itemCount = (basket?.items ?? []).reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchCurrentUser())
        await dispatch(fetchBasketAsync())
      } catch (error) {
        console.error('Something went wrong', error)
      }
    }

    fetchData()
  }, [dispatch])

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

      setOpenProfile(false)
      setDropdownOpenProfile(false)
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

  const handleToggleProfile = () => {
    setOpenProfile(!openProfile)
  }

  const handleMouseEnterProfile = () => {
    setOpenProfile(true)
  }

  const handleMouseLeaveProfile = () => {
    setOpenProfile(false)
  }

  useEffect(() => {
    if (
      menuOpen ||
      dropdownOpen ||
      openBasket ||
      openSearchbar ||
      openProfile ||
      dropdownOpenProfile
    ) {
      document.addEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [
    menuOpen,
    dropdownOpen,
    openBasket,
    openSearchbar,
    openProfile,
    dropdownOpenProfile,
  ])

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

        <div className={`hidden gap-4 md:flex ${menuOpen ? 'visible' : ''}`}>
          <ul className='flex md:gap-8'>
            {menuItems
              .filter((menu) => !menu.mobileOnly)
              .map((menu, index) => (
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
                    className={`text-white font-heading ${
                      menu.title === 'Logga in' || menu.title === 'Skapa konto'
                        ? 'text-sm x'
                        : 'text-3xl'
                    } font-bold tracking-wider cursor-pointer hover:text-light-tan hover:underline hover:underline-offset-8 focus:text-light-tan`}>
                    {menu.title}
                  </NavLink>

                  {menu.subMenu &&
                    dropdownOpen &&
                    activeMenuItem === 'KAFFE' && (
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
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              <path d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'></path>
            </svg>
            <span className='absolute inset-0 object-right-top -mr-6'>
              <div className='inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-orange text-white hover:bg-light-tan hover:text-deep-brown'>
                {itemCount}
              </div>
            </span>
          </button>

          <div
            id='profile-container'
            className='relative py-4 border border-transparent'
            onMouseEnter={handleMouseEnterProfile}
            onMouseLeave={handleMouseLeaveProfile}>
            {!user ? (
              <div className='flex-row gap-4 hidden md:flex items-end'>
                <NavLink
                  to='/konto/logga-in'
                  className=' items-center hidden md:flex'
                  onClick={handleToggleProfile}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className='text-white text-4xl cursor-pointer hover:opacity-80'
                  />
                </NavLink>
                <NavLink
                  to='/konto/registrera'
                  className='text-white font-bold flex flex-end'>
                  Skapa konto
                </NavLink>
             
              </div>
            ) : (
               <FontAwesomeIcon
                icon={faUser}
               className='text-white text-4xl cursor-pointer hover:opacity-80'
               />
            )}

            {user && (
              <div className='hidden md:flex'>
                {openProfile && <SignedInMenu />}
              </div>
            )}
          </div>
        </div>
      </div>

      {openBasket && <ShoppingCart />}

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
