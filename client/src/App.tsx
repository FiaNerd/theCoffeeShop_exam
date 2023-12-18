import Footer from './Components/Partial/Footer'
import Header from './Components/Partial/Header'
import './index.css'

const App = () => {
  return (
    <>
      <Header />
      <h1 className='text-desktop-title font-heading text-deep-red font-extrabold underline'>
        HELLO WORLD!
      </h1>
      <p className='text-sub-title font-text'>OUR PRODUCTS</p>
      <Footer />
    </>
  )
}

export default App
