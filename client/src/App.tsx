import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/partial/Footer'
import Header from './components/partial/Header'
import LoadingSpinner from './components/partial/LoadingSpinner'
import PageNotFound from './components/partial/PageNotFound'
import './index.css'
import AdminPage from './pages/AdminPage'
import CheckoutPage from './pages/CheckoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OrderDetailPage from './pages/Orders/OrderDetailPage'
import OrderPage from './pages/Orders/OrderPage'
import ProductDetailPage from './pages/Products/ProductDetailPage'
import ProductTypePage from './pages/Products/ProductTypePage'
import RegisterPage from './pages/RegisterPage'
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
             <Route
            path='/checkout'
            element={user ? <CheckoutPage /> : <Navigate to='/konto/logga-in' />}
          />
          <Route path='/orders' element={ user ? <OrderPage /> : <Navigate to='/konto/logga-in' />} />
          <Route path='/orders/:id' element={ user ? <OrderDetailPage /> : <Navigate to='/konto/logga-in' />} />

          {/* Admin */}
          <Route path='/produktpanel' element={<AdminPage /> } />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
        </div>
      <Footer />

      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </div>
  )
}

export default App
