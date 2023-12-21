import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import Header from './components/Partial/Header'
import Footer from './components/Partial/Footer'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex justify-center items-center px-4 max-w-[1360px] mx-auto mb-8 mt-4'>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
      <Footer />

      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </div>
  )
}

export default App
