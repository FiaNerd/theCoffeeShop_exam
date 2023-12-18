import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faMagnifyingGlass,
  faBasketShopping,
} from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import logo from '../../assets/images/coffeebean_logo.png'

const Header = () => {
  return (
    <div className='container fixed bg-deep-brown w-screen sticky'>
      <p className='text-white font-features text-center p-1'>
        We're giving 5% of your order to the planet
      </p>
      <div className='bg-deep-red flex align-middle items-center justify-between px-2 py-1'>
        <FontAwesomeIcon icon={faBars} className='text-white text-4xl' />
        <img src={logo} alt='coffebean logo' className='w-40' />
        <div className='flex gap-4'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='text-white text-4xl'
          />
          <FontAwesomeIcon
            icon={faBasketShopping}
            className='text-white text-4xl'
          />
        </div>
      </div>
    </div>
  )
}

export default Header
