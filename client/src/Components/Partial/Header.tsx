import { useLocation } from 'react-router-dom';
import HeroSection from '../HeroSection';
import Navbar from './Navbar';

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

return (
    <>
      <div className='fixed top-0 left-0 w-full bg-deep-brown'>
        <p className='text-white font-features text-center p-1'>
          We're giving 5% of your order to the planet
        </p>
            <Navbar />
      </div>
        <div style={{
                marginTop: '128.641px',
              }}>
        {isHomePage && <HeroSection />}
        
        </div>
    </>
  );
};

export default Header
