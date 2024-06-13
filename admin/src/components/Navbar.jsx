import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';


const Navbar = () => {

  const logoutHandler = () => {
    window.location.href = "http://localhost:5173/";  

    // Remove Token from localStorage
    localStorage.removeItem("token");
  }

  return (
    <div className="flex justify-between items-center py-3 px-8 bg-[#101010] text-white">
        <Link to={"/"}>
          <img className='w-40' src={assets.logo} alt="logo" />
        </Link>

        <div className="flex gap-3">
          <img className="h-8 " src={assets.profile} alt="profile" />
          <img onClick={logoutHandler} className="h-8 cursor-pointer" src={assets.logout} alt="logout" />          
        </div>
    </div>
  )
}

export default Navbar;
