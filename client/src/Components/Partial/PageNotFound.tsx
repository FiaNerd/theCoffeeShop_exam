import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMugHot } from '@fortawesome/free-solid-svg-icons'

const PageNotFound = () => {
  const NotFound = '/images/404-not-found.png'
  return (
    <div className='mx-auto items-center justify-center'>
      <h1 className='text-center mb-4'>
        Hoppsan! Det ser ut som om kaffet och sidan gick på en gemensam paus.
      </h1>
      <img src={NotFound} alt='Cant find this page' />
      <div className='flex flex-col justify-center items-center'>
        <p className='mb-4 font-bold text-xl'>
          Medan de är borta, varför inte utforska vårt spännande sortiment?
        </p>
        <NavLink to='/'>
          <button className='flex items-center justify-center gap-4 w-60 text-dark-deep-brown font-bold uppercase border-2 border-orange py-3 rounded hover:opacity-80'>
            <FontAwesomeIcon icon={faMugHot} style={{ color: '#332720' }} />
            <span className='text-deep-brown font-bold uppercase'>
              TILL KAFFET
            </span>
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default PageNotFound
