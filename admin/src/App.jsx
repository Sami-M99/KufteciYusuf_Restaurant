/* eslint-disable no-unused-vars */
import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddPage from './pages/AddPage'
import ListPage from './pages/ListPage'
import OrderPage from './pages/OrderPage'
// react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddAnnouncementPage from './pages/AddAnnouncementPage'
import ListAnnouncementPage from './pages/ListAnnouncementPage'
import HomePage from './pages/HomePage'


const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className='flex'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<HomePage url= {url} />} />
          <Route path='/list' element={<ListPage url= {url} />} />
          <Route path='/add' element={<AddPage url= {url} />} />
          <Route path='/orders' element={<OrderPage url= {url} />} />
          <Route path='/add-announcement' element={<AddAnnouncementPage url= {url} />} />
          <Route path='/announcement-list' element={<ListAnnouncementPage url= {url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App