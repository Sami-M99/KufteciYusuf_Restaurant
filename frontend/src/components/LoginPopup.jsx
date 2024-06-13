/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useContext, useState } from "react"
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
    const [currentState, setCurrentState] = useState("Login");

    const { url, setToken } = useContext(StoreContext);
  // names her must be the same names "name" inside every input
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setUserData(userData => ({...userData, [name]: value}));
    }

    const onLogin = async (event) => {
        event.preventDefault();

        let newUrl = url;
        if(currentState == "Login") {
            newUrl += "/user/login"
        }
        else {
            newUrl += "/user/register"
        }

        const response = await axios.post(newUrl, userData);

        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            if (response.data.role === "ADMIN") {
                window.location.href = "http://localhost:5174/";  // Redirect to admin page
            } else {
                setShowLogin(false);  // Close the login popup for regular users
            }
        }
        else{
            alert(response.data.message);
        }
    }


    return (
        <div className=" absolute z-[1] w-full h-full bg-[#00000090] grid">
            <form onSubmit={onLogin} className="place-self-center w-96 bg-white flex flex-col gap-6 py-6 px-8 rounded-lg text-lg animate-[fadeIn_1s_ease-in-out]">
                <div className="flex justify-between items-center text-black font-semibold text-2xl">
                    <h2>{currentState}</h2>
                    <img 
                        onClick={() => setShowLogin(false)}
                        className="w-4 cursor-pointer"
                        src={assets.close_icon} 
                        alt="close_icon" />
                </div>
                <div className="flex flex-col gap-5">
                    {currentState === "Login" ? <></> : <input name="name" value={userData.name} onChange={onChangeHandler} type="text" placeholder="Your Name" required  className="outline-none border border-gray-400 p-3 rounded"/>}
                    <input name="email" value={userData.email} onChange={onChangeHandler} type="email" placeholder="Your Email" required className="outline-none border border-gray-400 p-3 rounded"/>
                    <input name="password" value={userData.password} onChange={onChangeHandler} type="password" placeholder="Password" required className="outline-none border border-gray-400 p-3 rounded"/>
                </div>
                <button type="submit" className="border-none p-3 rounded text-white bg-orange-400 text-lg cursor-pointer">{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="flex items-start gap-2 mt-4  text-gray-400">
                    <input type="checkbox" required className="mt-1.5"/>
                    <p>Tüm koşullara kabul ediyorum,</p>
                </div>
                { currentState === "Login" ?
                <p className="text-gray-400">Yeni Hesap aç? <span onClick={() => setCurrentState("Sign Up")} className="cursor-pointer text-orange-400 font-medium">Click here</span></p> :
                <p className="text-gray-400">Daha önceden hesabım vardı? <span onClick={() => setCurrentState("Login")} className="cursor-pointer text-orange-400 font-medium">Login here</span></p>
            }
            </form>
        </div>
    )
}

export default LoginPopup