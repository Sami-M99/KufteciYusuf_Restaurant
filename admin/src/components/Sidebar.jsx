/* eslint-disable no-constant-condition */
/* //? NavLink : when click on it, they add "active" to class and when click to another one class deleted  */
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"
import { useState } from "react"

const Sidebar = () => {
    const [active, setActive] = useState("");
    
    const linkStyle = "flex items-center gap-5 border border-gray-400 border-r-0 py-1.5 px-3 rounded-l-lg cursor-pointer hover:border-[#fa9628]";
    return (
        <div className="w-64 min-h-[calc(100vh_-_65px)]  border-[2px] border-y-0  border-gray-400 max-[900px]:w-fit ">
            <div className="pt-14 pl-3 flex flex-col gap-5">
                <NavLink to='/' className={`${linkStyle} ${active === "home"? "bg-[#ffc07b]": ""}`} onClick={() => {setActive("home")}}>
                    <img src={assets.home} alt="home" className="w-11" />
                    <p className="max-[900px]:hidden">Ana Sayfa</p>
                </NavLink>
                <NavLink to='/list' className={`${linkStyle} ${active === "add"? "bg-[#ffc07b]": ""}`} onClick={() => {setActive("add")}}>
                    <img src={assets.foodList} alt="list-food" className="w-11" />
                    <p className="max-[900px]:hidden">Yemek Listesi</p>
                </NavLink>
                <NavLink to='/add' className={`${linkStyle} ${active === "list"? "bg-[#ffc07b]": ""}`} onClick={() => {setActive("list")}}>
                    <img src={assets.addFood} alt="add-food" className="w-11" />
                    <p className="max-[900px]:hidden">Yemek Ekle</p>
                </NavLink>
                <NavLink to='/orders'  className={`${linkStyle} ${active === "orders"? "bg-[#ffc07b]": ""}`} onClick={() => {setActive("orders")}}>
                    <img src={assets.orderFood} alt="order-food" className="w-11" />
                    <p className="max-[900px]:hidden">Sipariş</p>
                </NavLink>
                <NavLink to='/add-announcement'  className={`${linkStyle} ${active === "add-announcement"? "bg-[#ffc07b]": ""}`} onClick={() => {setActive("add-announcement")}}>
                    <img src={assets.addAnnouncement} alt="add-announcement" className="w-11" />
                    <p className="max-[900px]:hidden">Duyuru Ekle</p>
                </NavLink>
                <NavLink to='/announcement-list'  className={`${linkStyle} ${active === "announcement-list"? "bg-[#ffc07b]": ""}`} onClick={() => {setActive("announcement-list")}}>
                    <img src={assets.announcementList} alt="announcement-list" className="w-11" />
                    <p className="max-[900px]:hidden">Duyurularınız</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar