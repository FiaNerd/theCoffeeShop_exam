import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'
import ProductDetailPage from './Pages/ProductDetailPage'
import ProductTypePage from './Pages/ProductTypePage'
import RegisterPage from './Pages/RegisterPage'
import Footer from './components/partial/Footer'
import Header from './components/partial/Header'
import LoadingSpinner from './components/partial/LoadingSpinner'
import PageNotFound from './components/partial/PageNotFound'
import './index.css'

const App = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
        <LoadingSpinner />

        <Routes>
          <Route
            path='/products/:type/:productId'
            element={<ProductDetailPage />}
          />
          <Route path='/products/:type' element={<ProductTypePage />} />
          <Route path='/' element={<HomePage />} />
         
          <Route path="/konto/logga-in" element={<LoginPage />} /> 
   
          <Route path="/konto/register" element={<RegisterPage />} /> 
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      <Footer />

      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </div>
  )
}

export default App
