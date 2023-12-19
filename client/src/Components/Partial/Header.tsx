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

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement | null>(null)

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setMenuOpen(false)
    }
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [menuOpen])

  const portalRoot = document.getElementById('nav-root')

  if (!portalRoot) {
    throw new Error('Portal root element not found')
  }

  return (
    <>
      <div className='bg-deep-brown sticky'>
        <p className='text-white font-features text-center p-1'>
          We're giving 5% of your order to the planet
        </p>
        <div className='bg-deep-red flex align-middle items-center justify-between px-2 py-1'>
          <button
            onClick={(e) => handleToggleMenu(e)}
            className='hover:text-light-tan'>
            <Hamburger />
          </button>
          <NavLink to='/home' className='cursor-pointer'>
            <img src={logo} alt='coffebean logo' className='w-40' />
          </NavLink>
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
      </div>

      {menuOpen &&
        ReactDOM.createPortal(
          <div
            ref={navRef}
            className='bg-deep-red h-8/12 mt-8 text-white font-bold w-8/12 fixed top-0 left-0 z-10 px-4 text-xl'
            style={{
              marginTop: '104.641px',
              height: 'calc(100vh - 185.641px)',
            }}>
            <div className='flex flex-col items-end gap-4 cursor-pointer hover:text-light-tan'>
              <button type='button' onClick={handleToggleMenu}>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='flex text-4xl pl-2 pt-8'
                />
                <p className='text-end pr-4 pb-8'>close</p>
              </button>
            </div>
            <ul className='flex flex-col gap-4'>
              <li>
                <NavLink
                  to='/'
                  className='hover:text-light-tan hover:underline hover:underline-offset-8'
                  onClick={handleLinkClick}>
                  KAFFE
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='#'
                  className='hover:text-light-tan hover:underline hover:underline-offset-8'
                  onClick={handleLinkClick}>
                  OM OSS
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='#'
                  className='hover:text-light-tan hover:underline hover:underline-offset-8'
                  onClick={handleLinkClick}>
                  KONTAKTA OSS
                </NavLink>
              </li>
            </ul>
          </div>,
          portalRoot
        )}
    </>
  )
}

export default Header
