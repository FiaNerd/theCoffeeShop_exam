import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
import logo from '../../assets/images/coffeebean_logo.png'

const Header = () => {
  return (
    <div className='container fixed bg-deep-brown w-screen'>
      <p className='text-white font-features text-center'>
        We're giving 5% of your order to the planet
      </p>
      <div className='bg-deep-red flex align-middle'>
        <FontAwesomeIcon icon={faBars} className='text-white text-4xl' />
        <img src={logo} alt='coffebean logo' className='w-40 p-3' />
      </div>
    </div>
  )
}

export default Header
