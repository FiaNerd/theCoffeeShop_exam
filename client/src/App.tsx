import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import Header from './components/Partial/Header'
import Footer from './components/Partial/Footer'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductPage from './pages/ProductPage'
import LoadingSpinner from './components/Partial/LoadingSpinner'
import PageNotFound from './components/Partial/PageNotFound'

const App = () => {
  return (
    <div className='conatiner flex flex-col min-h-screen'>
      <Header />
      <div
        className='conatiner px-4 max-w-[1280px] mx-auto mb-8 mt-4'
        style={{ margin: 'auto' }}>
        <LoadingSpinner />

        <Routes>
          <Route
            path='/products/:type/:productId'
            element={<ProductDetailPage />}
          />
          <Route path='/products/:type' element={<ProductPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />

      <ReactQueryDevtools initialIsOpen={false} position='bottom' />
    </div>
  )
}

export default App
