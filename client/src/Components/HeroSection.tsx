import { Link } from 'react-router-dom'
import heroImg from '../assets/images/hero_section.jpg'

const HeroSection = () => {
  return (
    <div className='mx-auto items-center '>
      <div className='relative'>
        <img
          className='w-full h-full object-cover min-h-[14em]'
          src={heroImg}
          alt='hero image'
        />
        <div className='absolute inset-0 flex flex-col justify-center font-bold text-center items-center text-light-tan '>
          <h1 className='mb-2 bg-rich-dark opacity-80 px-2 py-2 sm:text-3xl md:text-4xl md:px-6 lg:text-5xl xl:text-6xl xl:py-4 xl:px-8'>
            EN VÄRLD AV SMAKER I VARJE SIPP!
          </h1>
          <h2 className='bg-rich-dark opacity-80 px-2 py-2 text-2xl font-bold mb-10 text-center sm:text-2xl md:text-3xl md:px-6 md:mb-15 lg:text-4xl lg:mb-[2.6em] xl:py-4'>
            Din Dag Börjar Med Vår Blandning
          </h2>
          <Link to='/'>
            <button
              type='button'
              className='font-heading text-white text-bold text-2xl text-center border-2 border-white rounded cursor-pointer bg-deep-brown hover:bg-white hover:border-deep-brown hover:text-deep-brown px-4 py-1 md:py-2 md:px-8 md:text-3xl xl:text-4xl xl:py-4 xl:px-10 xl:border-4'>
              Till kaffet
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
