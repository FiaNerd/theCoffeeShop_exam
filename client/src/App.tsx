import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthRoute from './auth/AuthRoute';

import Footer from './components/partial/Footer';
import Header from './components/partial/Header';
import PageNotFound from './components/partial/PageNotFound';
import { AuthProvider } from './context/AuthContextProvider';
import AdminPage from './pages/AdminPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderDetailPage from './pages/orders/OrderDetailPage';
import OrderPage from './pages/orders/OrderPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import ProductTypePage from './pages/products/ProductTypePage';
import { useAppSelector } from './redux/configureStore';

const App = () => {
  const { user } = useAppSelector((state) => state.account);

  return (
    <AuthProvider>
      <div className='flex flex-col h-screen'>
        <Header />
        <div >
          <Routes>
            <Route
              path='/produkt/:type/:productId'
              element={<ProductDetailPage />}
            />
   
            <Route path='/produkt/:type' element={<ProductTypePage />} />
            <Route path='/' element={<HomePage />} />

            <Route path='/konto/logga-in' element={<LoginPage />} />

            <Route path='/konto/registrera' element={<RegisterPage />} />

            {/* Protect the 'checkout' route */}
            <Route
              path='/checkout'
              element={
                user ? <CheckoutPage /> : <Navigate to='/konto/logga-in' />
              }
            />

              <Route
                path='/checkout'
                element={user ? <CheckoutPage /> : <Navigate to='/konto/logga-in' />}
              />

            <Route
              path='/orders'
              element={
                user ? <OrderPage /> : <Navigate to='/konto/logga-in' />
              }
            /> 
            
            <Route
              path='/orders/:id'
              element={
                user ? <OrderDetailPage /> : <Navigate to='/konto/logga-in' />
              }
            />

            {/* Admin */}
            <Route element={<AuthRoute roles={['Admin']} /> }>
              <Route path='/produktpanel' element={<AdminPage />} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </AuthProvider>
  );
};

export default App;


