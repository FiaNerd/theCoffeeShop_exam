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
import CheckoutPage from './pages/CheckoutPage'
import { useAppSelector } from './redux/configureStore'

const App = () => {
  const { user } = useAppSelector((state) => state.account)
  
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-1'>
        <LoadingSpinner />

        <Routes>
          <Route
            path='/produkt/:type/:productId'
            element={ <ProductDetailPage /> }
          />
          <Route path='/produkt/:type' element={ <ProductTypePage /> } />
          <Route path='/' element={ <HomePage /> } />
         
          <Route path="/konto/logga-in" element={ <LoginPage /> } />

          <Route path="/konto/registrera" element={ <RegisterPage />} /> 
          
            {/* Protect the 'checkout' route */}
            {/* <Route
            path='/checkout'
            element={user ? <CheckoutPage /> : <Navigate to='/konto/logga-in' />}
          /> */}

            <Route
            path='/checkout'
            element={ <CheckoutPage /> }
          />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        </div>
      <Footer />

      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </div>
  )
}

export default App
