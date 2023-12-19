import Navbar from './Navbar'

const Header = () => {
  
  return (
    <>
      <div className='bg-deep-brown sticky'>
        <p className='text-white font-features text-center p-1'>
          We're giving 5% of your order to the planet
        </p>

        <Navbar />
      </div>
    </>
  )
}

export default Header
