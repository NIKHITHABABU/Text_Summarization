import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './auth/Login'
import Pricing from './pages/Pricing'
import Products from './pages/Products'
import Contact from './pages/Contact'
import SignUp from './auth/SignUp'
import NotFound from './pages/NotFound'
import Upload from './pages/Upload'

const App = () => {
  setTimeout(() => {
      console.clear();
  }, 1000);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/pricing' element={<Pricing />} />
      {/* <Route path='/products' element={<Products />} /> */}
      <Route path='/contact' element={<Contact />} />

      {/* Auth */}
      <Route path='/auth/login' element={<Login />} />
      <Route path='/auth/signup' element={<SignUp />} />
      <Route path=':path' element={<NotFound />} />
      <Route path='/upload' element={<Upload />} />
    </Routes>
  )
}

export default App