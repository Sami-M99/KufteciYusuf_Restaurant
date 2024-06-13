/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logoutHandler = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post('http://localhost:4000/user/logout', { token });

      if (response.data.success) {
        // Remove Token from localStorage
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  const activeStyle = "pb-[2px] border-b-2 border-orange-400"

  return (
    <div className='bg-[#101010] text-white'>
      <div className='w-4/5 m-auto py-5 flex justify-between items-center cursor-pointer'>
        <Link to={"/"}>
          <img src={assets.logo} alt='logo' className='w-36 max-[1050px]:w-36 max-[600px]:w-28' />
        </Link>
        <ul className='flex list-none gap-5 text-lg max-[900px]:hidden '>
          <Link to="/" className={menu === "home" ? activeStyle : ""} onClick={() => setMenu("home")}>Ana Sayfa</Link>
          <a href="#announcement_list" className={menu === "announcement" ? activeStyle : ""} onClick={() => { navigate('/'); setMenu("announcement") }}>Duyuru</a>
          <a className={menu === "menu" ? activeStyle : ""} onClick={() => { navigate('foods'); setMenu("menu"); }}>Menü</a>
          <a href="#footer" className={menu === "conact Us" ? activeStyle : ""} onClick={() => setMenu("conact Us")}>İletişim</a>
        </ul>
        <div className='flex items-center gap-8 max-[600px]:gap-4'>
          <img src={assets.search_icon} alt='' className='max-[600px]:w-[26px]' />
          <div className='relative'>
            <Link to={"/cart"}>
              <img src={assets.basket_icon} alt='' className='max-[600px]:w-[26px]' />
            </Link>
            <div className={(getTotalCartAmount() <= 0) ? '' : ' absolute min-w-2.5 min-h-2.5 bg-[#fa9628] rounded-full top-[-5px] right-[-5px] '}></div>
          </div>
          {!token ?
            <button
              className=' bg-transparent text-base border border-[#fa9628] py-3 px-8 rounded-xl cursor-pointer transition-all hover:bg-[#fa9628] max-[600px]:p-3 '
              onClick={() => setShowLogin(true)}
            >Sign In</button> :
            <div className='group relative '>
              <img src={assets.profile} alt='profile' className='w-14' />
              <ul className='absolute hidden right-0 z-[1] group-hover:flex group-hover:flex-col gap-2.5 bg-slate-900 p-3 rounded border-2 w-max'>
                <li onClick={() => navigate('user-orders')} className='flex items-center gap-2.5 cursor-pointer ' ><img src={assets.order} alt='Order' className='w-6' /><p>Orders</p></li>
                <hr />
                <li onClick={logoutHandler} className='flex items-center gap-2.5 cursor-pointer' ><img src={assets.logout} alt='Logout' className='w-6' /><p>Logout</p></li>
              </ul>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar
