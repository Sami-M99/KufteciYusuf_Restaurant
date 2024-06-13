import { useState } from "react";
import FoodDisplay from "../components/FoodDisplay"
import Menu from "../components/Menu"

const FoodList = () => {
    const [category, setCategory] = useState("All");
  return (
    <div className="mt-12">
      <div className="text-center">
        <h1 className="font-semibold text-4xl max-[600px]:text-lg ">Menü Listesi & Kategoriler</h1>
        <p className="pt-4 pb-10 max-[600px]:text-sm  max-[600px]:max-w-[100%]">Kategorilere göre istediğiniz yemeği separiş verebilirsiniz.</p>
        <Menu category={category} setCategory={setCategory} />
      </div>
      <hr className='h-0.5 bg-orange-300 border-none w-[40%] m-auto mt-5 mb-16'/>
      <h2 className="font-semibold text-3xl max-[600px]:text-lg ">{category === "All" ? "Tüm Yemekler": category}</h2>
      <FoodDisplay category={category} />
    </div>
  )
}

export default FoodList;