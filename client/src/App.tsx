import { Routes, Route } from 'react-router-dom'
import Footer from './Components/Partial/Footer'
import Header from './Components/Partial/Header'
import HomePage from './Pages/HomePage'
import './index.css'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='px-4'>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
