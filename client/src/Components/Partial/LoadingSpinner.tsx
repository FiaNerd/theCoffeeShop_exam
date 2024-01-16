import { DotLoader } from 'react-spinners'

const LoadingSpinner = () => {

  return (
    <div className='flex flex-col justify-center items-center bg-white mx-auto py-6'>
      <h1 className='text-dark-deep-brown'>Laddar kaffet..</h1>
      <DotLoader color='#42201a' size={300} className='mt-4' />
      <h2 className='mt-6'>Vänta ett ögonblick, snart klart!</h2>
    </div>
  ) 
}

export default LoadingSpinner
