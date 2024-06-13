/* eslint-disable no-unused-vars */
import { useState } from "react"
import Header from "../components/Header"
import Menu from "../components/Menu"
import FoodDisplay from "../components/FoodDisplay";
import AppDownload from "../components/AppDownload";
import Announcement from "../components/Announcement";

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>

      <Header />
      <Announcement />
      <div>
        <h1 className='font-semibold text-4xl max-[600px]:text-lg my-5'>Favori Lezzetler</h1>
              {/* <hr className='h-0.5 bg-orange-200 border-none w-[15%]'/> */}
        <p className='max-w-[60%] max-[600px]:text-sm  max-[600px]:max-w-[100%]'>Bu yemekler müşterilerimiz tarafından en çok talep edilmektedir</p>
        <FoodDisplay category={'All'} />
      </div>      

      <div id="menu_list" className="flex flex-col gap-5 max-[600px]:gap-3 bg-background text-white py-16 text-center rounded mt-16">
        <h1 className="font-semibold text-4xl max-[600px]:text-lg ">Menü Listesi & Kategoriler</h1>
        <p className=" max-[600px]:text-sm  max-[600px]:max-w-[100%]">Kategorilere göre istediğiniz yemeği separiş verebilirsiniz.</p>
        <Menu />
      </div>


      <AppDownload />
    </div>
  )
}

export default Home