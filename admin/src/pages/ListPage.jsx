/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from "../assets/assets";


const ListPage = ({url}) => {
  const [list, setList] = useState([]);

  const getFoodList = async () => {
    const response = await axios.get(`${url}/food/all-food`);
    
    if(response.data.success){
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getFoodList();
  }, [])

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/food/delete-food`, {id: foodId});
    await getFoodList();  // to display food list again after remove food

    if(response.data.success){
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div className="mx-12 w-full">
      <h1 className="mt-10 mb-5 m-auto font-semibold text-3xl text-center">Tüm Yemeklerin Listesi</h1>
        <div className="">
          <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2.5 py-3 px-4 border border-[#fa9628] bg-[#fff2e4] max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-4 max-[600px]:hidden justify-items-center">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Silme İşlemi</b>
          </div>
          { list.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-2.5 py-3 px-4 border border-[#fa9628] max-[600px]:grid-cols-[1fr_3fr_1fr] max-[600px]:gap-4 justify-items-center">
                <img src={`${url}/images/${item.image}`} alt="food-image" className="w-16"/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price} TL</p>
                <img onClick={() => removeFood(item._id)} src={assets.removeFood} alt="remove-food"  className="cursor-pointer w-6" />
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default ListPage