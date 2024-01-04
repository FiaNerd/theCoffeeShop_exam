import { Link } from 'react-router-dom'

const HeroSection = () => {
  const heroImg = '/images/hero_section.jpg'
  return (
    <div className='mx-auto items-center mb-8'>
      <div className='relative'>
        <img
          className='w-full h-full object-cover min-h-[14em]'
          src={heroImg}
          alt='hero image'
        />
        <div className='absolute inset-0 flex flex-col justify-center font-bold text-center items-center'>
          <h1 className=' text-light-tan bg-rich-dark mb-2 opacity-80 px-2 py-2 sm:text-3xl md:text-4xl md:px-6 lg:text-5xl xl:text-6xl xl:py-4 xl:px-8'>
            EN VÄRLD AV SMAKER I VARJE SIPP!
          </h1>
          <h2 className=' text-light-tan bg-rich-dark opacity-80 px-2 py-2 text-2xl font-bold mb-10 text-center sm:text-2xl md:text-3xl md:px-6 md:mb-15 lg:text-4xl lg:mb-[2.6em] xl:py-4'>
            Din Dag Börjar Med Vår Blandning
          </h2>
          <Link to='/'>
            <button
              type='button'
              className='font-heading text-white text-bold text-2xl text-center border-2 border-white rounded-md cursor-pointer bg-deep-brown hover:bg-white hover:border-deep-brown hover:text-deep-brown px-4 py-1 md:py-2 md:px-8 md:text-3xl xl:text-4xl xl:py-4 xl:px-10 xl:border-4'>
              TILL KAFFET
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
