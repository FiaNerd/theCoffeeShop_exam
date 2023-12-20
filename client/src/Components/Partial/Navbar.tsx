import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faBasketShopping,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import logo from '../../assets/images/coffeebean_logo.png'
import { NavLink } from 'react-router-dom'
import Hamburger from './Hamburger'
import { menuItems } from '../../router/Navigation'
import Dropdown from './Dropdown'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    setMenuOpen(!menuOpen)
    setDropdownOpen(false)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setMenuOpen(false)
      setDropdownOpen(false)
    }
  }

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
    if (menuOpen || dropdownOpen) {
      document.addEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [menuOpen, dropdownOpen])

  const closeDropdown = () => {
    setDropdownOpen(false)
  }

  const portalRoot = document.getElementById('nav-root')

  if (!portalRoot) {
    throw new Error('Portal root element not found')
  }

  return (
    <>
      <div className='bg-deep-red flex align-middle items-center justify-between px-2 md:px-[2em] py-4 '>
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

        <div className='flex gap-4'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='text-white text-4xl cursor-pointer'
            onClick={handleToggleMenu}
          />
          <FontAwesomeIcon
            icon={faBasketShopping}
            className='text-white text-4xl cursor-pointer'
          />
        </div>
      </div>

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
