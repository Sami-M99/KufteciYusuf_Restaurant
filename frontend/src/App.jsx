/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Footer from './components/Footer'
import LoginPopup from './components/LoginPopup'
import VerifyOrder from './pages/VerifyOrder'
import UserOrders from './pages/UserOrders'
import FoodList from './pages/FoodList'
import AnnouncementPage from './pages/AnnouncementPage'

const App = () => {
  // this to show a login popup
  const [showLogin,setShowLogin] = useState(false);

  return (
    <div>
      {showLogin? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <div className='w-4/5 m-auto'>
      <Routes>
        <Route path='/' element= {<Home />} />
        <Route path='/foods' element= {<FoodList />} />
        <Route path='/cart' element= {<Cart />} />
        <Route path='/order' element= {<PlaceOrder />} />
        <Route path='/verify-order' element= {<VerifyOrder />} />
        <Route path='/user-orders' element= {<UserOrders />} />
        <Route path='/announcement/:slug' element= {<AnnouncementPage />} />
      </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
